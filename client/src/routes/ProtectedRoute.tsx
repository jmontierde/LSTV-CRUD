import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store";
import Navbar from "../components/Navbar";

const ProtectedRoute = () => {
  const { isAuthenticated } = useAppSelector((state) => state.user);
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  } else {
    return (
      <div className="layout">
        <div className="navbar">
          <Navbar />
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>
    );
  }
};

export default ProtectedRoute;
