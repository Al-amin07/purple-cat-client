/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { categories, travelTags } from "@/components/static"
import ImageUploader from "@/components/core/ImageUploader"
import ImagePreviewer from "@/components/core/ImagePreviewer"
import { createBlog } from "@/services/blog"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function BlogForm() {
    const [imageFiles, setImageFiles] = useState<File[] | []>([]);
    const [imagePerviews, setImagePreviews] = useState<string[] | []>([]);
    const router = useRouter()
    const form = useForm();
    const { formState: { isSubmitting } } = form
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading('Creating blog...')
        console.table(data);
        const formData = new FormData();
        formData.append('data', JSON.stringify(data))
        for (const file of imageFiles) {
            formData.append('images', file)
        }
        try {
            const result = await createBlog(formData)
            console.log(result)
            if (result?.success) {
                toast.success(result?.message || 'Product created successfully', { id: toastId })
                router.push('/')
            } else {
                toast.error(result?.message || 'Something went wrong', { id: toastId })
            }
        } catch (error: any) {
            console.log(error)
        }

    }
    console.log(imageFiles)
    const cat = form.watch("category")
    const subCategories = categories.find((category) => category.name === cat)?.subcategories


    return (
        <div className="flex items-center justify-center min-h-screen bg-[#E0F7FA] p-4">
            <div className="w-full max-w-6xl   rounded-lg p-8">
                <h1 className="text-2xl font-bold mb-6">Blog Form</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} >
                        <div className="space-y-8 flex flex-col md:flex-row gap-12 justify-between">
                            <div className="space-y-6 flex-1">
                                {/* Author */}
                                <FormField
                                    control={form.control}
                                    name="author.name"

                                    render={({ field }) => (
                                        <FormItem className="grid md:grid-cols-3 items-center 
                                            ">
                                            <FormLabel>Author Name: </FormLabel>
                                            <FormControl>
                                                <Input className="md:col-span-2 border border-[#7099C8] bg-[#D9F2F7]" placeholder="Author Name" {...field} defaultValue={field.value || ''} />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Title */}
                                <FormField
                                    control={form.control}
                                    name="title"

                                    render={({ field }) => (
                                        <FormItem className="grid md:grid-cols-3 items-center 
                                            ">
                                            <FormLabel>Blog Title: </FormLabel>
                                            <FormControl>
                                                <Input className="col-span-2 border border-[#7099C8] bg-[#D9F2F7]" placeholder="Enter the title of your blog post" {...field} defaultValue={field.value || ''} />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Category */}
                                <FormField
                                    control={form.control}
                                    name="category"

                                    render={({ field }) => (
                                        <FormItem className="grid md:grid-cols-3 items-center 
                                            ">
                                            <FormLabel>Category: </FormLabel>
                                            <FormControl>
                                                <Select onValueChange={field.onChange} defaultValue={field.value || ''}>
                                                    <SelectTrigger className="col-span-2 w-full border border-[#7099C8] bg-[#D9F2F7]">
                                                        <SelectValue placeholder="Select other options" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {categories.map(el => <SelectItem
                                                            key={el.name} value={el.name}>{el.name}</SelectItem>)}


                                                    </SelectContent>
                                                </Select>
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Summary */}
                                <FormField
                                    control={form.control}
                                    name="shortDescription"

                                    render={({ field }) => (
                                        <FormItem className="grid md:grid-cols-3 items-center 
                                            ">
                                            <FormLabel>Summary: </FormLabel>
                                            <FormControl>
                                                <Textarea id="shortDescription" defaultValue={field.value || ''} className="col-span-2 border border-[#7099C8] bg-[#D9F2F7]" placeholder="Type here" rows={5} {...field} />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="space-y-6 flex-1">

                                {/* Author */}
                                <FormField
                                    control={form.control}
                                    name="publishedDate"

                                    render={() => (
                                        <FormItem className="grid md:grid-cols-3 items-center 
                                            ">
                                            <FormLabel>Published Date: </FormLabel>
                                            <FormControl>
                                                <Input className="md:col-span-2 border border-[#7099C8] bg-[#D9F2F7]" value={new Date().toISOString().split('T')[0]} placeholder="" />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/*Sub Category */}
                                <FormField
                                    control={form.control}
                                    name="subcategory"

                                    render={({ field }) => (
                                        <FormItem className="grid md:grid-cols-3 items-center 
                                            ">
                                            <FormLabel>Sub-Category: </FormLabel>
                                            <FormControl>
                                                <Select disabled={!cat} onValueChange={field.onChange} defaultValue={field.value || ''}>
                                                    <SelectTrigger className="col-span-2 w-full border border-[#7099C8] bg-[#D9F2F7]">
                                                        <SelectValue placeholder="Select sub category" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {subCategories?.map(el => <SelectItem
                                                            key={el.label} value={el.value}>{el.label}</SelectItem>)}


                                                    </SelectContent>
                                                </Select>
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/*Travel tags */}
                                <FormField
                                    control={form.control}
                                    name="tags[0]"

                                    render={({ field }) => (
                                        <FormItem className="grid md:grid-cols-3 items-center 
                                            ">
                                            <FormLabel> Travel tags: </FormLabel>
                                            <FormControl>
                                                <Select onValueChange={field.onChange} defaultValue={field.value || ''}>
                                                    <SelectTrigger className="col-span-2 w-full border border-[#7099C8] bg-[#D9F2F7]">
                                                        <SelectValue placeholder="Select sub category" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {travelTags.map(el => <SelectItem
                                                            key={el.label} value={el.value}>{el.label}</SelectItem>)}


                                                    </SelectContent>
                                                </Select>
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />



                            </div>
                        </div>
                        <div className="mt-5 md:mt-0 space-y-6 ">
                            <FormField
                                control={form.control}
                                name="content"

                                render={({ field }) => (
                                    <FormItem className="grid w-full 
                                         grid-cols-6 items-center  
                                            ">
                                        <FormLabel>Content</FormLabel>
                                        <FormControl className="col-span-5 md:col-span-4">
                                            <Textarea id="content" defaultValue={field.value || ''} className="max-w-7xl border border-[#7099C8] h-28 bg-[#D9F2F7]" placeholder="Type here" rows={12} {...field} />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex gap-6 ">
                                <ImageUploader label="Upload Image" setImageFiles={setImageFiles} setImagePreviews={setImagePreviews} />
                                <ImagePreviewer className="flex flex-wrap gap-4" setImageFiles={setImageFiles} imagePreviews={imagePerviews} setImagePreviews={setImagePreviews} />
                            </div>
                        </div>

                        <div className="mt-8 flex flex-col items-center space-y-2">
                            <div className="w-80  rounded-lg p-4 flex flex-col items-center space-y-2">
                                <Button variant="secondary" className="w-full bg-[#C4E0EE]">
                                    Preview
                                </Button>
                                <Button variant="secondary" className="w-full bg-[#C4E0EE]">
                                    Autosave
                                </Button>

                                <Button type="submit" className="w-full border border-[#7099C8] bg-transparent text-black hover:text-white">{isSubmitting ? "Publishing..." : "Publish"}</Button>
                            </div>
                        </div>
                    </form>
                </Form>




            </div>
        </div>
    )
}

