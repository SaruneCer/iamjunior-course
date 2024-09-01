import { useState, useContext, useMemo, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useBookings } from "../customHooks/useBookings";
import useCreateBooking from "../customHooks/useCreateBooking";
import { UserContext } from "../context/UserContext";
import { AlertModal } from "../components/AlertModal";
import { ROUTES } from "../router/pageRoutes";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { useQueryClient } from "@tanstack/react-query";
import "../styles/booking_modal.css";

const convertTo24Hour = (time) => {
  const [hour, minute] = time.split(":");
  const period = hour.match(/AM|PM$/) ? hour.match(/AM|PM$/)[0] : "AM";
  let hour24 = parseInt(hour, 10);
  if (period === "PM" && hour24 < 12) hour24 += 12;
  if (period === "AM" && hour24 === 12) hour24 = 0;
  return `${hour24.toString().padStart(2, "0")}:${minute || "00"}`;
};

const convertTo12Hour = (time) => {
  const [hour, minute] = time.split(":");
  let hourInt = parseInt(hour, 10);
  const period = hourInt >= 12 ? "PM" : "AM";
  if (hourInt > 12) hourInt -= 12;
  if (hourInt === 0) hourInt = 12;
  return `${hourInt}:${minute} ${period}`;
};

const BookingModal = ({ isOpen, onClose, business, bookingDetails }) => {
  const { user } = useContext(UserContext);
  const queryClient = useQueryClient();
  const {
    mutate: createBooking,
    isLoading: loading,
    error,
  } = useCreateBooking();
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [alertModal, setAlertModal] = useState({
    isOpen: false,
    message: "",
    buttons: [],
  });

  useEffect(() => {
    if (bookingDetails) {
      setSelectedDate(new Date(bookingDetails.date));
      setSelectedTime(bookingDetails.time);
    }
  }, [bookingDetails]);

  const businessId = business?._id;

  const {
    data: bookings = [],
    isLoading: isBookingsLoading,
    isError: isBookingsError,
  } = useBookings(businessId);

  const availableTimes = useMemo(() => {
    if (!business) return [];
    const { workStart, workEnd } = business;
    const startTime = new Date(`1970-01-01T${convertTo24Hour(workStart)}`);
    const endTime = new Date(`1970-01-01T${convertTo24Hour(workEnd)}`);
    const slots = [];

    while (startTime <= endTime) {
      slots.push(startTime.toTimeString().slice(0, 5));
      startTime.setMinutes(startTime.getMinutes() + 30);
    }

    return slots;
  }, [business]);

  const bookedTimes = useMemo(() => {
    const selectedDateString = selectedDate.toISOString().split("T")[0];
    return bookings
      .filter(
        (booking) =>
          new Date(booking.date).toISOString().split("T")[0] ===
          selectedDateString
      )
      .map((booking) => booking.time);
  }, [bookings, selectedDate]);

  const validationSchema = Yup.object({
    time: Yup.string().required("Please select a time slot"),
  });

  if (!isOpen) return null;
  if (isBookingsLoading) return <p>Loading...</p>;
  if (isBookingsError)
    return <p>Error: {error?.message || "Failed to fetch bookings"}</p>;

  const handleSubmit = async (values, { setSubmitting }) => {
    if (!user) {
      setAlertModal({
        isOpen: true,
        message: "Please log in to make a booking.",
        buttons: [
          {
            label: "Log In",
            onClick: () => {
              navigate(ROUTES.LOGIN, {
                state: { fromBookingModal: true, bookingDetails: values },
              });
              setAlertModal({ ...alertModal, isOpen: false });
            },
          },
          {
            label: "Cancel",
            className: "cancel_button",
            onClick: () => setAlertModal({ ...alertModal, isOpen: false }),
          },
        ],
      });
      setSubmitting(false);
      return;
    }

    const bookingData = {
      businessId,
      date: new Date(values.date),
      time: values.time,
      userName: user.name,
      userEmail: user.email,
      status: "pending",
    };

    createBooking(bookingData, {
      onSuccess: () => {
        queryClient.invalidateQueries(["bookings", businessId]);
        setAlertModal({
          isOpen: true,
          message: "Booking successful!",
          buttons: [
            {
              label: "OK",
              onClick: () => {
                setAlertModal({ ...alertModal, isOpen: false });
                onClose();
              },
            },
          ],
        });
        setSubmitting(false);
      },
      onError: (err) => {
        setAlertModal({
          isOpen: true,
          message: err.message || "Failed to create booking. Please try again.",
          buttons: [
            {
              label: "OK",
              onClick: () => setAlertModal({ ...alertModal, isOpen: false }),
            },
          ],
        });
        console.error(err);
        setSubmitting(false);
      },
    });
  };

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      <div className="modal-overlay" onClick={handleOverlayClick}>
        <div className="modal-content">
          <span className="close" onClick={onClose}>
            &times;
          </span>
          <h2 className="booking_modal_header">Book a Service</h2>
          <p className="booking_modal_subheader">
            Select Date and Time slot to book a service
          </p>
          <Formik
            initialValues={{
              date: selectedDate.toISOString().split("T")[0],
              time: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue, isSubmitting }) => (
              <Form>
                <div className="form-group">
                  <label className="booking_modal_label">Select Date</label>
                  <Field name="date">
                    {({ field }) => (
                      <Calendar
                        {...field}
                        onChange={(date) => {
                          setSelectedDate(date);
                          setFieldValue(
                            "date",
                            date.toISOString().split("T")[0]
                          );
                        }}
                        value={new Date(field.value)}
                      />
                    )}
                  </Field>
                </div>
                <div className="form-group">
                  <label className="booking_modal_label">
                    Select Time Slot
                  </label>
                  <div className="time-selection">
                    {availableTimes.map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => {
                          setSelectedTime(time);
                          setFieldValue("time", time);
                        }}
                        disabled={bookedTimes.includes(time)}
                        className={`time-slot-button ${
                          selectedTime === time ? "selected-time-slot" : ""
                        }`}
                      >
                        {convertTo12Hour(time)}
                      </button>
                    ))}
                  </div>
                  <ErrorMessage name="time" component="p" className="error" />
                </div>
                {error && <p className="error">{error}</p>}
                <div className="form-buttons">
                  <Button
                    buttonText={loading ? "Booking..." : "Confirm Booking"}
                    type="submit"
                    isRound={false}
                    disabled={loading || isSubmitting}
                  />
                  <Button
                    buttonText="Cancel"
                    onClick={onClose}
                    type="button"
                    isRound={false}
                    className="cancel_button"
                  />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <AlertModal
        isOpen={alertModal.isOpen}
        message={alertModal.message}
        onClose={() => setAlertModal({ ...alertModal, isOpen: false })}
        buttons={alertModal.buttons}
      />
    </>
  );
};

export default BookingModal;
