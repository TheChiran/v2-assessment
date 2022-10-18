import { useRoutes } from "react-router-dom";

// import routes
import MainRoutes from "./main.routes";
import AuthRoutes from "./auth.routes";
import DashboardRoutes from "./dashboard.routes";

export default function ThemeRoutes() {
  return useRoutes([MainRoutes, AuthRoutes, DashboardRoutes]);
}
