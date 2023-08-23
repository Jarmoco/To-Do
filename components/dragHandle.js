import Image from 'next/image'
import dragHandlePicture from '@/res/dragHandle.png'

export default function DragHandle() {
    return (
        <Image
            src={dragHandlePicture}
            className={"dragHandle"}
            alt='Drag handle'
        />
    )
}