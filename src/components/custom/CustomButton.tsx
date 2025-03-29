import React from 'react'
import { Button } from '../ui/button'
interface ICustomButtonProps {
    text: string;
    onClick?: () => void;
    radius?: string

}
export default function CustomButton({ text, onClick, radius = 'full' }: ICustomButtonProps) {
    return (
        <Button onClick={onClick} className={`bg-[#003B95] text-white rounded-${radius}`}>{text}</Button>
    )
}
