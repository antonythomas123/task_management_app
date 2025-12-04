import { createBrowserRouter, RouterProvider } from "react-router";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import { AuthLayout, PrivateRouteLayout } from "../layouts";
import Dashboard from "../pages/Dashboard";
import TaskForm from "../components/TaskForm";

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
      children: [
        { index: true, Component: Dashboard },
        { path: "new-task", Component: TaskForm },
        { path: "edit-task/:id", Component: TaskForm },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
