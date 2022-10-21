import DashboardLayout from "../layouts/dashboard";
import AdmissionForm from "../pages/dashboard/AdmissionForm";
import Congratulation from "../pages/dashboard/Congratulation";
import CourseInfos from "../pages/dashboard/CourseInfos";
import DueList from "../pages/dashboard/DueList";
import SemesterFeePayment from "../pages/dashboard/SemesterFeePayment";
import Transactions from "../pages/dashboard/Transactions";
import FirstLogin from "./FirstLogin";
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
      element: (
        <FirstLogin>
          <AdmissionForm />
        </FirstLogin>
      ),
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
      path: "due-list",
      element: <DueList />,
    },
    {
      path: "semester-fee-payment",
      element: <SemesterFeePayment />,
    },
    {
      path: "complete",
      element: <Congratulation />,
    },
  ],
};

export default DashboardRoutes;
