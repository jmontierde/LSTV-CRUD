import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store";
import { memo } from "react";
import { logoutUser } from "../features/user/usersSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import userIcon from "/src/assets/user-icon.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const Navbar = memo(() => {
  const { isAuthenticated } = useAppSelector((state) => state.user);
  const user = useAppSelector((state) => state.user.user);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  console.log("user", user);

  const handleLogout = () => {
    toast.success("Logout Successfully");
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <>
      <ToastContainer />
      <div className="flex justify-between py-6 px-3 lg:px-16 items-center ">
        <h1>LSTV</h1>
        <nav className="space-x-3 lg:space-x-6">
          <Link to="/">Home</Link>
          <Link to="/employees/create">Create Employee</Link>
          <Link to="/employees/read">View Employee</Link>
        </nav>

        {isAuthenticated ? (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger>Hello</DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <Link to="/register">
            <img src={userIcon} className="w-8 h-8" alt="" />
          </Link>
        )}
      </div>
    </>
  );
});

export default Navbar;
