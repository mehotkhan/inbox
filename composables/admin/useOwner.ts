export default () => {
  const isOwner = useCookie("isOwner", {
    default: () => false,
    watch: true,
    maxAge: cookieExpire,
  });

  const toggleOwner = () => {
    isOwner.value = !isOwner.value;
  };
  return {
    isOwner,
    toggleOwner,
  };
};
