import { useDark, useToggle } from "@vueuse/core";

export default () => {
  const isDark = useDark();
  const toggleDark = useToggle(isDark);
  return {
    isDark,
    toggleDark,
  };
};
