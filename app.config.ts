export default defineAppConfig({
  ui: {
    primary: "gray",
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
    {
      title: "پروفایل",
      _path: "/dashboard/profile",
      menu_order: 102,
    },
    {
      title: "سفارش ها",
      _path: "/dashboard/orders",
      menu_order: 103,
    },
    {
      title: "دیدگاه ها",
      _path: "/dashboard/comments",
      menu_order: 104,
    },
    {
      title: "پیام ها",
      _path: "/dashboard/messages",
      menu_order: 104,
    },
  ],
});
