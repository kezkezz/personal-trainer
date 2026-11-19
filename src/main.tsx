import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createHashRouter, RouterProvider } from 'react-router'
import CustomerList from './components/CustomerList.tsx'
import TrainingList from './components/TrainingList.tsx'
import Calendar from './components/Calendar.tsx'
import Statistics from './components/Statistics.tsx'


const router = createHashRouter([
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
      },
      {
        path: "Statistics",
        element: <Statistics />,
      }
    ]
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
