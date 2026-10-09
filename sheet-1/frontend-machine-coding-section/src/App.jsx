import { createBrowserRouter, RouterProvider } from "react-router";
import Questions from "./pages/Questions.jsx";
import MainLayout from "./Layout/MainLayout.jsx";
import Dashboard from "./pages/Dashboard.jsx";

function AppRouter() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <MainLayout />,
      children:[
        {
          path: "",
          element: <Dashboard />,
        },
        {
          path: "/questions",
          element: <Questions />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default AppRouter;
