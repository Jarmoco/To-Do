import style from "../css/calendar.module.css"
import { textFont } from "@/components/fonts"
import clsx from 'clsx';
import { useEffect, useRef, useState } from "react";
import TaskContainer from "./tasks";

export default function ScrollableCalendar() {
    const containerRef = useRef(null);
    const [focusedDay, setFocusedDay] = useState(1);

    let days = makeDayArray();

    function makeDayArray() {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        const daysArray = Array.from({ length: lastDayOfMonth }, (_, index) => index + 1);
        return daysArray;
    }

    function vwToPx(vwValue) {
        const vwWidth = window.innerWidth;
        const pxValue = (vwValue / 100) * vwWidth;
        return pxValue;
    }

    function handleScroll(event) {
        const focus = Math.floor((event.currentTarget.scrollTop / vwToPx(15)) + 4);
        setFocusedDay(focus);
    };

    return (
        <div className={style.calendarContainer}>
            <div className={style.scrollableCalendar} ref={containerRef} onScroll={handleScroll}>
                {days.map((number, index) => (
                    <div
                        key={index}
                        className={clsx(
                            style.dayOutline,
                            {
                                [style.currentDayOutline]: number === focusedDay,
                                [style.passedDayOutline]: number < focusedDay,
                                [style.comingDayOutline]: number > focusedDay,
                            }
                        )}
                    >
                        <Day number={number} />
                    </div>
                ))}
            </div>
            <TaskContainer editmode="false" day={focusedDay} readOnly="true"></TaskContainer>
        </div>

    );
}

function Day({ number }) {
    return (
        <div className={clsx(style.day, textFont.className)}>
            {number}
        </div>
    )
}