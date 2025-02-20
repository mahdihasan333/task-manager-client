import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useState } from "react";

const TaskManagement = () => {
    const [tasks, setTasks] = useState([
        { id: "1", title: "Task 1", category: "To-Do" },
        { id: "2", title: "Task 2", category: "In Progress" },
        { id: "3", title: "Task 3", category: "Done" },
      ]);
    
      const onDragEnd = (result) => {
        if (!result.destination) return;
    
        const updatedTasks = Array.from(tasks);
        const [movedTask] = updatedTasks.splice(result.source.index, 1);
        updatedTasks.splice(result.destination.index, 0, movedTask);
    
        setTasks(updatedTasks);
      };
    
      return (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="tasks">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {tasks.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="p-4 m-2 bg-gray-200 rounded"
                      >
                        {task.title}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      );
    };

export default TaskManagement;
