import { textFont } from "./fonts"
import style from "../css/tasks.module.css"

// CLSX enables the use of multiple classes, just like in normal html
import clsx from 'clsx';

// UseEffect is used to disable ssr
import { useEffect, useState } from 'react'
import { invoke } from "@tauri-apps/api/tauri"

export default function TaskContainer() {
    const [resultArray, setResultArray] = useState([]);

    useEffect(() => {
        invoke('fetch_tasks', {
            year: new Date().getFullYear(),
            month: (new Date().getMonth()) + 1,
            day: new Date().getDate() + 1,
            //TODO: fix this string
            dbUrl: "data.db"
        })
            .then(result => {
                // Update the state with the result array
                setResultArray(result);
            })
            .catch(error => {
                // Handle any errors that occurred during the API call
                console.error('Error fetching tasks:', error);
            });
    }, [])

    function renderTasks() {
        if (resultArray.length === 0) {
            return <EmptySign />;
        }

        let tasks = []

        for (let i = 0; i < resultArray.length; i++) {
            //console.log((resultArray[i].toString()))
            let taskString = resultArray[i].toString()
            taskString = taskString.replace('Task: ', '');

            // Extracting the key-value pairs from the string
            const keyValuePairs = taskString
                .split(',')
                .map((pair) => pair.trim())
                .map((pair) => pair.split('='))
                .map(([key, value]) => [key.trim(), value.trim()]);

            // Creating an object from the key-value pairs
            const dataObject = Object.fromEntries(keyValuePairs);

            tasks.push(<Task key={i} title={dataObject.title} description={dataObject.content} />)
        }

        return tasks
    }

    return (
        <div className={style.taskContainer}>
            {renderTasks()}
        </div>
    )
}

function Task({ title, description }) {
    return (
        <div className={style.task}>
            <CheckBox />
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

function EmptySign() {
    return (
        <h1 className={clsx(style.EmptySign, textFont.className)}>
            Niente da vedere qui.
        </h1>
    )
}