import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="mt-8">
      <div className="border-1 shadow-lg rounded-md p-4 max-w-[400px]">
        <div className="rounded-full bg-gray w-[150px] h-[150px] bg-gray-500 mx-auto"></div>
        <h1 className="font-black text-xl text-center mt-8">Shiva Sesha Sai</h1>
        <p className="text-center">
          Full stack web developer. Juggling React frameworks. Typescript,
          tailwind and Remix is my current stack.
        </p>
      </div>
    </div>
  );
}
