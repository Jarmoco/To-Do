import style from "@/css/dateInput.module.css"
import { textFont } from "../fonts"
import clsx from 'clsx';

export function MonthSelector({ onMonthSelect, onClick }) {
    function renderMonths() {
        let months = []
        for (let i = 1; i <= 12; i++) {
            months.push(<MonthComponent number={i} key={i} onMonthSelect={onMonthSelect}></MonthComponent>)
        }
        return <div>{months}</div>
    }

    return (
        <div className={clsx(style.genericSelector)} overflow-y="scroll" onClick={onClick}>
            {renderMonths()}
        </div>
    )
}

function MonthComponent({ number, onMonthSelect }) {
    const handleClick = () => {
        const newMonth = number;
        onMonthSelect(newMonth);
    };

    let mese

    if (number == 1) mese = "Gennaio"
    if (number == 2) mese = "Febbraio"
    if (number == 3) mese = "Marzo"
    if (number == 4) mese = "Aprile"
    if (number == 5) mese = "Maggio"
    if (number == 6) mese = "Giugno"
    if (number == 7) mese = "Luglio"
    if (number == 8) mese = "Agosto"
    if (number == 9) mese = "Settembre"
    if (number == 10) mese = "Ottobre"
    if (number == 11) mese = "Novembre"
    if (number == 12) mese = "Dicembre"

    //console.log(number)
    return (
        <div onClick={handleClick} className={clsx(style.monthComponent, textFont.className)}>
            <h2>{mese}</h2>
        </div>
    )
}
