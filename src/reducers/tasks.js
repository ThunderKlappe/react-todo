import getAncestor from "../getAncestor";

const taskReducer = (state = [], action) => {
    //copy the array of tasks from the state into something I can modify
    let stateTemp = state.map(x => x);
    let taskNo, indexInfo, tempTask;
    let completeStateTemp = [],
        incompleteStateTemp = [];

    switch (action.type) {
        case "ADD_TASK":
            //add the payload values from the form to the end of the task array
            stateTemp.push(action.payload);
            //set the new task to have the complete value be false
            stateTemp[stateTemp.length - 1].complete = false;
            //set the new task to have the editable value be false
            stateTemp[stateTemp.length - 1].editable = false;
            //return the modified array as the new state
            return stateTemp;
        case "DELETE_TASK":
            //find out which task is being deleted by looking at the parent's dataset
            taskNo = getAncestor(action.payload.currentTarget, 6).dataset.task;
            //remove the element at that index in the array
            stateTemp.splice(taskNo, 1);
            //return the modified array as the new state
            return stateTemp;
        case "COMPLETE_TASK":
            //find out which task is being completed by looking at the parent's dataset
            taskNo = getAncestor(action.payload.currentTarget, 6).dataset.task;
            //toggle the complete value at that index in the array
            stateTemp[taskNo].complete = !stateTemp[taskNo].complete;
            //return the modified array as the new state
            return stateTemp;
        case "SWAP_TASKS":
            //get the source and destination index from the payload
            indexInfo = action.payload;

            //separate the tasks into a complete list and and incomplete list
            stateTemp.forEach(task => {
                task.complete ? completeStateTemp.push(task) : incompleteStateTemp.push(task);
            });

            //if the moved task was complete, move it in the Complete array, else move in Incomplete
            if (indexInfo.type == "complete") {
                //get the task that was at the source index and remove it from the list
                tempTask = completeStateTemp.splice(indexInfo.sourceIndex, 1)[0];
                //put the task back into the array at the destination index
                completeStateTemp.splice(indexInfo.destinationIndex, 0, tempTask);
            } else {
                tempTask = incompleteStateTemp.splice(indexInfo.sourceIndex, 1)[0];
                incompleteStateTemp.splice(indexInfo.destinationIndex, 0, tempTask);
            }
            //push the complete list onto the end of the incomplete list
            completeStateTemp.forEach(task => {
                incompleteStateTemp.push(task);
            });
            //return the full new array as the new state

            return incompleteStateTemp;
        case "EDIT_TASK":
            //find out which task is being edited by looking at the parent's dataset
            taskNo = getAncestor(action.payload.currentTarget, 6).dataset.task;
            //toggle the editable property of that task
            stateTemp[taskNo].editable = !stateTemp[taskNo].editable;
            return stateTemp;

        case "SUBMIT_EDIT_TASK":
            //get the task that was edited
            taskNo = action.payload.taskNo;
            //set the task to have the new Values
            stateTemp[taskNo].taskName = action.payload.task.taskName;
            stateTemp[taskNo].priority = action.payload.task.priority;
            stateTemp[taskNo].dueDate = action.payload.task.dueDate;
            //toggle the task to no longer be editable;
            stateTemp[taskNo].editable = !stateTemp[taskNo].editable;
            return stateTemp;
        default:
            return state;
    }
};
export default taskReducer;
