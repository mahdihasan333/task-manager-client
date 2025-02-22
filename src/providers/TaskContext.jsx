import { createContext, useContext, useEffect, useState } from "react";
// import useTasks from "../hooks/useTasks";
import { AuthContext } from "./AuthProvider";
import useTasks from "../hooks/useTask";
import useAxios from "../hooks/useAxios";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [allTasks, loadingTasks, refetchTasks] = useTasks();
  const axiosPublic = useAxios();

  const [tasks, setTasks] = useState(allTasks);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      setTasks(allTasks);
    }
  }, [allTasks, user]);

  // drag control
  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id;
    const newCategory = over.id;

    // Optimistically update the UI
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, category: newCategory } : task
      )
    );

    // Send the update request to the backend
    const res = await axiosPublic.patch("/drag_tasks", {
      taskId,
      newCategory,
    });
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        handleDragEnd,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};
