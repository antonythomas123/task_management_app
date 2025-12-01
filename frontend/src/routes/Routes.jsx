import { createBrowserRouter, RouterProvider } from "react-router";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import { AuthLayout, PrivateRouteLayout } from "../layouts";
import Dashboard from "../pages/Dashboard";

const Routes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      Component: AuthLayout,
      children: [
        { index: true, Component: SignIn },
        { path: "sign-in", Component: SignIn },
        { path: "sign-up", Component: SignUp },
      ],
    },
    {
      path: "/dashboard",
      Component: PrivateRouteLayout,
      children: [{ index: true, Component: Dashboard }],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
