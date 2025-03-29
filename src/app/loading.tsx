import { LoaderCircle } from 'lucide-react'
import React from 'react'

export default function loading() {
    return (
        <div className='h-screen w-full flex items-center justify-center'>
            <LoaderCircle className='animate-spin mr-4 h-28 my-auto ' />
            <p className='text-2xl font-bold'>Blog Loading......</p>
        </div>
    )
}
