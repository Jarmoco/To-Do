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
        const focus = Math.floor((event.currentTarget.scrollTop / vwToPx(15.3)) + 1);
        setFocusedDay(focus);
    };




    useEffect(() => {
        function setDefaultDay() {
            let day = new Date().getDate();
            containerRef.current.scrollTop = (day) * vwToPx(16);
        }

        setDefaultDay();
    }, []);

    return (
        <div className={style.calendarContainer}>
            <Fade side="left"/>
            <Fade side="right"/>
            <div className={style.scrollableCalendar} ref={containerRef} onScroll={handleScroll}>
                <GhostElement/>
                <GhostElement/>
                <GhostElement/>
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
                <GhostElement/>
                <GhostElement/>
                <GhostElement/>
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

function GhostElement() {
    return (
        <div className={clsx(style.dayOutline)}>
        </div>
    )
}

function Fade({side}) {
    if (side == "left") {
        return(
            <div className={style.calendarFadeLeft}>
    
            </div>
        )
    } else if (side == "right") {
        return(
            <div className={style.calendarFadeRight}>
    
            </div>
        )   
    }

}