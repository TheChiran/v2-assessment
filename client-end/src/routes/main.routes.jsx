import PageNotFound from "../pages/404";
import Login from "../pages/authentication/Login";

const MainRoutes = {
  path: "/",
  children: [
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
  ],
};

export default MainRoutes;
