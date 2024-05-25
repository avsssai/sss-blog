import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import tailwindCss from "~/tailwind.css?url";
import { Sun, Moon, Home, Book, Menu } from "react-feather";

// Supports weights 100-900
import "@fontsource-variable/roboto-mono";
import { LinksFunction, LoaderFunction } from "@remix-run/node";
import {
  NonFlashOfWrongThemeEls,
  ThemeProvider,
  useTheme,
} from "./utils/theme-provider";
import clsx from "clsx";
import { Theme } from "remix-themes";
import { getThemeSession } from "./utils/theme.server";

export const links: LinksFunction = () => [
  { href: tailwindCss, rel: "stylesheet" },
];
export type LoaderData = {
  theme: Theme | null;
};

export const loader: LoaderFunction = async ({ request }) => {
  const themeSession = await getThemeSession(request);

  const data: LoaderData = {
    theme: themeSession.getTheme(),
  };

  return data;
};

export function App() {
  const data = useLoaderData<LoaderData>();
  const [theme, setTheme] = useTheme();
  return (
    <html lang="en" className={clsx(theme)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <NonFlashOfWrongThemeEls ssrTheme={Boolean(data.theme)} />
        <Meta />

        <Links />
      </head>
      <body className="bg-white dark:bg-gray-900 dark:text-white">
        <div className="px-4 lg:max-w-[550px] mx-auto font-mono flex-1">
          <div className="flex items-center gap-4 my-8">
            <div className="rounded-sm h-10 w-10 relative">
              <img
                src="/bust-2.png"
                alt="shiva caricature"
                className="absolute h-full w-full"
              />
            </div>
            <h1 className="bg-green-400 font-bold text-black">
              <Link to={"/"}>Siva Sesha Sai</Link>
            </h1>
            <div
              className="ml-auto cursor-pointer"
              onClick={() =>
                setTheme((prevTheme) =>
                  prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
                )
              }
            >
              {theme === Theme.DARK ? <Sun size={24} /> : <Moon size={24} />}
            </div>
          </div>
          <Outlet />
        </div>

        {/* <footer className="text-center py-1 border-t-2 dark:border-white border-black">
          <span>&#169;</span> Siva Sesha Sai
          <br />
          <span>{new Date().getFullYear()}</span>
        </footer> */}
        <footer className="fixed bottom-4 bg-slate-50 dark:bg-slate-800 flex justify-between w-[100px] left-1/2 translate-x-[-50px] shadow-2xl rounded-xl p-2">
          <div>
            <Link to={"/"}>
              <Home size={24} />
            </Link>
          </div>
          <div>
            <Link to={"/blog"}>
              <Book size={24} />
            </Link>
          </div>
        </footer>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function AppWithProviders() {
  const data = useLoaderData<LoaderData>();

  return (
    <ThemeProvider specifiedTheme={data.theme}>
      <App />
    </ThemeProvider>
  );
}
