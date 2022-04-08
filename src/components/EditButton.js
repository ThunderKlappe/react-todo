import React from "react";
import { editTask } from "../actions";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";

function EditButton() {
    const dispatch = useDispatch();

    return (
        <Button variant="warning" onClick={e => dispatch(editTask(e))}>
            <FontAwesomeIcon icon={faPencil} />
        </Button>
    );
}

export default EditButton;
