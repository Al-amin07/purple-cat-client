import { cn } from "@/lib/utils";
import Image from "next/image";

type TProps = {

    setImageFiles: React.Dispatch<React.SetStateAction<File[] | []>>;
    imagePreviews?: string[] | [];
    className?: string
    setImagePreviews: React.Dispatch<React.SetStateAction<string[] | []>>;
}
const ImagePreviewer = ({ setImageFiles, setImagePreviews, imagePreviews, className }: TProps) => {
    const handleDelete = (index: number) => {
        setImageFiles((prev) => prev.filter((_, i) => i !== index))
        setImagePreviews((prev) => prev.filter((_, i) => i !== index))
    }
    return (
        <div className="flex gap-4">
            {
                imagePreviews?.map((preview, index) => (
                    <div className={cn("relative", className)} key={index}>
                        <Image src={preview} height={500} width={500} alt={`Preview ${index}`} className="h-36 w-36" />
                        <button
                            type="button"
                            onClick={() => handleDelete(index)}
                            className="bg-red-500 w-6 h-6 flex items-center justify-center rounded-full text-gray-200 absolute top-1 right-1"
                        >
                            X
                        </button>
                    </div>
                ))
            }

        </div>
    )
};


export default ImagePreviewer;