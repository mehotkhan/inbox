export default defineNuxtRouteMiddleware(async (to) => {
  const { loggedIn } = useUserSession();
console.log('logged?',loggedIn.value)
  // const publicRoutes = ["login", "register"];
  // const isPublicRoute = publicRoutes.includes(to.name || "");

  // if (!loggedIn.value) {
  //   // Redirect non-logged-in users to login if they try to access non-public routes
  //   if (!isPublicRoute) {
  //     return navigateTo("/login");
  //   }
  //   return; // Allow access to public routes
  // }

 

  // if (!hasWorkspaces && to.name !== "guest") {
  //   // Redirect logged-in users without workspaces to the guest page
  //   return navigateTo("/guest");
  // }

  // if (to.name === "guest" && hasWorkspaces) {
  //   // Redirect from guest page if workspaces exist
  //   return navigateTo("/");
  // }

  // if (isPublicRoute) {
  //   // Prevent logged-in users from accessing login or register pages
  //   return navigateTo("/");
  // }

  // Allow access to other routes
});
