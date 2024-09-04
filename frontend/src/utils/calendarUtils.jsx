import { format, parseISO, addMinutes } from "date-fns";
import { convertTo24Hour } from "./timeUtils";

export const getAvailableTimes = (workStart, workEnd) => {
  const startTime = parseISO(`1970-01-01T${convertTo24Hour(workStart)}`);
  const endTime = parseISO(`1970-01-01T${convertTo24Hour(workEnd)}`);
  const slots = [];

  let currentTime = startTime;

  while (currentTime <= endTime) {
    slots.push(format(currentTime, "HH:mm"));
    currentTime = addMinutes(currentTime, 30);
  }

  return slots;
};

export const getBookedTimes = (bookings, selectedDate) => {
  const selectedDateString = format(selectedDate, "yyyy-MM-dd");
  return bookings
    .filter(
      (booking) =>
        format(new Date(booking.date), "yyyy-MM-dd") === selectedDateString
    )
    .map((booking) => booking.time);
};
