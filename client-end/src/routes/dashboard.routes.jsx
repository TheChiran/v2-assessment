import DashboardLayout from "../layouts/dashboard";
import AdmissionForm from "../pages/dashboard/AdmissionForm";
import CourseInfos from "../pages/dashboard/CourseInfos";
import SemesterFeePayment from "../pages/dashboard/SemesterFeePayment";
import Transactions from "../pages/dashboard/Transactions";
import PrivateRoute from "./PrivateRoutes";

const DashboardRoutes = {
  path: "/dashboard",
  element: (
    <PrivateRoute>
      <DashboardLayout />
    </PrivateRoute>
  ),
  children: [
    {
      path: "/dashboard",
      element: <AdmissionForm />,
    },
    {
      path: "course-infos",
      element: <CourseInfos />,
    },
    {
      path: "transactions",
      element: <Transactions />,
    },
    {
      path: "semester-fee-payment",
      element: <SemesterFeePayment />,
    },
  ],
};

export default DashboardRoutes;
