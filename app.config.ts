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
    {
      title: "درباره",
      _path: "/about",
      menu_order: 99,
    },
    {
      title: "تماس‌با‌من",
      _path: "/contact",
      menu_order: 100,
    },
  ],
});
