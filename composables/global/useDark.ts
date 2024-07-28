export default () => {
  const isDark = useCookie("loggedIn", { default: () => false, watch: true });

  const toggleDark = () => {
    isDark.value = !isDark.value;
  };
  return {
    isDark,
    toggleDark,
  };
};
