import fs from "fs";
import fsProm from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

export const getFileFromSlug = async (name: string) => {
  const __dirname = path.resolve();
  const filePath = path.join(__dirname, "app", "blogs", `${name}.mdx`);
  const slug = filePath.replace("/.mdx?$/", "");
  try {
    let fileContent = await fsProm.readFile(filePath, {
      encoding: "utf-8",
    });
    fileContent = fileContent.trim();
    return { slug, fileContent };
  } catch (error) {
    if (error instanceof Error && "code" in error) {
      if (error.code === "ENOENT") {
        throw new Response("Not found", { status: 404 });
      }
    } else {
      throw new Error("Unknown error");
    }
  }
};
