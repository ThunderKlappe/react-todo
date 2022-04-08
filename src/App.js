/* eslint-disable no-unused-vars */
import React from "react";
import "./App.css";
import AddButton from "./components/AddButton";
import NewTask from "./components/NewTask";
import Task from "./components/Task";
import TaskHeader from "./components/TaskHeader";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { swap } from "./actions";

function App() {
    const dispatch = useDispatch();
    const showInput = useSelector(state => state.showInput);
    const tasks = useSelector(state => state.tasks);
    const trueTasks = tasks.map(x => x);

    // trueTasks.push({ id: "red", priority: "Low", taskName: "Task2", complete: false });
    // trueTasks.push({ id: "blue", priority: "Low", taskName: "Task", complete: false });

    let incompleteTasks = [];
    let completeTasks = [];

    trueTasks.forEach((task, index) => {
        if (task.complete) {
            completeTasks.push(<Task complete="true" taskNo={index} {...task} />);
        } else {
            incompleteTasks.push(<Task complete="false" taskNo={index} {...task} />);
        }
    });

    function onDragEnd(results) {
        if (!results.destination) return;
        const sourceIndex = results.source.index;
        const destinationIndex = results.destination.index;
        dispatch(swap({ sourceIndex, destinationIndex }));
    }
    return (
        <Container id="content">
            <Row className="justify-content-md-center">
                <Col md="auto">
                    <AddButton />
                </Col>
            </Row>
            <Row>{showInput ? <NewTask /> : ""}</Row>
            <Row>{tasks.length > 0 ? <TaskHeader /> : ""}</Row>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable type="incomplete" droppableId="incomplete">
                    {provided => {
                        return (
                            <div className="incomplete" {...provided.droppableProps} ref={provided.innerRef}>
                                {incompleteTasks.map((task, index) => {
                                    return (
                                        <Draggable
                                            type="incomplete"
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
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable type="complete" droppableId="complete">
                    {provided => {
                        return (
                            <div className="complete" {...provided.droppableProps} ref={provided.innerRef}>
                                {completeTasks.map((task, index) => {
                                    return (
                                        <Draggable
                                            type="complete"
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
        </Container>
    );
}

export default App;
