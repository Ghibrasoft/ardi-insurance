import { useEffect } from "react";
import { useLocalStorage } from "./use-local-storage";

const DARK_MODE_KEY = "ardi_dark_mode";

export function useDarkMode() {
  const [isDark, setIsDark] = useLocalStorage<boolean>(DARK_MODE_KEY, false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  const toggle = () => setIsDark((prev) => !prev);

  return { isDark, toggle };
}
