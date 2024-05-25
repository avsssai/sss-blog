import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import Topic from "~/components/Topic";
import { getAllBlogsData, getAllTopics } from "~/utils/getBlogs.server";

export const loader = async () => {
  const topics = await getAllTopics();
  const blogs = await getAllBlogsData();
  return json({ topics, blogs });
};

export default function BlogLandinPage() {
  const { topics, blogs } = useLoaderData<typeof loader>();
  return (
    <section>
      <div className="flex gap-2 flex-wrap mb-4">
        {topics.map((topic) => (
          <Link to={`/blog/topic/${topic}`}>
            <div
              className="flex justify-center items-center text-xl p-2 border-dotted border-2 border-black dark:border-white rounded"
              key={topic}
            >
              {topic}
            </div>
          </Link>
        ))}
      </div>
      <h2 className="underline mb-4">All blogs</h2>
      <ul>
        {blogs.map((blogData: any) => {
          return (
            <li key={blogData?.data.slug} className="mb-2">
              <Link to={`/blog/${blogData?.data.slug}`}>
                <h3 className="flex items-center gap-4">
                  {" "}
                  <i className="text-sm bg-green-200 text-black">
                    {blogData?.data.createdAt}
                  </i>{" "}
                  {blogData?.data.title}
                </h3>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
