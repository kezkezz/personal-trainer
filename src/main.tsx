import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import CustomerList from './components/CustomerList.tsx'
import TrainingList from './components/TrainingList.tsx'
import Calendar from './components/Calendar.tsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <CustomerList />,
      },
      {
        path: "TrainingList",
        element: <TrainingList />,
      },
      {
        path: "Calendar",
        element: <Calendar />,
      }
    ]
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
