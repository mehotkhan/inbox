import { useStorage } from "@vueuse/core";

export default () => {
  const osDark = window?.matchMedia?.("(prefers-color-scheme: dark)").matches;
  const isDark = useStorage("isDark", osDark);

  const toggleDark = () => {
    isDark.value = !isDark.value;
  };
  return {
    isDark,
    toggleDark,
  };
};
