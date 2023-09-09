export default defineAppConfig({
  ui: {
    primary: "gray",
    gray: "cool",
    icons: "all",
  },
  menuItems: [
    {
      title: "صفحه‌نخست",
      _path: "/",
      menu_order: 0,
    },
    {
      title: "بایگانی",
      _path: "/archive",
      menu_order: 99,
    },
  ],
});
