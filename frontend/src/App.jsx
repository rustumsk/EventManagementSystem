import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/public/LandingPage";
import Signup from "./pages/public/Signup";
import StudentLogin from "./pages/public/StudentLogin";
import SBOLogin from "./pages/public/SBOLogin";
import CompleteProfile from "./pages/public/CompleteProfile";
import EmailVerification from "./pages/public/emailVerification";

const router = createBrowserRouter([
  {
    path:'/',
    element: <LandingPage />
  },
  {
    path: '/signup',
    element: <Signup />
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
