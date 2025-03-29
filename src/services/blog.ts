"use server";

import { revalidateTag } from "next/cache";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const createBlog = async (blogData: FormData) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs`, {
      method: "POST",

      body: blogData,
    });
    revalidateTag("BLOG");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const getAllBlogs = async (
  page?: number,
  limit?: number,
  query?: { [key: string]: string | string[] | undefined }
) => {
  console.log({ query });
  const params = new URLSearchParams();
  if (query?.category) {
    params.append("category", query?.category.toString());
  }
  if (query?.page) {
    params.append("page", query?.page.toString());
  }
  if (query?.searchTerm) {
    params.append("searchTerm", query?.searchTerm.toString());
  }
  if (query?.destination) {
    params.append("destination", query?.destination.toString());
  }
  if (query?.subcategory) {
    params.append("subcategory", query?.subcategory.toString());
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/blogs?${params.toString()}`,
      {
        next: {
          tags: ["BLOG"],
        },
      }
    );

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
