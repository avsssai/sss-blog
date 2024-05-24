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
import { Sun, Moon } from "react-feather";

// Supports weights 100-900
import "@fontsource-variable/roboto-mono";
import {
  LinksFunction,
  LoaderFunction,
  LoaderFunctionArgs,
} from "@remix-run/node";
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
        <Meta />

        <Links />
        <NonFlashOfWrongThemeEls ssrTheme={Boolean(data.theme)} />
      </head>
      <body className="bg-white dark:bg-gray-900 dark:text-white">
        <div className="px-4 lg:max-w-[550px] mx-auto font-mono">
          <div className="flex items-center gap-4 my-8">
            <div className="rounded-sm h-8 w-8 bg-gray-500"></div>
            <h1 className="bg-green-400 font-bold text-black">
              <Link to={"/"}>Siva Sesha Sai</Link>
            </h1>
            <div className="ml-auto">
              <Moon
                size={24}
                onClick={() =>
                  setTheme((prevTheme) =>
                    prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
                  )
                }
              />
            </div>
          </div>
          <Outlet />
        </div>

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
