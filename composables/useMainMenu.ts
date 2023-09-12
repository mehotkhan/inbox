export default () => {
  const appConfig = useAppConfig();
  const pagesMenu: any = useAsyncData("menuPages", () =>
    queryContent("pages").where({ menu: true }).find()
  );
  const pagesCategory: any = useAsyncData("menuCategory", () =>
    queryContent("category").where({ menu: true }).find()
  );

  const menuItems = computed(() => {
    const mergeResult = [
      ...pagesMenu.data.value,
      ...pagesCategory.data.value,
      ...appConfig.menuItems,
    ];
    return mergeResult.sort((a, b) => a.menu_order - b.menu_order);
  });

  return {
    menuItems,
  };
};
