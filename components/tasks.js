import { textFont } from "./fonts"
import style from "../css/tasks.module.css"

// CLSX enables the use of multiple classes, just like in normal html
import clsx from 'clsx';

export default function TaskContainer() {
    return (
        <div className={style.taskContainer}>
            <Task title={"Matematica"} description={"pag 22 n 12-33"} />
        </div>
    )
}

function Task({ title, description }) {
    return (
        <div className={style.task}>
            <CheckBox/>
            <h2 className={clsx(style.taskTitle, textFont.className)}>{title}</h2>
            <h3 className={clsx(style.taskDescription, textFont.className)}>{description}</h3>
        </div>
    )
}

function CheckBox() {
    return (
        <>
            <label className={style.checkboxContainer}>
                <input type="checkbox"></input>
                    <span className={style.checkmark}></span>
            </label>
        </>
    )
}