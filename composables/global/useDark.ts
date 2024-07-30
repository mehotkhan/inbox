export default () => {
  const isDark = useCookie("isDark", {
    default: () => false,
    watch: true,
    maxAge: cookieExpire,
  });

  const toggleDark = () => {
    isDark.value = !isDark.value;
  };
  return {
    isDark,
    toggleDark,
  };
};
