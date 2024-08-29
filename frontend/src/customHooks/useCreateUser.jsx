import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const createUser = async (user) => {
  const response = await axios.post("http://localhost:8080/users", user);
  return response.data;
};

const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });
};

export default useCreateUser;
