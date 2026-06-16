import { createBrowserRouter, Navigate } from "react-router-dom";
import { AuthLayout } from "./components/AuthLayout";

import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import VerifyEmail from "./pages/verify-email/VerifyEmail";
import EmailVerified from "./pages/email-verified/EmailVerified";
import Users from "./pages/users/Users";
import { AppRoot } from "./components/AppRoot";

const router = createBrowserRouter([
  {
    element: <AppRoot />,
    children: [
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "*",
        element: <AuthLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="/users" />,
          },
          {
            path: "verify-email",
            element: <VerifyEmail />,
          },
          {
            path: "email-verified",
            element: <EmailVerified />,
          },
          {
            path: "users",
            element: <Users />,
          },
        ],
      },
    ],
  },
]);

export default router;
