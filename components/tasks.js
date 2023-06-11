import { textFont } from "./fonts"
import style from "../css/tasks.module.css"

// CLSX enables the use of multiple classes, just like in normal html
import clsx from 'clsx';

export default function TaskContainer() {
    return (
        <div className={style.taskContainer}>
            <Task title={"Matematica"} description={"pag 22 n 12-33"} />
            <Task title={"Arte"} description={"pag 22 n 12-33, 22, 44, 553, 44"} />
            <Task title={"Fisica"} description={"pag 22 n 12-3 sdas sad3"} />
            <Task title={"Scienze"} description={"pdsadg 22 n 12-33"} />
            <Task title={"Storia"} description={"pag 22  dasdasdn 12-33"} />
            <Task title={"Filosofia"} description={"pwewerwerag 22 an 12-33"} />
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

// Custom checkbox component
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