import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const loginUser = async (user) => {
  const response = await axios.post("http://localhost:8080/auth/login", user);
  return response.data;
};

export function useLoginUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: loginUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: "USERS" }),
  });
}
