import Image from 'next/image'
import userIconPicture from '@/res/userIcon.png'

export default function UserIcon() {
    return (
        <Image
            src={userIconPicture}
            className={"userIcon"}
            alt='User Icon'
        />
    )
}