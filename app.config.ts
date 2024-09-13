export default defineAppConfig({
  ui: {
    primary: "blue",
    gray: "cool",
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
      title: "home",
      _path: "/",
      menu_order: 0,
    },
    {
      title: "notes",
      _path: "/notes",
      menu_order: 99,
    },
    // {
    //   title: "shop",
    //   _path: "/shop",
    //   menu_order: 99,
    // },
    {
      title: "about",
      _path: "/about",
      menu_order: 99,
    },
  ],
});
