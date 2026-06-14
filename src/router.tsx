import { createBrowserRouter, Navigate } from "react-router-dom";
import { AppLayout } from "./components/AppLayout";

import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import VerifyEmail from "./pages/verify-email/VerifyEmail";
import EmailVerified from "./pages/email-verified/EmailVerified";
import Users from "./pages/users/Users";

const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/verify-email",
    element: <VerifyEmail />,
  },
  {
    path: "/email-verified",
    element: <EmailVerified />,
  },
  {
    path: "*",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/users" />,
      },
      {
        path: "users",
        element: <Users />,
      },
    ],
  },
]);

export default router;
