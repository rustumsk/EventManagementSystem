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

const router = createBrowserRouter([
  {
    path:'/error',
    element: <ErrorProfile />
  },
  {
    path:'/studentdashboard',
    element: <StudentDashboard />
  },
  {
    path:'/sbodashboard',
    element: <SBODashboard />
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
