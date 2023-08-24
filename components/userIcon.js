import Image from 'next/image'
import userIconPicture from '@/public/res/userIcon.png'

export default function UserIcon() {
    return (
        <Image
            src={userIconPicture}
            className={"userIcon"}
            alt='User Icon'
        />
    )
}