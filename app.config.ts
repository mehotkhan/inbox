export default defineAppConfig({
  ui: {
    primary: "gray",
    gray: "cool",
    icons: "all",
    card: {
      header: {
        padding: 'px-3 py-3 sm:px-4',
      },
      footer: {
        padding: 'px-3 py-3 sm:px-4',
      },
    }
  },
  menuItems: [
    {
      title: "صفحه‌نخست",
      _path: "/",
      menu_order: 0,
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
