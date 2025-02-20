import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../providers/AuthProvider";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  TouchSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";

const TaskManagement = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const { user } = useContext(AuthContext);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor)
  );

  useEffect(() => {
    if (!user) return;

    axios
      .get(`http://localhost:5000/tasks/${user.email}`)
      .then((res) => {
        setTasks(res.data);
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((err) => {
        console.error("Error fetching tasks:", err);
        setLoading(false); // Set loading to false in case of error
      });
  }, [user]);

  const onDragEnd = async (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = tasks.findIndex((task) => task._id === active.id);
    const newIndex = tasks.findIndex((task) => task._id === over.id);
    const updatedTasks = arrayMove(tasks, oldIndex, newIndex);

    setTasks(updatedTasks);
    try {
      await axios.put("http://localhost:5000/tasks/reorder", {
        tasks: updatedTasks,
      });
    } catch (error) {
      console.error("Error updating task order:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Your Tasks</h2>

      {loading ? ( // Show the DaisyUI loading spinner when loading
        <div className="flex justify-center items-center">
          <div className="loading loading-spinner"></div>
        </div>
      ) : tasks.length === 0 ? (
        <p className="text-gray-500">No tasks found</p>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
          <SortableContext items={tasks.map((task) => task._id)} strategy={verticalListSortingStrategy}>
            <div>
              {tasks.map((task) => (
                <SortableItem key={task._id} task={task} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
};

export default TaskManagement;
