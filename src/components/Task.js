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
                        <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                            <div className="task-name">{props.taskName}</div>
                        </Col>
                        <Col xs={2} sm={2} md={2} lg={2} xl={2} xxl={2}>
                            <div className="priority">{props.priority}</div>
                        </Col>
                        <Col xs={2} sm={2} md={2} lg={2} xl={2} xxl={2}>
                            <div className="due-date">{dueDate}</div>
                        </Col>
                        <Col>
                            <Row>
                                <Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
                                    <CompleteButton complete={props.complete} />
                                </Col>
                                <Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
                                    <DeleteButton />
                                </Col>
                                <Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
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
