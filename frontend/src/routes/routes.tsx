import ErrorFallback from "@/components/ErrorFallback";
import CustomerListsPage from "@/page/admin/customer-lists";
import GenerateFormPage from "@/page/admin/generate-form";
import GeneratedFormTable from "@/page/admin/generate-form/generate-form-table";
import DashboardLayout from "@/page/admin/layout/layout";
import ChangePasswordPage from "@/page/auth/change-password";
import ForgotPasswordPage from "@/page/auth/forgot-password";
import LoginPage from "@/page/auth/login";
import FormPage from "@/page/client/form";
import NotFound from "@/page/not-found";
import { createBrowserRouter } from "react-router-dom";
import { AuthenticatedRoute } from "./AuthenticatedRoute";
import { ProtectedRoute } from "./ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorFallback />,
    children: [
      // Public Routes
      { index: true, element: <FormPage /> },
      { path: "forgot-password", element: <ForgotPasswordPage /> },
      { path: "change-password", element: <ChangePasswordPage /> },

      // Authenticated Routes (redirect if already logged in)
      {
        path: 'login',
        element: <AuthenticatedRoute />,
        children: [{ index: true, element: <LoginPage /> }],
      },

      // Protected Routes (require authentication)
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "dashboard/",
            element: <DashboardLayout />,
            children: [
              { path: "customer-lists", element: <CustomerListsPage /> },
              { path: "generated-form-lists", element: <GeneratedFormTable /> },
              { path: "generate-form", element: <GenerateFormPage /> },
            ],
          },
        ],
      },

      // Catch-all Not Found
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
