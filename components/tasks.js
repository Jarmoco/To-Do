import { textFont } from "./fonts"
import style from "../css/tasks.module.css"

// CLSX enables the use of multiple classes, just like in normal html
import clsx from 'clsx';

// UseEffect is used to disable ssr
import { useEffect, useState } from 'react'
import { invoke } from "@tauri-apps/api/tauri"

import UserIcon from "./userIcon";
import useTranslation from "@/intl/translate";
import TextInput from "@/components/textInput";
import SaveIcon from "./saveIcon";
import { useRouter } from 'next/router';
import TrashBinIcon from "./trashBinIcon";

export default function TaskContainer({ editmode, day, readOnly }) {
    const [resultArray, setResultArray] = useState([]);
    let dbUrl;

    useEffect(() => {
        invoke('get_db_url').then(result => {
            dbUrl = result

            invoke('fetch_tasks', {
                year: new Date().getFullYear(),
                month: (new Date().getMonth()) + 1,
                day: day,
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
    }, [day])


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
                    keyValuePairs[index] = keyValuePairs[index - 1] + ", " + element
                    //keyValuePairs.splice(index, 1)
                }
            });

            // create an object to store the key-value pairs
            const keyValueObject = keyValuePairs.reduce((result, item) => {
                const [key, value] = item.split('=');
                result[key] = value;
                return result;
            }, {});

            if (editmode != "true") {
                tasks.push(<Task key={i} title={keyValueObject.title} description={keyValueObject.content} id={keyValueObject.id} isDone={JSON.parse(keyValueObject.is_done)} author={keyValueObject.author} showCheckbox={readOnly} />)
            } else {
                tasks.push(<EditableTask key={i} title={keyValueObject.title} description={keyValueObject.content} id={keyValueObject.id} isDone={JSON.parse(keyValueObject.is_done)} author={keyValueObject.author} />)
            }
        }
        return tasks
    }

    return (
        <>
            {readOnly == "true" ? (
                <div className={style.readOnlyTaskContainer}>
                    {renderTasks()}
                </div>
            ) : (
                editmode == "true" ? (
                    <div className={style.taskContainerEdit}>
                        {renderTasks()}
                    </div>
                ) : (
                    <div className={style.taskContainer}>
                        {renderTasks()}
                    </div>
                )
            )}
        </>
    )
}

function Task({ title, description, id, isDone, author, showCheckbox }) {
    return (
        <div className={style.task}>
            {showCheckbox == "false" && <CheckBox task_id={id} is_done={isDone} />}
            <h2 className={clsx(style.taskTitle, textFont.className)}>{title}</h2>
            <h3 className={clsx(style.taskDescription, textFont.className)}>{description}</h3>
            <div className={style.authorContainer}>
                <UserIcon className={style.userIcon}></UserIcon>
                <h4 className={clsx(style.taskAuthor, textFont.className)}>{author}</h4>
            </div>
        </div>
    )
}

function EditableTask({ title, description, author, id }) {
    const router = useRouter();

    const [inputTitle, setInputTitle] = useState(title)
    const [inputDescription, setInputDescription] = useState(description)

    const handleTitleChange = (event) => {
        setInputTitle(event.target.value);
    };

    const handleDescChange = (event) => {
        setInputDescription(event.target.value);
    };

    function save_edit() {
        invoke('get_db_url').then(result => {
            invoke('edit_task', {
                id: id,
                title: inputTitle,
                description: inputDescription,
                dbUrl: result
            }
            )
            router.push('/');
        })
    }

    function delete_task_function() {
        invoke('get_db_url').then(result => {
            invoke('delete_task', {
                id: id,
                dbUrl: result
            }
            )
            router.push('/');
        })
    }


    return (
        <div className={clsx(style.task, style.editableTask)}>

            <TextInput id="title" value={inputTitle} onChange={handleTitleChange} width="20"></TextInput>
            <TextInput id="description" value={inputDescription} onChange={handleDescChange} width="20"></TextInput>

            {title + description !== inputTitle + inputDescription ?
                <button onClick={save_edit} className={style.saveEditButton}>
                    <SaveIcon></SaveIcon>
                </button> : null
            }

            <div className={style.authorContainer}>
                <UserIcon className={style.userIcon}></UserIcon>
                <h4 className={clsx(style.taskAuthorEdit, textFont.className)}>{author}</h4>
            </div>

            <button onClick={delete_task_function} className={style.deleteTaskButton}>
                <TrashBinIcon ></TrashBinIcon>
            </button>

        </div>
    )
}

// Custom checkbox component
function CheckBox({ task_id, is_done }) {

    const [isChecked, setIsChecked] = useState(is_done);

    let dbUrl;

    useEffect(() => {
        invoke('get_db_url').then(result => {
            dbUrl = result
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
        if (isChecked == false) {
            new Audio("res/check.mp3").play()
        }
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
    const { t } = useTranslation()
    return (
        <h1 className={clsx(style.EmptySign, textFont.className)}>
            {t("nothingtoseehere")}
        </h1>
    )
}
