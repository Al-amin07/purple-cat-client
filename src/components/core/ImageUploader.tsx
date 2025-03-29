import React from 'react';
import { Input } from '../ui/input';
// import { Input } from '../../input';
type TProps = {
    label?: string
    setImageFiles: React.Dispatch<React.SetStateAction<File[] | []>>;
    setImagePreviews: React.Dispatch<React.SetStateAction<string[] | []>>;
}
const ImageUploader = ({ label = 'Upload Image', setImageFiles, setImagePreviews }: TProps) => {


    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            setImageFiles((prev) => [...prev, file])
            const reader = new FileReader()
            reader.onloadend = () => {
                setImagePreviews((prev) => [...prev, reader.result as string])
            }
            reader.readAsDataURL(file)
        }
        event.target.value = ''
    }

    return (
        <div className='flex items-center gap-16'>
            <Input onChange={handleImageChange} className='hidden' type='file' multiple accept='image/*' id='image-upload' />
            <label className='text-sm font-semibold' >{label}</label>
            <label
                htmlFor="image-upload"
                className="w-full h-36 md:size-36 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md cursor-pointer text-center text-sm text-gray-500 hover:bg-gray-50 transition"
            >
                {label}
            </label>
        </div>
    );
};

export default ImageUploader;