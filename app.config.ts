export default defineAppConfig({
  ui: {
    card: {
      divide: "divide-none",
      background: "bg-white dark:bg-gray-800",
      rounded: "rounded-sm",
      ring: "ring-0 ring-gray-200 dark:ring-gray-700",
      shadow: "shadow-md  ",
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
    },
    {
      title: "notes",
      _path: "/notes",
    },
    {
      title: "books",
      _path: "/books",
    },
    {
      title: "projects",
      _path: "/projects",
    },
    {
      title: "about",
      _path: "/about",
    },
    {
      title: "contact",
      _path: "/contact",
    },
  ],
});
