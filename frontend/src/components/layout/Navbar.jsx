import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../redux/apiSlice";
import { logoutUser, setContentType } from "../../redux/authSlice";
import { useState } from "react";
import { AlignRight, LogOut, Search } from "lucide-react";

export default function Navbar() {
  const contentType = useSelector((state) => state.authenication.contentType);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(contentType);
  const navigate = useNavigate();
  const userProfile = useSelector(
    (state) => state.authenication.user.userprofile
  );

  const [logoutApi] = useLogoutMutation();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
      dispatch(logoutUser());
      navigate("/")
    } catch (error) {
      console.error("Logout failed: ", error);
    }
  };

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    dispatch(setContentType(tab));
    if (tab === "movie" || tab === "tv") {
      navigate("/");
    }
    setMenuOpen(!menuOpen);
  };

  return (
    <div className=" text-white py-4 px-4   mx-auto">
      <div className="flex  gap-5 justify-between items-center  mx-auto ">
        <NavLink onClick={()=>handleTabClick("movie")} to="/" className="flex items-center">
          
          <img
            src="/netflix-logo.png"
            alt="Netflix Logo"
            className="w-32 sm:w-40"
          />
        </NavLink>
        <div className="flex w-full  whitespace-nowrap justify-between">
          <div className="hidden sm:flex  w-full gap-5 items-center">
            <button
              onClick={() => handleTabClick("movie")}
              className={
                activeTab === "movie"
                  ? "text-red-600 underline"
                  : "text-white hover:underline"
              }
            >
              Movies
            </button>
            <button
              onClick={() => handleTabClick("tv")}
              className={
                activeTab === "tv"
                  ? "text-red-600 underline"
                  : "text-white hover:underline"
              }
            >
              TV Shows
            </button>
            <NavLink
              to="/history"
              onClick={() => handleTabClick("history")}
              className={
                activeTab === "history"
                  ? "text-red-600 underline"
                  : "text-white hover:underline"
              }
            >
              Search History
            </NavLink>
          </div>

          <div className="flex gap-3  justify-end w-full items-center">
            <Search size={34} className="hover:cursor-pointer  " onClick={() => navigate("/search")} />
            <img
              className="rounded-full h-8 w-8 sm:h-10 sm:w-10 border-2 border-white object-cover shadow-md"
              src={userProfile}
              alt="user profile"
            />
            <button
              className="py-2 hidden  sm:flex gap-4 px-4 hover:bg-red-700 bg-red-600/35 text-white rounded"
              onClick={handleLogout}
            >
              Logout
              <LogOut />
            </button>
            <div
              onClick={handleMenuToggle}
              className="sm:hidden cursor-pointer"
            >
              <AlignRight size={32} />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          menuOpen ? "block" : "hidden"
        } sm:hidden bg-black  text-white py-4 absolute top-16  left-0 w-full z-50`}
      >
        <div className="flex flex-col gap-4 px-8 py-5 items-start">
          <button
              onClick={() => handleTabClick("movie")}
              className={
                activeTab === "movie"
                  ? "text-red-600 underline"
                  : "text-white hover:underline"
              }
            >
              Movies
            </button>
            <button
              onClick={() => handleTabClick("tv")}
              className={
                activeTab === "tv"
                  ? "text-red-600 underline"
                  : "text-white hover:underline"
              }
            >
              TV Shows
            </button>
          <NavLink
            to="/history"
            className="text-white text-lg hover:underline"
            onClick={() => handleTabClick("history")}
          >
            Search History
          </NavLink>
          <button
            className="py-2   flex gap-4 px-4 hover:bg-red-700 bg-red-600/35 text-white rounded"
            onClick={handleLogout}
          >
            Logout
            <LogOut />
          </button>
        </div>
      </div>
    </div>
  );
}
