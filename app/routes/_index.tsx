// app/root.tsx
import { json, MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getAllBlogsData } from "~/utils/getBlogs.server";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async () => {
  const blogs = await getAllBlogsData();
  if (!blogs) {
    throw new Response("Error loading blogs", { status: 400 });
  }

  return json(blogs);
};

export default function Index() {
  const blogs = useLoaderData<typeof loader>();
  return (
    <div className="mt-8">
      <div className="border-1 shadow-lg rounded-md p-4 max-w-[400px]">
        <div className="rounded-full bg-gray w-[150px] h-[150px] bg-gray-500 mx-auto"></div>
        <h1 className="font-black text-xl text-center mt-8">Shiva Sesha Sai</h1>
        <p className="text-center">
          Full stack web developer. Juggling React frameworks. Typescript,
          tailwind and Remix is my current stack.
        </p>
      </div>
      <ul>
        {blogs.map((blogData) => {
          return (
            <li key={blogData?.data.slug}>
              <Link to={`/blog/${blogData?.data.slug}`}>
                {blogData?.data.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
