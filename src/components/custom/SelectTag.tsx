
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
interface ISelectTag {
    label: string;
    arr: { label: string, value: string }[];
    // handleChange: Dispatch<SetStateAction<string>>

}
export default function SelectTag({ arr, label, }: ISelectTag) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const handleFilter = (query: string, value: string | number) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set(query, value.toString())
        router.push(`${pathname}?${params.toString()}`, { scroll: false })
    }
    return (
        <div>
            <Select onValueChange={(value) => handleFilter(label, value)} >
                <SelectTrigger className="col-span-2 w-full border border-[#7099C8] bg-[#D9F2F7]">
                    <SelectValue placeholder={label} />
                </SelectTrigger>
                <SelectContent>
                    {arr.map(el => <SelectItem className='w-full'
                        key={el.label} value={el.value}>{el.label}</SelectItem>)}


                </SelectContent>
            </Select>
        </div>
    )
}
