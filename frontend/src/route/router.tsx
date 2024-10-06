import { createBrowserRouter } from "react-router-dom";
import AuthPage from "@/components/page/auth";
import DashboardPage from "@/components/page/dashboard";
import FormPage from "@/components/page/form";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthPage />,
  },
  {
    path: "/",
    element: <FormPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
]);

export default router;
