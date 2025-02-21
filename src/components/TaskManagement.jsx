import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { DndContext, closestCorners } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";
import { AuthContext } from "../providers/AuthProvider";

const socket = io("http://localhost:5000");

const TaskManagement = () => {
  const { user, loading } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (loading || !user?.email) return;

    const fetchTasks = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/tasks/${user.email}`);
        setTasks(res.data);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      } finally {
        setFetching(false);
      }
    };

    fetchTasks();

    socket.on("taskUpdated", fetchTasks);
    return () => {
      socket.off("taskUpdated", fetchTasks);
    };
  }, [user, loading]);

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const updatedTasks = tasks.map((task) =>
      task._id === active.id ? { ...task, category: over.id } : task
    );

    setTasks(updatedTasks);

    try {
      await axios.put("http://localhost:5000/tasks/reorder", { tasks: updatedTasks });
      socket.emit("taskUpdated");
    } catch (err) {
      console.error("Error updating task order:", err);
    }
  };

  if (loading || fetching) {
    return <p className="text-center">Loading tasks...</p>;
  }

  const categories = ["To Do", "In Progress", "Done"];

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-3 gap-4 max-w-6xl mx-auto mt-5">
        {categories.map((category) => (
          <div key={category} className="bg-gray-100 p-4 rounded shadow min-h-[200px]">
            <h2 className="text-center text-xl font-bold mb-3">{category}</h2>
            <SortableContext items={tasks.filter((task) => task.category === category).map((task) => task._id)}>
              {tasks
                .filter((task) => task.category === category)
                .map((task) => (
                  <SortableItem key={task._id} task={task} setTasks={setTasks} />
                ))}
            </SortableContext>
          </div>
        ))}
      </div>
    </DndContext>
  );
};

export default TaskManagement;
