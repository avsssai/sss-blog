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
import {
  ThemeProvider,
  useTheme,
  PreventFlashOnWrongTheme,
  Theme,
} from "remix-themes";
import { themeSessionResolver } from "~/utils/sessions.server";

// Supports weights 100-900
import "@fontsource-variable/roboto-mono";
import { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";

export const links: LinksFunction = () => [
  { href: tailwindCss, rel: "stylesheet" },
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { getTheme } = await themeSessionResolver(request);
  return {
    theme: getTheme(),
  };
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />

        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function App() {
  const data = useLoaderData<typeof loader>();
  console.log(data);
  const [, setTheme] = useTheme();

  return (
    <div className="px-4 lg:max-w-[550px] mx-auto font-mono">
      <div className="flex items-center gap-4 my-8">
        <div className="rounded-sm h-8 w-8 bg-gray-500"></div>
        <h1 className="bg-green-400 font-bold">
          <Link to={"/"}>Siva Sesha Sai</Link>
        </h1>
        <div
          className="ml-auto"
          onClick={() =>
            setTheme((prev) => (prev === Theme.DARK ? Theme.LIGHT : Theme.DARK))
          }
        >
          <Moon size={24} />
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default function AppWithProviders() {
  const data = useLoaderData<typeof loader>();
  return (
    <ThemeProvider specifiedTheme={data.theme} themeAction="/action/set-theme">
      <App />
    </ThemeProvider>
  );
}
