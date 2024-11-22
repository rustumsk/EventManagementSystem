import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import router from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import StudentDashboard from './pages/private/StudentDashboard.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
    {/* <StudentDashboard /> */}
  </StrictMode>,
)
