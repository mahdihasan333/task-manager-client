import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";
import useAuth from "./useAuth";

const useTasks = () => {
  const axiosPublic = useAxios()
  const  {user}  = useAuth()
  const email = user?.email;

  const {
    data: allTasks = [],
    isPending: loadingTasks,
    refetch: refetchTasks,
  } = useQuery({
    queryKey: ["tasks", email], // New structure for query key
    queryFn: () =>
      axiosPublic.get(`/tasks?email=${email}`).then((res) => res.data),
    enabled: !!email, // Ensures query runs only when email is available
  });

  return [allTasks, loadingTasks, refetchTasks];
};

export default useTasks;