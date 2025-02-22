import { TaskCard } from "./TaskCard";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import { useDroppable } from "@dnd-kit/core";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { ThemeContext } from "../providers/ThemeProvider";

export const SingleTask = ({ title, category, tasks, setTasks, allTasks }) => {
  const { setNodeRef } = useDroppable({ id: category });
  const { theme } = useContext(ThemeContext);
  const { handleSubmit, register, reset } = useForm();

  // Handle adding a new task
  const handleAddTask = () => {
    const newTask = {
      id: Date.now().toString(),
      title: "",
      description: "",
      category,
    };
    setTasks([...allTasks, newTask]);
  };

  // Title color logic
  const titleColor =
    title === "In Progress" ? "text-yellow-500" : title === "Done" ? "text-green-500" : "";

  return (
    <motion.div
      ref={setNodeRef}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`p-4 rounded-xl shadow-sm border border-gray-200/50  w-full transition duration-300 
        ${theme === "dark" ? "bg-gray-800 border-gray-700 text-white" : "bg-gray-50/50 text-gray-900"}`}
    >
      <div className="flex items-center justify-between">
        <div className={`text-lg font-bold mb-4 flex items-center ${titleColor}`}>
          <p>{title}</p>
          <p className="text-sm text-gray-400 ml-2"> ({tasks.length})</p>
        </div>

        {/* Add task button */}
        <div
          className="hover:bg-blue-50 dark:hover:bg-gray-700 p-2 rounded-full cursor-pointer transition duration-300"
          onClick={handleAddTask}
        >
          {title === "To Do" && <Plus size={20} />}
        </div>
      </div>

      {/* Render Task Cards */}
      {tasks
        .filter((task) => task.category === category)
        .map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            allTasks={allTasks}
            isNew={task.title === ""}
            category={category}
            tasks={tasks}
            setTasks={setTasks}
          />
        ))}
    </motion.div>
  );
};
