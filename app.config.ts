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
      background: "bg-white dark:bg-gray-900",
      rounded: "rounded-sm",
      ring: "ring-1 ring-gray-200 dark:ring-gray-800",
      shadow: "shadow-none",

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
  ],
});
