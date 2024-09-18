import { useStorage } from "@vueuse/core";

export default () => {
  const isDev = useStorage("isDev", false);

  const isOwner = useCookie("isOwner", {
    default: () => false,
    watch: true,
    maxAge: cookieExpire,
  });

  const toggleOwner = () => {
    isOwner.value = !isOwner.value;
  };
  const toggleDev = () => {
    isOwner.value = !isOwner.value;
  };
  return {
    isOwner,
    isDev,
    toggleOwner,
    toggleDev,
  };
};
