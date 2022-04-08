/* eslint-disable react/prop-types */
import React from "react";
import { useDispatch } from "react-redux";
import { Row } from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { swap } from "../actions";

function MyDragDrop(props) {
    const dispatch = useDispatch();

    function onDragEnd(results) {
        if (!results.destination) return;
        const type = results.type;
        const sourceIndex = results.source.index;
        const destinationIndex = results.destination.index;
        dispatch(swap({ sourceIndex, destinationIndex, type }));
    }
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable type={props.type} droppableId={props.type}>
                {provided => {
                    return (
                        <div className={props.type} {...provided.droppableProps} ref={provided.innerRef}>
                            {props.draggables.map((task, index) => {
                                return (
                                    <Draggable
                                        type={props.type}
                                        key={`key-${index}`}
                                        draggableId={`id-${index}`}
                                        index={index}
                                    >
                                        {provided => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <Row>{task}</Row>
                                            </div>
                                        )}
                                    </Draggable>
                                );
                            })}
                            {provided.placeholder}
                        </div>
                    );
                }}
            </Droppable>
        </DragDropContext>
    );
}
export default MyDragDrop;
