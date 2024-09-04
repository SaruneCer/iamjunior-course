import { format, parse } from "date-fns";

export const convertTo24Hour = (time) => {
  const [hours, minutes] = time.split(":").map(Number);
  return format(parse(`${hours}:${minutes}`, "H:m", new Date()), "HH:mm");
};

export const convertTo12Hour = (time) => {
  const [hours, minutes] = time.split(":").map(Number);
  return format(parse(`${hours}:${minutes}`, "H:m", new Date()), "h:mm a");
};
