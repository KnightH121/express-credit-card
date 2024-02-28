import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./container/screen/Home";
import Store from "./container/screen/Store";
import PaymentPage from "./container/screen/PaymentPage";
import ErrorBoundary from "./container/model/ErrorBoundary";
import ErrorPage from "./container/model/ErrorPage";
const App = () => {
  const Layout = () => {
    return <main></main>;
  };
  const router = createBrowserRouter([
    {
      path: "/",
      exact: true,
      element: <Home />,
    },
    {
      path: "/payment",
      element: <PaymentPage />,
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
  ]);

  return (
    <>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </>
  );
};

export default App;
