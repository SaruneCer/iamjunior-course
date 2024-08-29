import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchBusinesses = async () => {
  const response = await axios.get("http://localhost:8080/business");
  return response.data;
};

export const useBusiness = () => {
  return useQuery({
    queryKey: ["businesses"],
    queryFn: fetchBusinesses,
  });
};
