import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/index.css';
import './assets/css/App.css';
import './assets/css/navigation.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LeadForm from './components/LeadForm';
import LeadList from './components/LeadList';
import ErrorMessage from './components/ErrorMessage';

const handleSubmit = async (values) => {
  // Handle form submission here (e.g., send data to backend)
  console.log(values);
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <LeadForm onSubmit={handleSubmit} />,
    errorElement: <ErrorMessage message='404 Page Not Found'/>,
  },
  {
    path: '/leads',
    element: <LeadList />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);