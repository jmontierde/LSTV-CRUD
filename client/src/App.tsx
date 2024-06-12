import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./features/user/Login";
import Register from "./features/user/Register";
import EmployeeForm from "./features/employee/EmployeeForm";
import EmployeeRead from "./features/employee/EmployeeRead";
import EmployeeUpdate from "./features/employee/EmployeeUpdate";
import ProtectedRoute from "./routes/ProtectedRoute";
import Home from "./components/Home";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "login",
          element: <Login />,
        },
      ],
    },
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "employees/create",
          element: <EmployeeForm />,
        },
        {
          path: "employees/read",
          element: <EmployeeRead />,
        },
        {
          path: "employees/edit/:id",
          element: <EmployeeUpdate />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
