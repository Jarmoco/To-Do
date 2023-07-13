import NewTaskPanel from "@/components/newTask/newTaskPanel"
// UseEffect is used to disable ssr
import { useEffect } from 'react'
import { invoke } from "@tauri-apps/api/tauri"


export default function Page() {
    /*
    useEffect(() => {
        invoke('insert', {
            title: "Test 2", 
            content: "caca3 ",
            author: "ARMD",
            year: 2023,
            month: 7,
            day: 10,
            done: false
        })
      }, [])
      */
    return (
        <>
            <NewTaskPanel />
        </>
    )
}