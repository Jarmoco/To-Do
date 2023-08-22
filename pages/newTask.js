import NewTaskPanel from "@/components/newTask/newTaskPanel"
import SettingsContainer from "@/components/settings";
import dynamic from 'next/dynamic';

export default function Page() {
    const DynamicCustomTitleBar = dynamic(() => import('@/components/titlebar'), {
        ssr: false,
    });


    return (
        <>
            <DynamicCustomTitleBar />
            <NewTaskPanel />
        </>
    )
}