import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./layout/root-layout";
import Dashboard from "./pages/dashboard/dashboard";
import Loading from "./components/common/loading";
import useConnect from "./hooks/useConnect";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";

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
      ],
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
