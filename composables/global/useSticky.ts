export const useSticky = (el: HTMLElement, offset: number) => {
  const onScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > offset) {
      el.classList.add("sticky-menu");
    } else {
      el.classList.remove("sticky-menu");
    }
  };
  window.addEventListener("scroll", onScroll);
  onUnmounted(() => {
    window.removeEventListener("scroll", onScroll);
  });

  return {
    onScroll,
  };
};
