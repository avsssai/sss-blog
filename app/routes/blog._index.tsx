import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Topic from "~/components/Topic";
import { getAllTopics } from "~/utils/getBlogs.server";

export const loader = async () => {
  const topics = await getAllTopics();
  return json({ topics });
};

export default function BlogLandinPage() {
  const { topics } = useLoaderData<typeof loader>();
  return (
    <div>
      {topics.map((topic) => (
        <Topic>{topic}</Topic>
      ))}
    </div>
  );
}
