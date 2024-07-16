export default defineAppConfig({
  ui: {
    primary: "black",
    gray: "cool",
    icons: "all",
    card: {
      header: {
        padding: "px-3 py-3 sm:px-4",
      },
      footer: {
        padding: "px-3 py-3 sm:px-4",
      },
    },
  },
  menuItems: [
    {
      title: "صفحه‌نخست",
      _path: "/",
      menu_order: 0,
    },
    {
      title: "یادداشت",
      _path: "/notes",
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
    {
      title: "داشبورد",
      _path: "/dashboard",
      menu_order: 101,
    },
  ],
});
