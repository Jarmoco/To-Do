/* This is the main page file */
import Title from "@/components/sectionTitle"
import TaskContainer from "@/components/tasks"

//import style from section module 
import style from "../css/section.module.css"

// UseEffect is used to disable ssr
import { useEffect } from 'react'
import { invoke } from "@tauri-apps/api/tauri"

//------------------------------------------//
export default function Page() {
    useEffect(() => {
        invoke('greet')
      }, [])
    return (
        <>
            <Section/>
        </>
    )
}

function Section() {
    return (
        <div className={style.section}>
            <Blob color="#D83BDB" posX="23vw" posY="23%" size="20vw"/>
            <Blob color="#6E3BDB" posX="56vw" posY="49%" size="20vw"/>
            <Title title="Benvenuto" />
            <TaskContainer />
        </div>
    )
}

// Background colored light blobs
function Blob({ color, posX, posY, size }) {
    return (
        <>
            <div>
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path d="M35.2,-64.1C44.4,-55.7,49.7,-43.7,59.5,-32.4C69.4,-21.1,83.8,-10.6,83.5,-0.2C83.2,10.2,68.2,20.5,58,31.1C47.7,41.8,42.3,52.8,33.5,61.6C24.6,70.3,12.3,76.6,1.1,74.8C-10.2,73,-20.4,63,-33.4,56.7C-46.5,50.4,-62.4,47.8,-69.6,39C-76.7,30.2,-75,15.1,-69.9,2.9C-64.8,-9.2,-56.3,-18.4,-49,-26.9C-41.7,-35.4,-35.6,-43.2,-27.6,-52.3C-19.6,-61.4,-9.8,-71.7,1.6,-74.4C13,-77.2,26.1,-72.5,35.2,-64.1Z" transform="translate(100 100)" />
                </svg>
            </div>

            <style jsx>{`
            div {
                display: block;
                width: ${size};
                height: ${size};
                position: absolute;
                top: ${posY};
                left: ${posX};
                filter: blur(50px)
            }

            path {
                fill: ${color};
            }
                `}
            </style>
        </>
    )
}