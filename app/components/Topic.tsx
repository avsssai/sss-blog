import { PropsWithChildren } from "react";

export default function Topic({ children }: PropsWithChildren) {
  return (
    <span className="border-dotted border-2 rounded-lg border-black dark:border-white flex justify-center items-center px-1 text-[8px]">
      {children}
    </span>
  );
}
