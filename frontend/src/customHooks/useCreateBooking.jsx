import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const createBooking = async (bookingData) => {
  const response = await axios.post(
    "http://localhost:8080/booking",
    bookingData
  );
  return response.data;
};

const useCreateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["BOOKING"] });
    },
    onError: (error) => {
      console.error("Error creating booking:", error);
    },
  });
};

export default useCreateBooking;
