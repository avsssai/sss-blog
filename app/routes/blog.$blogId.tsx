import React, { useEffect } from "react";
import { getMDXComponent } from "mdx-bundler/client";
import { buildBlog } from "~/utils/buildBlog.server";
import { Link, useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs } from "react-router";
import { getFileFromSlug } from "~/utils/getFileFromFs.server";
import {
  useRouteError,
  isRouteErrorResponse,
  useNavigate,
} from "@remix-run/react";
import { LinksFunction } from "@remix-run/node";
import codeStyles from "~/styles/codeHighlight.css?url";
import { ArrowLeft } from "react-feather";
import Topic from "~/components/Topic";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: codeStyles },
];

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const blogSlug = params.blogId;
  if (!blogSlug) {
    throw new Response("Not defined.", { status: 404 });
  }
  const mdxSource = await getFileFromSlug(blogSlug);
  if (!mdxSource) {
    throw new Error("Error loading mdx data.");
  }
  const { code, frontmatter } = await buildBlog(mdxSource.fileContent);
  return { code, frontmatter, blogSlug };
};

export default function BlogPost() {
  const { code, frontmatter, blogSlug } = useLoaderData<typeof loader>();
  const title = frontmatter.meta[0].title;
  const description = frontmatter.meta[1].description;
  const createdAt = frontmatter.createdAt;
  const Component = React.useMemo(() => getMDXComponent(code), [code]);
  const navigate = useNavigate();

  return (
    <section className="mt-8">
      <Link
        className="flex gap-2 items-center mb-8"
        to={"#"}
        onClick={() => navigate(-1)}
      >
        <ArrowLeft size={12} />
        Back
      </Link>
      <header>
        <h1 className="text-4xl font-black text-green-400 mb-2">{title}</h1>
        <div className="flex gap-4 mb-4">
          <i className="text-sm">{createdAt}</i>
          <div className="flex gap-1">
            <Topic>{frontmatter.topic}</Topic>
          </div>
        </div>
        <p className="mb-4 italic">{description}</p>
      </header>
      <main className="leading-6">
        <Component />
      </main>
    </section>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    if (error.status === 404 || error.status === 500) {
      return (
        <main className="max-w-screen">
          <h1>Oops! Shiva hasn't written that blog yet!</h1>
        </main>
      );
    }
  } else if (error instanceof Error) {
    return (
      <div>
        <h1>Error</h1>
        <p>
          The stack trace is
          <pre>{error.stack}</pre>
        </p>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}
