import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { ArrowLeft } from "react-feather";
import { getAllBlogsOnTopic } from "~/utils/getBlogs.server";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  if (!params.topic) {
    return new Response("Sorry! No Blogs on that topic yet.", { status: 404 });
  }
  const allBlogsOnTopic = await getAllBlogsOnTopic(params.topic.toLowerCase());
  return json({ blogs: allBlogsOnTopic, topic: params.topic });
};

export default function BlogTopic() {
  const { blogs, topic } = useLoaderData<typeof loader>();
  return (
    <div>
      <Link to={"/blog"} className="flex gap-2 items-center text-sm mb-4">
        <ArrowLeft size={12} /> <span>All topics</span>
      </Link>
      <h1 className="mb-8">
        Topic - <span className="text-xl bg-green-200 text-black">{topic}</span>
      </h1>
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
    </div>
  );
}
