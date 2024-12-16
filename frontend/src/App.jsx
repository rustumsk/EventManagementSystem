import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/public/LandingPage";
import Signup from "./pages/public/Signup";
import StudentLogin from "./pages/public/StudentLogin";
import SBOLogin from "./pages/public/SBOLogin";
import CompleteProfile from "./pages/public/CompleteProfile";
import EmailVerification from "./pages/public/emailVerification";
import ErrorProfile from "./pages/public/ErrorProfile";
import StudentDashboard from "./pages/private/StudentDashboard";
import SBODashboard from "./pages/private/SBODashboard";
import RegistrationFrom from "./components/studentDashboard/RegistraionForm";
import RegistrationDetails from "./components/studentDashboard/RegistrationDetails";
import SBORegister from "./pages/public/SBORegister";
import Admin from "./pages/public/admin";
import AdminApprove from "./pages/private/adminApprove";
import Calendar from "./components/studentDashboard/Calendar";
import Analytics from "./components/sboDashboard/SBOAnalytics";
const router = createBrowserRouter([
  {
    path:'/error',
    element: <ErrorProfile />
  },
  {
    path:'calendar',
    element: <Calendar />
  },
  {
    path:'/eulu',
    element: <Admin />
  },
  {
    path: '/adminapprove',
    element: <AdminApprove />
  },
  {
    path:'/studentdashboard',
    element: <StudentDashboard />
  },
  {
    path:'/registerdetails',
    element: <RegistrationDetails />
  },
  {
    path:'/sbodashboard',
    element: <SBODashboard />
  },
  {
    path:'/sboregister',
    element: <SBORegister />
  },
  {
    path:'/',
    element: <LandingPage />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/eventregister',
    element: <RegistrationFrom />
  },
  {
    path: '/signup/complete-profile',
    element: <CompleteProfile />
  },
  {
    path: '/signup/email-verification',
    element: <EmailVerification />
  },
  {
    path: '/StudentLogin',
    element: <StudentLogin />
  },
  {
    path: '/SboLogin',
    element: <SBOLogin />
  }
])

export default router
