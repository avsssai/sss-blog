import { useFetcher } from "@remix-run/react";
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

export enum Theme {
  DARK = "dark",
  LIGHT = "light",
}

const prefersTheme = `(prefers-color-scheme: dark)`;
const getPreferredColorTheme = () =>
  window.matchMedia(prefersTheme).matches ? Theme.DARK : Theme.LIGHT;
type ThemeContextType = [Theme | null, Dispatch<SetStateAction<Theme | null>>];

const clientThemeCode = `
;(() => {
  const theme = window.matchMedia(${JSON.stringify([prefersTheme])}).matches
    ? 'dark'
    : 'light';
  const cl = document.documentElement.classList;
  const themeAlreadyApplied = cl.contains('light') || cl.contains('dark');
  if (themeAlreadyApplied) {
    // this script shouldn't exist if the theme is already applied!
    console.warn(
      "Hi there, could you let Siva know you're seeing this message? Thanks!",
    );
  } else {
    cl.add(theme);
  }
})();
`;

export function NonFlashOfWrongThemeEls({ ssrTheme }: { ssrTheme: boolean }) {
  return (
    <>
      {ssrTheme ? null : (
        <script dangerouslySetInnerHTML={{ __html: clientThemeCode }} />
      )}
    </>
  );
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({
  children,
  specifiedTheme,
}: PropsWithChildren<{ specifiedTheme: Theme | null }>) {
  const persistTheme = useFetcher();
  const [theme, setTheme] = useState<Theme | null>(() => {
    if (specifiedTheme) {
      if (themes.includes(specifiedTheme)) {
        return specifiedTheme;
      } else {
        return null;
      }
    }

    if (typeof window !== "object") {
      return null;
    }
    return getPreferredColorTheme();
  });

  // TODO: remove this when persistTheme is memoized properly
  const persistThemeRef = useRef(persistTheme);
  useEffect(() => {
    persistThemeRef.current = persistTheme;
  }, [persistTheme]);

  const mountRun = useRef(false);

  useEffect(() => {
    if (!mountRun.current) {
      mountRun.current = true;
      return;
    }
    if (!theme) {
      return;
    }

    persistThemeRef.current.submit(
      { theme },
      { action: "action/set-theme", method: "post" }
    );
  }, [theme]);

  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("The component must be wrapped in a ThemeContextProvider.");
  }
  return context;
}

const themes: Array<Theme> = Object.values(Theme);

export function isTheme(value: unknown): value is Theme {
  return typeof value === "string" && themes.includes(value as Theme);
}
