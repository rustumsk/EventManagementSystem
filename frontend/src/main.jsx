import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import router from './App.jsx';
import { RouterProvider } from 'react-router-dom';
import { createContext, useState } from 'react';

import StudentDashboard from './pages/private/StudentDashboard.jsx';
import SBODashboard from './pages/private/SBODashboard.jsx';

export const userContext = createContext(null);

function App() {
  const [user, setUser] = useState();

  return (
    <StrictMode>
      <userContext.Provider value={{ user, setUser }}>
        <RouterProvider router={router} />
      </userContext.Provider>
    </StrictMode>
  );
}

createRoot(document.getElementById('root')).render(<App />);
