/* eslint-disable no-unused-vars */
import React from "react";
import "./App.css";
import AddButton from "./components/AddButton";
import NewTask from "./components/NewTask";
import Task from "./components/Task";
import TaskHeader from "./components/TaskHeader";
import { useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import MyDragDrop from "./components/MyDragDrop";

function App() {
    const showInput = useSelector(state => state.showInput);
    const tasks = useSelector(state => state.tasks);
    const trueTasks = tasks.map(x => x);

    let incompleteTasks = [];
    let completeTasks = [];

    trueTasks.forEach((task, index) => {
        if (task.complete) {
            completeTasks.push(<Task complete="true" taskNo={index} {...task} />);
        } else {
            incompleteTasks.push(<Task complete="false" taskNo={index} {...task} />);
        }
    });

    return (
        <Container id="content">
            <Row className="justify-content-md-center">
                <Col md="auto">
                    <AddButton />
                </Col>
            </Row>
            <Row>{showInput ? <NewTask /> : ""}</Row>
            <Row>{tasks.length > 0 ? <TaskHeader /> : ""}</Row>

            <MyDragDrop type="incomplete" draggables={incompleteTasks} />
            <MyDragDrop type="complete" draggables={completeTasks} />
        </Container>
    );
}

export default App;
