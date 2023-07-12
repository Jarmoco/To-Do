import { textFont, titleFont } from "./fonts"
import clsx from 'clsx';
import style from "../css/newTaskPage.module.css"
import TextInput from "./textInput";
import { TextArea } from "./textInput";
import Blob3 from "./blobGradient3";
import { DayInput , MonthInput, YearInput} from "./dateInput";
// Allows to navigate between pages
import Link from 'next/link';
import { useState } from 'react';

import { DaySelector } from "./dateInput";

export default function NewTaskPanel() {
    const [inputValueTitle, setInputValueTitle] = useState('');
    const [inputValueDesc, setInputValueDesc] = useState('');

    const handleInputChangeTitle = (event) => {
        setInputValueTitle(event.target.value);
    };
    const handleInputChangeDesc = (event) => {
        setInputValueDesc(event.target.value);
    };

    const handleSubmit = () => {
        console.log('Title:', inputValueTitle);
        console.log('Content:', inputValueDesc);
        // Perform further actions with the input value
    };


    return (
        <div className={style.container}>
            <Blob3></Blob3>
            <div className={style.newTaskPanel}>
                <h1 className={clsx(titleFont.className, style.newTaskPanelTitle)}>Nuovo compito</h1>
                <TextInput id="title" placeHolder="Titolo" value={inputValueTitle} onChange={handleInputChangeTitle}></TextInput>
                <TextArea id="content" placeHolder="Descrizione" value={inputValueDesc} onChange={handleInputChangeDesc}></TextArea>
                <div className={style.dateInputsContainer}>
                    <DayInput />
                    <MonthInput />
                    <YearInput />
                </div>
                <div className={style.buttonsContainer}>
                    <CancelButton />
                    <ConfirmButton onClick={handleSubmit}/>
                </div>
            </div>
            <DaySelector monthIndex={8} year={2023}></DaySelector>
        </div>
    )
}


function CancelButton() {
    return(
        <button className={clsx(style.CancelButton, textFont.className)}>
            <Link href="/">Annulla</Link>
        </button>
    )
}

function ConfirmButton({ onClick }) {
    return(
        <button className={clsx(style.ConfirmButton, textFont.className)} onClick={onClick}>
            <Link href="/">Aggiungi</Link>
        </button>
    )
}