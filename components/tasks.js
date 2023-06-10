import { textFont } from "./fonts"
import style from "../css/tasks.module.css"

// CLSX enables the use of multiple classes, just like in normal html
import clsx from 'clsx';

export default function TaskContainer() {
    return(
        <div>
            <Task title={"Matematica"} isDone={false} description={"pag 22 n 12-33"}/>
        </div>
    )
}

function Task({title, isDone, description}) {
    return(
        <>
            <input type="checkbox" value={isDone}></input>
            <h2 className={textFont.className}>{title}</h2>
            <h3 className={clsx(style.taskDescription, textFont.className)}>{description}</h3>
        </>
    )
}