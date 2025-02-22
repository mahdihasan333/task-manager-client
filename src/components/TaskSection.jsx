import React from "react";
import { motion } from "framer-motion";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { useTaskContext } from "../providers/TaskContext";
import { SingleTask } from "./SingleTask";
import { useContext } from "react";
import { ThemeContext } from "../providers/ThemeProvider";

export const TaskSection = () => {
  const { tasks, setTasks, handleDragEnd } = useTaskContext();
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`w-full transition duration-300 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4"
        >
          <SingleTask
            title="To Do"
            category="todo"
            tasks={tasks.filter((t) => t.category === "todo")}
            setTasks={setTasks}
            allTasks={tasks}
          />
          <SingleTask
            title="In Progress"
            category="inProgress"
            tasks={tasks.filter((t) => t.category === "inProgress")}
            setTasks={setTasks}
            allTasks={tasks}
          />
          <SingleTask
            title="Done"
            category="done"
            tasks={tasks.filter((t) => t.category === "done")}
            setTasks={setTasks}
            allTasks={tasks}
          />
        </motion.div>
      </DndContext>
    </div>
  );
};
