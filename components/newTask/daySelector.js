import style from "@/css/dateInput.module.css"
import { textFont } from "../fonts"
import clsx from 'clsx';

export function DaySelector({  monthIndex, year, onDaySelect, onClick }) {
    let daysInMonth = new Date(year, monthIndex, 0).getDate();

    function renderDays() {
        let days = []
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(<DayComponent number={i} key={i} onSelectDay={onDaySelect}></DayComponent>)
        }
        return <div>{days}</div>
    }

    return (
        <div className={clsx(style.genericSelector)} overflow-y="scroll" onClick={onClick}>
            {renderDays()}
        </div>
    )
}

function DayComponent({ number, onSelectDay }) {
    const handleClick = () => {
        const newDay = number;
        onSelectDay(newDay);
    };

    return (
        <div onClick={handleClick} className={clsx(style.dayComponent, textFont.className)}>
            <h2>{number}</h2>
        </div>
    )
}
