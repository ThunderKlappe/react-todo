/* eslint-disable react/prop-types */
import React from "react";
import { Col, Container, Row } from "react-bootstrap";

function Task() {
    return (
        <Container className="task-header">
            <Row>
                <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                    <div className="task-name-header">Task Name</div>
                </Col>
                <Col xs={2} sm={2} md={2} lg={2} xl={2} xxl={2}>
                    <div className="priority-header">Priority</div>
                </Col>
                <Col xs={2} sm={2} md={2} lg={2} xl={2} xxl={2}>
                    <div className="due-date-header">Due Date</div>
                </Col>
            </Row>
        </Container>
    );
}
export default Task;
