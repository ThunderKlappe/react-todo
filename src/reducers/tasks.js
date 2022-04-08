import getAncestor from "../getAncestor";

const taskReducer = (state = [], action) => {
    //copy the array of tasks from the state into something I can modify
    let stateTemp = state.map(x => x);
    let taskNo;
    let indexInfo;
    let tempTask;
    switch (action.type) {
        case "ADD_TASK":
            //add the payload values from the form to the end of the task array
            stateTemp.push(action.payload);
            //set the new task to have the complete value be false
            stateTemp[stateTemp.length - 1].complete = false;
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
            //get the task that was at the source index and remove it from the list
            tempTask = stateTemp.splice(indexInfo.sourceIndex, 1)[0];
            //put the task back into the array at the destination index
            stateTemp.splice(indexInfo.destinationIndex, 0, tempTask);
            //return the modified array as the new state
            return stateTemp;
        default:
            return state;
    }
};
export default taskReducer;
