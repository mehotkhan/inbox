import { useStorage } from "@vueuse/core";

export default () => {
  const isDev = useStorage("isDev", false);
  const toggleDev = () => {
    isDev.value = !isDev.value;
  };
  return {
    isDev,
    toggleDev,
  };
};
