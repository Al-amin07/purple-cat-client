"use client"
import { Button } from "@/components/ui/button"


import { ChevronLeft, ChevronRight, Menu, Search } from "lucide-react"
import { IBlog } from "@/types/blog.type"
import BlogCard from "./BlogCard"

import { categories, sortArr, travelTags } from "@/components/static"
import SelectTag from "@/components/custom/SelectTag"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import SubcategoryTag from "@/components/custom/SubcategoryTag"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import Link from "next/link"
interface IProp {
    blogs: IBlog[],
    meta: { page: number, limit: number, total: number, totalPage: number }
}
export default function BlogPage({ blogs, meta }: IProp) {
    const [page, setPage] = useState(meta.page || 1)
    const router = useRouter()
    const pathname = usePathname()

    const blogCategory = categories.map(el => ({ label: el.name, value: el.name }))
    const subcategories = categories.flatMap(category => category.subcategories);


    const searchParams = useSearchParams()
    const handleFilter = (query: string, value: string | number) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set(query, value.toString())
        router.push(`${pathname}?${params.toString()}`, { scroll: false })
    }

    return (
        <div className="bg-[#e6f2f2]">
            <div className="container mx-auto py-8 px-4 ">
                {/* Header */}
                <header className=" mb-6">
                    <h1 className="text-4xl font-semibold mb-6">Blog</h1>
                    <div className="w-full bg-[#D2ECF4] py-1 mb-3 px-2 flex items-center gap-2 rounded-full">
                        <Menu className="h-5 w-5 text-gray-500 ml-2" />
                        <Input
                            onChange={(e) => handleFilter('searchTerm', e.target.value)}
                            className="flex-1 border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-500 text-sm"
                            placeholder="Search blog by Title/Author's name/Destination/Category"
                        />
                        <div className="flex items-center gap-2 pr-1">
                            <Search className="h-5 w-5 text-gray-500" />
                            <Button className="bg-[#003d99] hover:bg-[#00327d] text-white rounded-full px-6">Search</Button>
                        </div>
                    </div>
                    <div className="flex gap-5 items-center">
                        <div className="w-full">
                            <SelectTag label="destination" arr={travelTags} />
                        </div>
                        <div className="w-full">
                            <SelectTag label="category" arr={blogCategory} />
                        </div>
                        <div className="w-full">
                            <SubcategoryTag label="subcategory" arr={subcategories} />
                        </div>

                        <div className="w-full ml-28">
                            <SelectTag label="sort By" arr={sortArr} />
                        </div>

                        <Button onClick={() => router.push(pathname)}>Reset </Button>

                    </div>
                </header>

                {/* Main Content */}
                <main className="">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {blogs?.length > 0 ? blogs?.map((blog) => (
                            <BlogCard key={blog._id} blog={blog} />
                        )) : <div className="h-48 col-span-3 w-full flex items-center justify-center">
                            <h1 className="text-xl font-semibold">Opps, No Blog Available</h1>
                        </div>}
                    </div>


                    <div className="flex items-center mt-6 justify-center  bg-[#e6f7fa] p-4">
                        <div className="flex items-center gap-2">
                            <Button
                                onClick={() => {
                                    setPage(page - 1)
                                    handleFilter('page', page - 1)
                                }}
                                disabled={page === 1}
                                variant="outline"
                                size="icon"
                                className="h-10 w-10 rounded-md bg-white hover:bg-gray-100 border-gray-200"
                            >
                                <ChevronLeft className="h-4 w-4" />
                                <span className="sr-only">Previous page</span>
                            </Button>
                            {
                                Array.from({ length: meta?.totalPage || 0 }, (_, i) => i + 1)?.map(el => <Button
                                    onClick={() => {
                                        setPage(el)
                                        handleFilter('page', el)
                                    }}
                                    key={el}
                                    variant="outline" className={`h-10 w-10 rounded-md bg-white hover:text-white hover:bg-blue-600  ${page === el ? 'bg-blue-500 text-white' : 'text-black bg-white'}`}>
                                    {el}
                                </Button>)
                            }

                            <Button
                                onClick={() => {
                                    setPage(page + 1)
                                    handleFilter('page', page + 1)
                                }}
                                disabled={page === meta.totalPage}
                                variant="outline"
                                size="icon"
                                className="h-10 w-10 rounded-md bg-white hover:bg-gray-100 border-gray-200"
                            >
                                <ChevronRight className="h-4 w-4" />
                                <span className="sr-only">Next page</span>
                            </Button>
                        </div>
                    </div>

                    {/* View All Button */}
                    <div className=" -mt-4">
                        <Link href={'/post-blog'}>
                            <Button className="bg-blue-600 hover:bg-blue-700">Post your blog</Button>
                        </Link>
                    </div>
                </main>
            </div>
        </div>

    )
}

