import Login from "../pages/authentication/Login";
import Register from "../pages/authentication/Register";

const AuthRoutes = {
  path: "/auth",
  children: [
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "register",
      element: <Register />,
    },
  ],
};

export default AuthRoutes;
