import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./layout/root-layout";
import Dashboard from "./pages/dashboard/dashboard";
import Loading from "./components/common/loading";
import useConnect from "./hooks/useConnect";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";
import Login from "./pages/auth/login";
import Profile from "./pages/profile/profile";
import Forms from "./pages/forms/forms";
import User from "./pages/user/user";
import Admins from "./pages/admin/admins";

function App() {
  const { loading } = useSelector((state: RootState) => state.auth);
  useConnect();

  if (loading) {
    return <Loading />;
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/forms",
          element: <Forms />,
        },
        {
          path: "/users/:id",
          element: <User />,
        },
        {
          path: "/admins",
          element: <Admins />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
