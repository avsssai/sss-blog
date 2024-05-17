import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { LinksFunction } from "@remix-run/react/dist/routeModules";
import tailwindCss from "~/tailwind.css?url";
// Supports weights 100-900
import "@fontsource-variable/inter";

export const links: LinksFunction = () => [
  { href: tailwindCss, rel: "stylesheet" },
];

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

export default function App() {
  return (
    <div className="px-4 lg:max-w-[55rem] mx-auto font-inter">
      <Outlet />
    </div>
  );
}
