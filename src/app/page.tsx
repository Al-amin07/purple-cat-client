import BlogPage from "@/components/modules/blog/BlogPage";
import { getAllBlogs } from "@/services/blog";
type TSearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Home({ searchParams }: { searchParams: TSearchParams }) {
  const query = await searchParams
  const { data: blogs, meta } = await getAllBlogs(undefined, undefined, query)

  return (
    <div>
      <BlogPage meta={meta} blogs={blogs} />
    </div>
  );
}
