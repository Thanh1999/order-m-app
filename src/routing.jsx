import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from './App';
import ErrorPage from './pages/ErrorPage';


export const makeAuthRouting = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <App />,
            errorElement: <ErrorPage />,
        },
    ]);
    return (
        <RouterProvider router={router} />
    )
}
