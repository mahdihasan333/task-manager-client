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

  console.log('tasks', tasks)
  console.log('tasks', tasks[0].title)

  // Fetch tasks from the backend
  useEffect(() => {
    if (loading || !user?.email) return;

    const fetchTasks = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/tasks/${user.email}`);
        console.log("Fetched tasks:", res.data); // Debugging log
        setTasks(res.data); // Store the fetched tasks
      } catch (err) {
        console.error("Error fetching tasks:", err);
      } finally {
        setFetching(false);
      }
    };

    fetchTasks();

    // Listen for task updates via socket
    socket.on("taskUpdated", fetchTasks);

    return () => {
      socket.off("taskUpdated", fetchTasks); // Cleanup the socket listener
    };
  }, [user, loading]);

  // Map sections to category ObjectIds
  const sectionCategoryMapping = {
    "To Do": "603c72ef4f1a2b001f1f0b32", // Replace with actual ObjectId for 'To Do' category
    "In Progress": "603c72ef4f1a2b001f1f0b33", // Replace with actual ObjectId for 'In Progress' category
    "Done": "603c72ef4f1a2b001f1f0b34", // Replace with actual ObjectId for 'Done' category
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return; // Prevent no-op if no category change

    // Find the new category ObjectId based on the dropped section
    const updatedCategory = sectionCategoryMapping[over.id];

    // Update the tasks' category
    const updatedTasks = tasks.map((task) =>
      task._id === active.id ? { ...task, category: updatedCategory } : task
    );

    console.log("Updated tasks after drag:", updatedTasks); // Debugging log

    setTasks(updatedTasks); // Update the local UI state

    try {
      // Send the updated task order and category to the backend
      const res = await axios.put("http://localhost:5000/tasks/reorder", { tasks: updatedTasks });
      if (res.status === 200) {
        socket.emit("taskUpdated"); // Emit task update after reorder
      }
    } catch (err) {
      console.error("Error updating task order:", err);
    }
  };

  if (loading || fetching) {
    return <p className="text-center">Loading tasks...</p>;
  }

  // Filter tasks for each category
  const tasksForCategory = (category) => {
    const categoryId = sectionCategoryMapping[category];
    return tasks.filter((task) => task.category === categoryId); // Use categoryId to filter tasks
  };

  const categories = ["To Do", "In Progress", "Done"]; // Task categories

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto mt-5">
        {categories.map((category) => (
          <div key={category} className="bg-gray-100 p-4 rounded shadow min-h-[200px]">
            <h2 className="text-center text-xl font-bold mb-3">{category}</h2>
            <SortableContext
              items={tasksForCategory(category).map((task) => task._id)}
            >
              {tasksForCategory(category).map((task) => (
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
