import Image from "next/image"
import { Heart, Eye, Bookmark, MessageSquare } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { IBlog } from "@/types/blog.type"
import user from '@/app/assets/u.jpeg'
export default function BlogCard({ blog }: { blog: IBlog }) {
    const dateStr = "2025-03-29T17:20:36.339Z";
    const date = new Date(dateStr);

    const formattedDate = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });
    return (

        <div className="w-full p-5 bg-white rounded-xl shadow-lg overflow-hidden">
            <div className=" space-y-2">

                <h2 className="text-xl font-bold">{blog?.title}</h2>



                <div className="flex gap-2">
                    <Badge className="bg-[#003B95] hover:bg-blue-700 text-white rounded-full px-4">{blog?.category}</Badge>
                    <Badge className="bg-[#003B95] hover:bg-blue-700 text-white rounded-full px-4">{blog?.subcategory}</Badge>
                </div>

                <p className="text-base font-medium">{blog?.shortDescription}</p>
            </div>

            <div className=" mt-4 ">
                <div className="bg-[#e6f0f5] rounded-lg p-4">
                    <p className="text-gray-700 text-sm line-clamp-3">
                        {blog?.content}
                    </p>
                    <span className="text-blue-600 text-sm hover:underline cursor-pointer font-medium"> Read more</span>
                </div>

                <div className="flex items-center gap-6 py-2">
                    <div className="flex items-center gap-1">
                        <Heart className="h-5 cursor-pointer w-5 text-gray-600" />
                        <span className="text-gray-600">{blog?.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Eye className="h-5 cursor-pointer w-5 text-gray-600" />
                        <span className="text-gray-600">{blog?.views}</span>
                    </div>
                    <div className="ml-auto">
                        <Bookmark className="h-5 w-5 cursor-pointer text-gray-600" />
                    </div>
                </div>

                <div className="grid grid-cols-3  my-2 gap-2">
                    <div className="relative col-span-3 flex gap-2 w-full h-24  overflow-hidden">
                        {blog?.images?.map((el, index) => (
                            <Image key={index} alt="Blog Image" src={el} width={120} height={120} className="object-cover" />
                        ))}


                    </div>

                </div>
            </div>

            <div className=" flex justify-between mt-4 items-center">
                <div className="flex items-center gap-3">
                    <Image src={user} height={40} width={40} alt="User" className="rounded-full" />
                    <div>
                        <p className="font-bold">{blog?.author?.name}</p>
                        <p className="text-sm text-gray-500">Published on: {formattedDate}</p>
                    </div>
                </div>
                <label className="bg-[#003B95] px-5 py-1 flex items-center text-white hover:bg-blue-700 rounded-full">
                    Follow <MessageSquare className="ml-1 h-4 w-4" />
                </label>
            </div>
        </div>

    )
}

