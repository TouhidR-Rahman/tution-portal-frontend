import { Link, useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios"; // Import axios
import { setUser } from "@/redux/authSlice";
import { USER_API_ENDPOINT } from "@/utils/data";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const res = await axios.post(`${USER_API_ENDPOINT}/logout`, {
        withCredentials: true,
      });
      if (res && res.data && res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      } else {
        console.error("Error logging out:", res.data);
      }
    } catch (error) {
      console.error("Axios error:", error);
      if (error.response) {
        console.error("Error response:", error.response.data);
      }
      toast.error("Error logging out. Please try again.");
    }
  };
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">TP</span>
              </div>
              <div className="hidden sm:block">
                <span className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent">
                  TUTION<span className="text-gray-600">PORTAL</span>
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {user && user.role === "Recruiter" ? (
                <>
                  <Link
                    to="/Home"
                    className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-gray-100"
                  >
                    Browse
                  </Link>
                  <Link
                    to="/admin/jobs"
                    className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-gray-100"
                  >
                    Tutor Opportunities
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/Home"
                    className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-gray-100"
                  >
                    Home
                  </Link>
                  <Link
                    to="/Jobs"
                    className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-gray-100"
                  >
                    Tutions
                  </Link>
                  {user && user.role === "Tutor" && (
                    <Link
                      to="/ratings"
                      className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-gray-100"
                    >
                      Rate Centers
                    </Link>
                  )}
                </>
              )}
              {/* SuperAdmin Link - always visible */}
              <Link
                to="/superadmin/login"
                className="text-red-600 hover:text-red-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-red-50"
              >
                SuperAdmin
              </Link>
            </div>
          </div>

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            {!user ? (
              <div className="flex items-center space-x-3">
                <Link to="/login">
                  <Button
                    variant="ghost"
                    className="text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white shadow-lg hover:shadow-xl transition-all duration-200">
                    Register
                  </Button>
                </Link>
              </div>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <div className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 rounded-full p-2 transition-colors duration-200">
                    <Avatar className="h-8 w-8 ring-2 ring-gray-200">
                      <AvatarImage
                        src={user?.profile?.profilePhoto}
                        alt={user?.fullname}
                        className="object-cover"
                      />
                    </Avatar>
                    <div className="hidden sm:block">
                      <p className="text-sm font-medium text-gray-700">
                        {user?.fullname}
                      </p>
                      <p className="text-xs text-gray-500">{user?.role}</p>
                    </div>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0 border-0 shadow-xl">
                  <div className="bg-white rounded-lg overflow-hidden">
                    {/* Profile Header */}
                    <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-4 text-white">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-12 w-12 ring-2 ring-white/30">
                          <AvatarImage
                            src={user?.profile?.profilePhoto}
                            alt={user?.fullname}
                            className="object-cover"
                          />
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{user?.fullname}</h3>
                          <p className="text-sm text-gray-500">
                            {user?.profile?.bio || "No bio available"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="p-2">
                      {user && user.role === "Tutor" && (
                        <Link
                          to="/Profile"
                          className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors duration-200"
                        >
                          <User2 className="h-4 w-4 text-gray-500" />
                          <span className="text-sm font-medium text-gray-700">
                            Profile
                          </span>
                        </Link>
                      )}

                      <button
                        onClick={logoutHandler}
                        className="w-full flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-red-50 transition-colors duration-200 text-red-600"
                      >
                        <LogOut className="h-4 w-4" />
                        <span className="text-sm font-medium">Logout</span>
                      </button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
