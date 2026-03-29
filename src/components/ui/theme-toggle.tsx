import { Button } from "./button";
import { useDarkMode } from "../../hooks/use-dark-mode";

function ToggleTheme() {
  const { isDark, toggle } = useDarkMode();

  return (
    <Button variant="ghost" aria-label="Toggle dark mode" onClick={toggle}>
      {isDark ? "☀️" : "🌙"}
    </Button>
  );
}

export default ToggleTheme;
