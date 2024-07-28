export default () => {
  const isDark = useCookie("loggedIn", {
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
