import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SortableItem = ({ task }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white p-4 mb-2 shadow rounded cursor-pointer"
    >
      <h3 className="text-lg font-semibold">{task?.title}</h3>
      <p className="text-gray-600">{task?.description}</p>
    </div>
  );
};

export default SortableItem;
