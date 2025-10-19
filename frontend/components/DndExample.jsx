// src/components/DndExample.jsx
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const initialItems = [
  { id: "item-1", content: "Первый" },
  { id: "item-2", content: "Второй" },
  { id: "item-3", content: "Третий" },
];

export default function DndExample() {
  const [items, setItems] = useState(initialItems);

  function handleOnDragEnd(result) {
    const { destination, source } = result;
    if (!destination) return; // отпустили за пределами

    // ничего не менять, если позиция не изменилась
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const updated = Array.from(items);
    const [moved] = updated.splice(source.index, 1);
    updated.splice(destination.index, 0, moved);
    setItems(updated);
  }

  return (
    <div style={{ padding: 16 }}>
      <h5>Drag & Drop — пример</h5>
      <p>Перетащи элемент в списке, чтобы изменить порядок.</p>

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="droppable-list">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{
                background: "#f8f9fa",
                padding: 8,
                borderRadius: 6,
                minHeight: 80,
                width: 300,
              }}
            >
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(providedDraggable, snapshot) => (
                    <div
                      ref={providedDraggable.innerRef}
                      {...providedDraggable.draggableProps}
                      {...providedDraggable.dragHandleProps}
                      style={{
                        userSelect: "none",
                        padding: 12,
                        margin: "0 0 8px 0",
                        borderRadius: 4,
                        background: snapshot.isDragging ? "#cfe2ff" : "#ffffff",
                        boxShadow: snapshot.isDragging
                          ? "0 2px 8px rgba(0,0,0,0.15)"
                          : "0 1px 2px rgba(0,0,0,0.06)",
                        ...providedDraggable.draggableProps.style,
                      }}
                    >
                      {item.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
