// import from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { MdOutlineLocalHospital, MdLogout } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { LuLayoutDashboard } from "react-icons/lu";

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
    <nav className="p-2 fixed top-0 left-0 right-0 bg-gray-800 z-50 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link
          to={"/"}
          className="text-[#34ebc3] text-2xl font-bold flex flex-row items-center"
        >
          <MdOutlineLocalHospital /> MediBooker
        </Link>
        <div className="flex space-x-4">
          {token ? (
            <>
              <Link
                to="/dashboard"
                className="text-white hover:text-gray-300 flex flex-row items-center gap-1"
              >
                <LuLayoutDashboard /> Appointments
              </Link>
              <Link
                to="/offer"
                className="text-white hover:text-gray-300 flex flex-row items-center gap-1"
              >
                Offer
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
              className="w-[100px] rounded-xl p-2 bg-[#34ebc3] flex flex-row gap-1 justify-center items-center"
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
