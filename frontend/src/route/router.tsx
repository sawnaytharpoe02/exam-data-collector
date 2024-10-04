import { createBrowserRouter } from "react-router-dom";
import AuthPage from "@/components/page/auth";
import HomePage from "@/components/page/home";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthPage />,
  },
  {
    path: "/",
    element: <HomePage />,
  },
]);

export default router;
