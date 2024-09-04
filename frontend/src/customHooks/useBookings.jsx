import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchBookings = async (businessId) => {
  const response = await axios.get(
    `http://localhost:8080/booking/${businessId}`
  );
  return response.data;
};

export const useBookings = (businessId) => {
  return useQuery({
    queryKey: ["bookings", businessId],
    queryFn: () => fetchBookings(businessId),
    enabled: !!businessId,
  });
};
