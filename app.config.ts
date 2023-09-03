export default defineAppConfig({
  ui: {
    primary: "gray",
    gray: "cool",
    icons: "all",
  },
  menuItems: [
    {
      title: "صفحه‌نخست",
      to: "/",
    },
    {
      title: "بلاگ",
      to: "/blogs",
    },
    {
      title: "دسته‌بندی‌ها",
      to: "/category",
    },
    {
      title: "مدیریت",
      to: "/dashboard",
    },
  ],
  dashMenuItems: [
    {
      title: "داشبورد",
      to: "/dashboard",
      icon: "i-heroicons-home",
    },
    {
      title: "سفارش‌ها",
      to: "/dashboard/orders",
      icon: "i-heroicons-shopping-bag",
    },

    {
      title: "دیدگاه‌ها",
      to: "/dashboard/comments",
      icon: "i-heroicons-chat-bubble-left-ellipsis",
    },
    {
      title: "تیکت‌ها",
      to: "/dashboard/tickets",
      icon: "i-heroicons-chat-bubble-left-right",
    },
    {
      title: "تنظیمات",
      to: "/dashboard/settings",
      icon: "i-heroicons-cog-6-tooth",
    },
  ],
});
