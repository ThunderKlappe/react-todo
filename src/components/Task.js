/* eslint-disable react/prop-types */
import { format } from "date-fns";
import React from "react";
import { Alert, Col, Container, Row } from "react-bootstrap";
import DeleteButton from "./DeleteButton";
import CompleteButton from "./CompleteButton";
import EditButton from "./EditButton";
import EditTask from "./EditTask";

function Task(props) {
    const dueDate = format(props.dueDate || new Date(), "M/d/yyyy");
    return (
        <Container
            id={`task-${props.taskNo}`}
            data-task={props.taskNo}
            data-name={props.taskName}
            data-priority={props.priority}
            data-date={dueDate}
            className="task-container "
        >
            <Alert
                variant={
                    props.complete == true
                        ? "secondary"
                        : props.priority == "Low"
                        ? "success"
                        : props.priority == "Medium"
                        ? "warning"
                        : props.priority == "High"
                        ? "danger"
                        : "dark"
                }
            >
                {props.editable ? (
                    <EditTask {...props} />
                ) : (
                    <Row>
                        <Col>
                            <div className="task-name">{props.taskName}</div>
                        </Col>
                        <Col>
                            <div className="priority">{props.priority}</div>
                        </Col>
                        <Col>
                            <div className="due-date">{dueDate}</div>
                        </Col>
                        <Col>
                            <Row>
                                <Col>
                                    <CompleteButton complete={props.complete} />
                                </Col>
                                <Col>
                                    <DeleteButton />
                                </Col>
                                <Col>
                                    <EditButton />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                )}
            </Alert>
        </Container>
    );
}
export default Task;
