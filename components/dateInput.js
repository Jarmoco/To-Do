import style from "../css/dateInput.module.css"
import { textFont } from "./fonts"
import clsx from 'clsx';

export function DayInput() {

    function showDaySelector() {
    }

    return(
        <div onClick={showDaySelector}>
            <h2 className={clsx(style.genericInput, textFont.className)}>11</h2>
        </div>
    )
}

export function MonthInput() {
    return(
        <div>
            <h2 className={clsx(style.genericInput, style.monthInput, textFont.className)}>Luglio</h2>
        </div>
    )
}

export function YearInput() {
    return(
        <div>
            <h2 className={clsx(style.genericInput, textFont.className)}>2023</h2>
        </div>
    )
}

export function DaySelector({monthIndex, year}) {
    let daysInMonth = new Date(year, monthIndex, 0).getDate();
    //get current day
    let date = new Date
    let currentDay = date.getDate()

    //AGGIUNGERE SCROLLING

    return(
        <div className={style.genericSelector}>
            <DayComponent number={currentDay - 2} position={-2}></DayComponent>
            <DayComponent number={currentDay - 1} position={-1}></DayComponent>
            <DayComponent number={currentDay} position={0}></DayComponent>
            <DayComponent number={currentDay + 1} position={1}></DayComponent>
            <DayComponent number={currentDay + 2} position={2}></DayComponent>
        </div>
    )
}

function DayComponent({number, position}) {
    if (position == 0) {
        return(
            <div className={clsx(style.dayComponent, style.centralItem, textFont.className)}>
                <h2>{number}</h2>
            </div>
        )
    } else if (position == 1 || position == -1) {
        return(
            <div className={clsx(style.dayComponent, style.midItem, textFont.className)}>
                <h2>{number}</h2>
            </div>
        )
    } else if (position == 2) {
        return(
            <div className={clsx(style.dayComponent, style.bottomItem, textFont.className)}>
                <h2>{number}</h2>
            </div>
        )
    } else if (position == -2) {
        return(
            <div className={clsx(style.dayComponent, style.topItem, textFont.className)}>
                <h2>{number}</h2>
            </div>
        )
    }

    
}
