import { textFont } from "./fonts"
import style from "../css/tasks.module.css"

// CLSX enables the use of multiple classes, just like in normal html
import clsx from 'clsx';

// UseEffect is used to disable ssr
import { useEffect, useState } from 'react'
import { invoke } from "@tauri-apps/api/tauri"

export default function TaskContainer() {
    const [resultArray, setResultArray] = useState([]);
    let dbUrl;

    useEffect(() => {
        invoke('get_db_url').then(result => {
            dbUrl = result

            invoke('fetch_tasks', {
                year: new Date().getFullYear(),
                month: (new Date().getMonth()) + 1,
                day: new Date().getDate() + 1,
                dbUrl: dbUrl,
            })
                .then(result => {
                    // Update the state with the result array
                    setResultArray(result);
                })
                .catch(error => {
                    // Handle any errors that occurred during the API call
                    console.error('Error fetching tasks:', error);
                });
        })




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

            // Split the input string into an array of key-value pairs
            const keyValuePairs = taskString.split(', ');

            // When a string contains a comma, it gets split, so we re-add the split part back into the 
            // key-value pair
            keyValuePairs.forEach((element, index) => {
                if (!element.includes("=")) {
                    //console.log(element)
                    keyValuePairs[index - 1] = keyValuePairs[index - 1] + ", " + element
                    keyValuePairs.splice(index, 1)
                }
            });

            // create an object to store the key-value pairs
            const keyValueObject = keyValuePairs.reduce((result, item) => {
                const [key, value] = item.split('=');
                result[key] = value;
                return result;
            }, {});

            //console.log(keyValueObject);

            tasks.push(<Task key={i} title={keyValueObject.title} description={keyValueObject.content} id={keyValueObject.id} isDone={JSON.parse(keyValueObject.is_done)} />)
        }
        return tasks
    }

    return (
        <div className={style.taskContainer}>
            {renderTasks()}
        </div>
    )
}

function Task({ title, description, id, isDone }) {
    return (
        <div className={style.task}>
            <CheckBox task_id={id} is_done={isDone} />
            <h2 className={clsx(style.taskTitle, textFont.className)}>{title}</h2>
            <h3 className={clsx(style.taskDescription, textFont.className)}>{description}</h3>
        </div>
    )
}

// Custom checkbox component
function CheckBox({ task_id, is_done }) {
    const [isChecked, setIsChecked] = useState(is_done);
    let dbUrl;

    useEffect(() => {
        invoke('get_db_url').then(result => {
            dbUrl=result
            // This code will be executed whenever the checkbox state (isChecked) changes
            if (isChecked) {
                //console.log('Checkbox is checked');
                invoke('update_task', { id: task_id, status: isChecked, dbUrl: dbUrl })
            } else {
                //console.log('Checkbox is unchecked');
                invoke('update_task', { id: task_id, status: isChecked, dbUrl: dbUrl })
            }
        })


    }, [isChecked, task_id]);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked); // Toggle the checkbox state
    };

    return (
        <>
            <label className={style.checkboxContainer}>
                <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange}></input>
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