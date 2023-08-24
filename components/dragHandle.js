import Image from 'next/image'
import dragHandlePicture from '@/public/res/dragHandle.png'

export default function DragHandle() {
    return (
        <Image
            src={dragHandlePicture}
            className={"dragHandle"}
            alt='Drag handle'
        />
    )
}