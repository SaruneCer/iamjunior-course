import { useContext, useMemo, useEffect, useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import useBookings from "../customHooks/useBookings";
import useCreateBooking from "../customHooks/useCreateBooking";
import { UserContext } from "../context/UserContext";
import { AlertModal } from "../components/AlertModal";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import {
  createLoginAlertConfig,
  createSuccessAlertConfig,
  createErrorAlertConfig,
} from "../utils/alertUtils";
import "../styles/booking_modal.css";
import FormikDatePicker from "../components/FormikDatePicker";
import { getAvailableTimes, getBookedTimes } from "../utils/calendarUtils";
import { convertTo12Hour } from "../utils/timeUtils";
import { bookingValidationSchema } from "../validations/bookingValidationSchema";
import useLocalStorage from "use-local-storage";

const BookingModal = ({ isOpen, onClose, business, bookingDetails }) => {
  const { user } = useContext(UserContext);
  const queryClient = useQueryClient();
  const {
    mutate: createBooking,
    isLoading: loading,
    error,
  } = useCreateBooking();
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useLocalStorage(
    "selectedDate",
    new Date().toISOString()
  );
  const [selectedTime, setSelectedTime] = useLocalStorage("selectedTime", "");

  const [alertModal, setAlertModal] = useState({
    isOpen: false,
    message: "",
    buttons: [],
  });

  useEffect(() => {
    if (bookingDetails) {
      setSelectedDate(new Date(bookingDetails.date).toISOString());
      setSelectedTime(bookingDetails.time);
    }
  }, [bookingDetails, setSelectedDate, setSelectedTime]);

  const businessId = business?._id;

  const {
    data: bookings = [],
    isLoading: isBookingsLoading,
    isError: isBookingsError,
  } = useBookings(businessId);

  const availableTimes = useMemo(() => {
    if (!business) return [];
    const { workStart, workEnd } = business;
    return getAvailableTimes(workStart, workEnd);
  }, [business]);

  const bookedTimes = useMemo(() => {
    return getBookedTimes(bookings, new Date(selectedDate));
  }, [bookings, selectedDate]);

  if (!isOpen) {
    return null;
  }
  if (isBookingsLoading) {
    return <p>Loading...</p>;
  }
  if (isBookingsError) {
    return <p>Error: {error?.message || "Failed to fetch bookings"}</p>;
  }

  const handleSubmit = async (values, { setSubmitting }) => {
    if (!user) {
      setAlertModal(
        createLoginAlertConfig(navigate, values, () =>
          setAlertModal({ ...alertModal, isOpen: false })
        )
      );
      setSubmitting(false);
      return;
    }

    const bookingData = {
      businessId,
      date: format(new Date(values.date), "yyyy-MM-dd"),
      time: values.time,
      userName: user.name,
      userEmail: user.email,
      status: "pending",
    };

    createBooking(bookingData, {
      onSuccess: () => {
        queryClient.invalidateQueries(["bookings", businessId]);
        setAlertModal(
          createSuccessAlertConfig(() => {
            setAlertModal({ ...alertModal, isOpen: false });
            onClose();
          })
        );
        setSubmitting(false);
      },
      onError: (err) => {
        setAlertModal(createErrorAlertConfig(err.message));
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
              date: format(new Date(selectedDate), "yyyy-MM-dd"),
              time: selectedTime,
            }}
            validationSchema={bookingValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue, isSubmitting }) => (
              <Form>
                <div className="form-group">
                  <label className="booking_modal_label">Select Date</label>
                  <FormikDatePicker
                    selectedDate={new Date(selectedDate)}
                    setSelectedDate={(date) =>
                      setSelectedDate(date.toISOString())
                    }
                    setFieldValue={setFieldValue}
                  />
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
