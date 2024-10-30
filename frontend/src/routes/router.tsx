import ErrorFallback from "@/components/error-fallback";
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

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: (
      <ErrorFallback
        error={new Error("An error occured.")}
        resetErrorBoundary={() => window.location.reload()}
      />
    ),
    children: [
      {
        path: "auth/",
        children: [
          { path: "login", element: <LoginPage /> },
          { path: "forgot-password", element: <ForgotPasswordPage /> },
          { path: "change-password", element: <ChangePasswordPage /> },
        ],
      },
      { path: "/", element: <FormPage /> },
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
          { path: "customer-lists", element: <CustomerListsPage /> },
          { path: "generated-form-lists", element: <GeneratedFormTable /> },
          { path: "generate-form", element: <GenerateFormPage /> },
        ],
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
