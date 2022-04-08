import { useSelector, useDispatch } from "react-redux";
import { loadTasks } from "./actions";

export function saveData() {
    const allTasks = useSelector(state => state.tasks);
    localStorage.setItem("Tasks", JSON.stringify(allTasks));
}
export function loadData() {
    const dispatch = useDispatch();
    if (localStorage.getItem("Tasks")) {
        const localTasks = JSON.parse(localStorage.getItem("Tasks"));
        console.log(localTasks);
        dispatch(loadTasks(localTasks));
    }
}
