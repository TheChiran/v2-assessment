import Login from "../pages/authentication/Login";

const MainRoutes = {
  path: "/",
  children: [
    {
      path: "/",
      element: <Login />,
    },
  ],
};

export default MainRoutes;
