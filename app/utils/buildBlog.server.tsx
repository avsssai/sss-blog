import { LinksFunction } from "@remix-run/node";
import { bundleMDX } from "mdx-bundler";
import rehypePrettyCode from "rehype-pretty-code";

export async function buildBlog(filePath: string) {
  const res = await bundleMDX({
    source: filePath,
    mdxOptions: (options) => {
      options.remarkPlugins = [...(options.remarkPlugins ?? [])];
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        [
          rehypePrettyCode,
          {
            // Options for rehype-pretty-code
            theme: "github-dark", // or any other theme you prefer
            onVisitLine(node: any) {
              // Ensure that each line is wrapped in a <span> to be able to apply styles to lines
              if (node.children.length === 0) {
                node.children = [{ type: "text", value: " " }];
              }
            },
            onVisitHighlightedLine(node: any) {
              node.properties.className.push("line--highlighted");
            },
            onVisitHighlightedWord(node: any) {
              node.properties.className = ["word--highlighted"];
            },
            onVisitPre(node: any, { lang }: { lang: string }) {
              node.properties.className.push(`language-${lang}`);
            },
          },
        ],
      ];
      return options;
    },
  });
  return res;
}
