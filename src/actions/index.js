export const showInput = () => {
    return { type: "SHOW_INPUT" };
};
export const addTask = task => {
    return {
        type: "ADD_TASK",
        payload: task,
    };
};
export const deleteTask = e => {
    return {
        type: "DELETE_TASK",
        payload: e,
    };
};
export const completeTask = e => {
    return {
        type: "COMPLETE_TASK",
        payload: e,
    };
};
export const swap = indexInfo => {
    return {
        type: "SWAP_TASKS",
        payload: indexInfo,
    };
};
