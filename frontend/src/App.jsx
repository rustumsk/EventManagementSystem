import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Signup from "./pages/Signup";
import StudentLogin from "./pages/StudentLogin";
import SBOLogin from "./pages/SBOLogin";

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
    path: '/StudentLogin',
    element: <StudentLogin />
  },
  {
    path: '/SboLogin',
    element: <SBOLogin />
  }
  
])

export default router
