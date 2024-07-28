export default () => {
  const isOwner = useCookie("isOwner", { default: () => false, watch: true });

  const toggleOwner = () => {
    isOwner.value = !isOwner.value;
  };
  return {
    isOwner,
    toggleOwner,
  };
};
