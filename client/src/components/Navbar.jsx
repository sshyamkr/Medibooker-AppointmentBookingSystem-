import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { MdOutlineLocalHospital } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdLogout } from "react-icons/md";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    toast.success("Logged Out");
  };

  return (
    <nav className="bg-indigo-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link
          to={"/"}
          className="text-white text-2xl font-bold flex flex-row items-center"
        >
          <MdOutlineLocalHospital /> DocBook
        </Link>
        <div className="flex space-x-4">
          {token ? (
            <>
              <Link
                to="/dashboard"
                className="text-white hover:text-gray-300 flex flex-row items-center gap-1"
              >
                <LuLayoutDashboard /> Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="text-white hover:text-gray-300 flex flex-row items-center gap-1"
              >
                Logout <MdLogout />
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="text-white hover:text-gray-300 flex flex-row items-center gap-1"
            >
              <FaUser /> Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
