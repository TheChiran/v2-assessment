import DashboardLayout from "../layouts/dashboard";
import Login from "../pages/authentication/Login";
import AdmissionForm from "../pages/dashboard/AdmissionForm";

const DashboardRoutes = {
  path: "/dashboard",
  element: <DashboardLayout />,
  children: [
    {
      path: "/dashboard",
      element: <AdmissionForm />,
    },
  ],
};

export default DashboardRoutes;
