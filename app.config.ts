export default defineAppConfig({
  ui: {
    primary: "black",
    gray: "cool",
    icons: "all",
    breadcrumb: {
      ol: "p-0 m-0",
    },
    verticalNavigation: {
      size: "text-md",
      ol: "order-none",
    },
    card: {
      divide: "divide-none",

      background: "bg-white dark:bg-gray-900",
      rounded: "rounded-sm",
      ring: "ring-0 ring-gray-200 dark:ring-gray-800",
      shadow: "shadow-md",

      header: {
        padding: "px-3 py-3 sm:px-4",
        base: "border-0",
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
      title: "فروشگاه",
      _path: "/shop",
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
      title: "مدیریت",
      _path: "/dash",
      menu_order: 100,
    },
  ],
  dashboardItems: [
    {
      title: "داشبورد",
      _path: "/dash",
      menu_order: 0,
    },
    {
      title: "بلاگ",
      _path: "/dash/notes",
      menu_order: 99,
    },
    {
      title: "فروشگاه",
      _path: "/dash/shop",
      menu_order: 99,
    },
    {
      title: "تسک ها",
      _path: "/dash/tasks",
      menu_order: 100,
    },
    {
      title: "نظرات",
      _path: "/dash/comments",
      menu_order: 100,
    },
    {
      title: "پیام ها",
      _path: "/dash/messages",
      menu_order: 100,
    },
    {
      title: "تنظیمات",
      _path: "/dash/settings",
      menu_order: 100,
    },
  ],
});
