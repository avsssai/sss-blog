import { LinksFunction } from "@remix-run/node";
import { bundleMDX } from "mdx-bundler";
import remarkPrism from "remark-prism";
import codeHighlight from "~/styles/codeHighlight.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: codeHighlight },
];

export async function buildBlog(filePath: string) {
  const res = await bundleMDX({
    source: filePath,
    mdxOptions: (options) => {
      options.remarkPlugins = [...(options.remarkPlugins ?? []), remarkPrism];
      // options.remarkPlugins = [...(options.remarkPlugins ?? []), remarkPrism];
      options.rehypePlugins = [...(options.rehypePlugins ?? [])];

      return options;
    },
  });
  return res;
}
