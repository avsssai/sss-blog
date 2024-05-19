import { LinksFunction } from "@remix-run/node";
import { bundleMDX } from "mdx-bundler";
import rehypeHighlight from "rehype-highlight";

export async function buildBlog(filePath: string) {
  const res = await bundleMDX({
    source: filePath,
    mdxOptions: (options) => {
      options.remarkPlugins = [...(options.remarkPlugins ?? [])];
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypeHighlight,
      ];
      return options;
    },
  });
  return res;
}
