import { textFont, titleFont } from "../fonts"
import clsx from 'clsx';
import style from "@/css/newTaskPage.module.css"
import TextInput from "@/components/textInput";
import { TextArea } from "@/components/textInput";
import Blob3 from "./blobGradient3";
import { DayInput, MonthInput, YearInput } from "./dateInput";
// Allows to navigate between pages
import Link from 'next/link';
import { useState, useEffect } from 'react';

import { DaySelector } from "./daySelector";
import { MonthSelector } from "./monthSelector";
import { YearSelector } from "./yearSelector";

import { invoke } from "@tauri-apps/api/tauri"


export default function NewTaskPanel() {
    const [selectedDay, setSelectedDay] = useState(new Date().getDate() + 1);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    
    const [inputValueTitle, setInputValueTitle] = useState('');
    const [inputValueDesc, setInputValueDesc] = useState('');
    const [confirmClicked, setConfirmClicked] = useState(false);

    const handleInputChangeTitle = (event) => {
        setInputValueTitle(event.target.value);
    };
    const handleInputChangeDesc = (event) => {
        setInputValueDesc(event.target.value);
    };

    const handleSubmit = () => {
        console.log('Title:', inputValueTitle);
        console.log('Content:', inputValueDesc);
        console.log('Selected Day:', selectedDay);
        console.log('Selected Month:', selectedMonth);
        console.log('Selected Year:', selectedYear);
        // Perform further actions with the input value
        setConfirmClicked(true)
    };

    useEffect(() => {
        if (confirmClicked) {
            invoke('insert', {
                title: inputValueTitle, 
                content: inputValueDesc,
                author: "TO-DO",
                year: selectedYear,
                month: selectedMonth,
                day: selectedDay,
                done: false
            })
        }
      }, [confirmClicked, inputValueDesc, inputValueTitle, selectedDay, selectedMonth, selectedYear]);

    const [isDaySelectorVisible, setIsDaySelectorVisible] = useState(false);
    const [isMonthSelectorVisible, setIsMonthSelectorVisible] = useState(false);
    const [isYearSelectorVisible, setIsYearSelectorVisible] = useState(false);

    const handleDaySelect = (day) => {
        setSelectedDay(day);
    };

    const handleMonthSelect = (month) => {
        setSelectedMonth(month);
    };

    const handleYearSelect = (year) => {
        setSelectedYear(year);
    }

    function handleDayInputClick() {
        //Toggles the value
        setIsDaySelectorVisible((prevState) => !prevState);
    };

    function handleMonthInputClick() {
        //Toggles the value
        setIsMonthSelectorVisible((prevState) => !prevState);
    };

    function handleYearInputClick() {
        //Toggles the value
        setIsYearSelectorVisible((prevState) => !prevState);
    }

    return (
        <div className={style.container}>
            <Blob3></Blob3>
            <div className={style.newTaskPanel}>
                <h1 className={clsx(titleFont.className, style.newTaskPanelTitle)}>Nuovo compito</h1>
                <TextInput id="title" placeHolder="Titolo" value={inputValueTitle} onChange={handleInputChangeTitle}></TextInput>
                <TextArea id="content" placeHolder="Descrizione" value={inputValueDesc} onChange={handleInputChangeDesc}></TextArea>
                <div className={style.dateInputsContainer}>
                    <DayInput selectedDay={selectedDay} onClick={handleDayInputClick} />
                    <MonthInput selectedMonth={selectedMonth} onClick={handleMonthInputClick} />
                    <YearInput selectedYear={selectedYear} onClick={handleYearInputClick} />
                </div>
                <div className={style.buttonsContainer}>
                    <CancelButton />
                    <ConfirmButton onClick={handleSubmit} />
                </div>
            </div>
            {isDaySelectorVisible ?
                <DaySelector
                    monthIndex={selectedMonth}
                    year={selectedYear}
                    onDaySelect={handleDaySelect}
                    onClick={handleDayInputClick}
                /> : null
            }
            {isMonthSelectorVisible ?
                <MonthSelector
                    onMonthSelect={handleMonthSelect}
                    onClick={handleMonthInputClick}
                /> : null 
            }
            {isYearSelectorVisible ?
                <YearSelector
                    onYearSelect={handleYearSelect}
                    onClick={handleYearInputClick}
                /> : null 
            }

        </div>
    )
}


function CancelButton() {
    return (
        <button className={clsx(style.CancelButton, textFont.className)}>
            <Link href="/">Annulla</Link>
        </button>
    )
}

function ConfirmButton({ onClick }) {
    return (
        <button className={clsx(style.ConfirmButton, textFont.className)} onClick={onClick}>
            <Link href="/">Aggiungi</Link>
        </button>
    )
}