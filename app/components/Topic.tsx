import { Link } from "@remix-run/react";
import { PropsWithChildren } from "react";

export default function Topic({ children }: PropsWithChildren) {
  return (
    <Link to={`/blog/topic/${children}`}>
      <span className="border-dotted border-2 rounded-lg border-black dark:border-white flex justify-center items-center px-1 text-[8px]">
        {children}
      </span>
    </Link>
  );
}
