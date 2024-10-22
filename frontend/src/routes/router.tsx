import CustomerListsPage from "@/page/admin/customer-lists";
import GenerateFormPage from "@/page/admin/generate-form";
import DashboardLayout from "@/page/admin/layout/layout";
import AuthPage from "@/page/auth";
import FormPage from "@/page/client/form";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/auth/login",
    element: <AuthPage />,
  },
  {
    path: "/",
    element: <FormPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "customer-lists",
        element: <CustomerListsPage />,
      },
      {
        path: "generate-form",
        element: <GenerateFormPage />,
      },
    ],
  },
]);

export default router;
