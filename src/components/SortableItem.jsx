import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Swal from "sweetalert2";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("https://task-manager-server-bvtr.onrender.com");

const SortableItem = ({ task, setTasks }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task._id });

  const { _id, description, title, category } = task;
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleDeleteTask = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.delete(`https://task-manager-server-bvtr.onrender.com/tasks/${_id}`);

          if (res.data.deletedCount > 0) {
            setTasks((prevTasks) => prevTasks.filter((task) => task._id !== _id));
            socket.emit("taskUpdated");

            Swal.fire({
              title: "Deleted!",
              text: "Your task has been deleted.",
              icon: "success",
            });
          } else {
            Swal.fire({
              title: "Error!",
              text: "Task not found or already deleted.",
              icon: "error",
            });
          }
        } catch (err) {
          console.error("Error deleting task:", err);
          Swal.fire({
            title: "Error!",
            text: "Failed to delete the task.",
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white p-4 mb-2 shadow rounded cursor-pointer border-l-4"
    >
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-600">{description}</p>
      <p className={`text-sm font-semibold mt-1 ${category === "To Do" ? "text-blue-500" : category === "In Progress" ? "text-yellow-500" : "text-green-500"}`}>
        {category}
      </p>
      <button onClick={handleDeleteTask} className="btn btn-sm btn-error mt-2">
        Delete
      </button>
    </div>
  );
};

export default SortableItem;