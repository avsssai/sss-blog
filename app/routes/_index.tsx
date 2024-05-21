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
    <div>
      {/* <div className="border-1 mx-auto rounded-md p-4 max-w-[400px]">
        <div className="rounded-full bg-gray w-[150px] h-[150px] bg-gray-500 mx-auto"></div>
        <h1 className="font-black text-3xl text-center mt-8 mb-4">
          Shiva Sesha Sai
        </h1>
        <p className="text-center text-xl">
          Full stack web developer. Juggling React frameworks. Typescript,
          tailwind and Remix is my current stack.
        </p>
      </div> */}
      <div className="flex items-center gap-2 mb-4">
        Full-stack developer -{" "}
        <span className="inline-flex items-center">
          <img
            src="/typescript-icon.svg"
            height={20}
            width={20}
            alt="TypeScript Icon"
          />
        </span>{" "}
        main
      </div>
      <div className="mb-4">
        🙋‍♂️ I like building stunning UIs, juggling React frameworks, exploring
        web apis, cementing mental models and fixing bugs
      </div>
      <div className="">
        📙 currently reading - Midnight's Children <i>by Salman Rushdie</i>
      </div>
      <div className="my-8">
        <h2 className="bg-green-400 w-fit font-bold mb-4">::blog::</h2>
        <ul>
          {blogs.map((blogData) => {
            return (
              <li key={blogData?.data.slug} className="mb-2">
                <Link to={`/blog/${blogData?.data.slug}`}>
                  <h3 className="flex items-center gap-4">
                    {" "}
                    <i className="text-sm bg-green-200">
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
    </div>
  );
}
