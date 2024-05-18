import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
// import { getFileFromSlug } from "./getFileFromFs.server";

export async function getAllBlogsData() {
  const dirPath = path.join(process.cwd(), "app", "blogs");
  let getAllBlogFiles;

  try {
    getAllBlogFiles = await fs.readdir(dirPath);
  } catch (err) {
    console.error("Error reading directory " + err);
    throw new Error("Error reading directory");
  }
  // const blogSlugs = getAllBlogFiles.map((file) => {
  //   return file.replace(/\.mdx?$/, "");
  // });
  const mainPageBlogsData = await Promise.all(
    getAllBlogFiles.map(async (slug) => {
      try {
        const filePath = path.join(dirPath, slug);
        const fileData = await fs.readFile(filePath, "utf-8");

        return matter(fileData);
      } catch (error) {
        console.error(
          `Error fetching data from the file system for slug ${slug}`,
          error
        );
        return null;
      }
    })
  );
  return mainPageBlogsData.filter((item) => item !== null);
}
