/* eslint-disable react/prop-types */
import React from "react";
import { Form, Field } from "react-final-form";
import BSForm from "react-bootstrap/Form";
import Input from "./Input";
import MyDatePicker from "./MyDatePicker";
import PriorityPicker from "./PriorityPicker";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { editTask, submitEditTask } from "../actions";
import { Col, Container, Row } from "react-bootstrap";

const renderInput = ({ input, meta }) => (
    <Input {...input} type="text" errorMessage={meta.touched && meta.error} />
);

const requiredText = v => {
    if (!v || v === "") {
        return "Please give your task a name";
    }

    return undefined;
};

function EditTask(props) {
    const dispatch = useDispatch();
    return (
        <Form
            onSubmit={values => {
                dispatch(submitEditTask(values, props.taskNo));
            }}
            render={({ handleSubmit }) => (
                <Container id={`edit-task-${props.taskNo}-container`}>
                    <form onSubmit={handleSubmit}>
                        <Row>
                            <Col>
                                <BSForm.Label>Task Name</BSForm.Label>
                                <Field
                                    initialValue={props.taskName}
                                    name="taskName"
                                    component={renderInput}
                                    validate={requiredText}
                                />
                            </Col>
                            <Col>
                                <BSForm.Label>Priority</BSForm.Label>
                                <Field initialValue={props.priority} name="priority">
                                    {props => (
                                        <div>
                                            <PriorityPicker
                                                name={props.input.name}
                                                value={props.input.value}
                                                onChange={props.input.onChange}
                                            />
                                        </div>
                                    )}
                                </Field>
                            </Col>
                            <Col>
                                <BSForm.Label>Due Date</BSForm.Label>
                                <Field name="dueDate">
                                    {props => (
                                        <div>
                                            <MyDatePicker
                                                name={props.input.name}
                                                value={props.input.value}
                                                onChange={props.input.onChange}
                                            />
                                        </div>
                                    )}
                                </Field>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button variant="success" type="submit">
                                    Submit
                                </Button>
                                <Button variant="danger" onClick={e => dispatch(editTask(e))}>
                                    Cancel
                                </Button>
                            </Col>
                        </Row>
                    </form>
                </Container>
            )}
        />
    );
}

export default EditTask;
