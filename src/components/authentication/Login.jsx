import { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useNavigate } from "react-router-dom";
import { RadioGroup } from "../ui/radio-group";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_ENDPOINT } from "@/utils/data.js";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { auth } from "@/utils/auth";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user } = useSelector((store) => store.auth);
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true)); // Start loading
      const res = await axios.post(`${USER_API_ENDPOINT}/login`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));

        // Store token if provided
        if (res.data.token) {
          auth.setToken(res.data.token, true); // Remember token
        }

        // Check user status
        if (res.data.user.status === "pending") {
          navigate("/pending-approval");
          toast.success("Login successful. Your account is pending approval.");
        } else if (res.data.user.status === "rejected") {
          toast.error(
            "Your account has been rejected. Please contact support."
          );
        } else if (res.data.user.status === "approved") {
          navigate("/");
          toast.success(res.data.message);
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Login failed. Please try again.");
      }
    } finally {
      dispatch(setLoading(false)); // End loading
    }
  };

  useEffect(() => {
    if (user) {
      if (user.status === "pending") {
        navigate("/pending-approval");
      } else if (user.status === "rejected") {
        // User is rejected, stay on login page
        return;
      } else if (user.status === "approved") {
        if (user.role === "Recruiter") {
          navigate("/admin/tution-centers");
        } else {
          navigate("/");
        }
      }
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <Navbar />

      <div className="flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">Sign in to your account to continue</p>
          </div>

          {/* Login Form */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <form onSubmit={submitHandler} className="space-y-6">
              {/* Email Field */}
              <div>
                <Label className="text-gray-700 font-medium mb-2 block">
                  📧 Email Address
                </Label>
                <Input
                  type="email"
                  value={input.email}
                  name="email"
                  onChange={changeEventHandler}
                  placeholder="johndoe@gmail.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-colors"
                  required
                />
              </div>

              {/* Password Field */}
              <div>
                <Label className="text-gray-700 font-medium mb-2 block">
                  🔒 Password
                </Label>
                <Input
                  type="password"
                  value={input.password}
                  name="password"
                  onChange={changeEventHandler}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-colors"
                  required
                />
              </div>

              {/* Role Selection */}
              <div>
                <Label className="text-gray-700 font-medium mb-3 block">
                  👤 I am a:
                </Label>
                <RadioGroup className="flex space-x-4">
                  <div className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <Input
                      type="radio"
                      name="role"
                      value="Tutor"
                      checked={input.role === "Tutor"}
                      onChange={changeEventHandler}
                      className="w-4 h-4 text-gray-600 border-gray-300 focus:ring-gray-500"
                    />
                    <Label
                      htmlFor="r1"
                      className="text-sm text-gray-700 cursor-pointer"
                    >
                      🎓 Tutor
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <Input
                      type="radio"
                      name="role"
                      value="Recruiter"
                      checked={input.role === "Recruiter"}
                      onChange={changeEventHandler}
                      className="w-4 h-4 text-gray-600 border-gray-300 focus:ring-gray-500"
                    />
                    <Label
                      htmlFor="r2"
                      className="text-sm text-gray-700 cursor-pointer"
                    >
                      🏢 Recruiter
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                {loading ? (
                  <div className="w-full py-4 px-6 bg-gray-100 rounded-xl flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-purple-500 border-t-transparent"></div>
                    <span className="ml-2 text-gray-600">Signing in...</span>
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="w-full py-4 px-6 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white font-semibold rounded-xl transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
                  >
                    🚀 Sign In
                  </button>
                )}
              </div>

              {/* Register Link */}
              <div className="text-center pt-4 border-t border-gray-200">
                <p className="text-gray-600 mb-4">
                  Don&apos;t have an account?
                </p>
                <Link to="/register">
                  <button
                    type="button"
                    className="w-full py-3 px-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
                  >
                    ✨ Create Account
                  </button>
                </Link>
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 text-gray-500 text-sm">
            <p>🔒 Your information is safe and secure</p>
          </div>

          {/* Admin Access Info */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-2">Admin Access</h3>
            <div className="text-sm text-blue-800 space-y-1">
              <p>
                <strong>Recruiter Admin:</strong> Login as Recruiter to manage
                jobs & tuition centers
              </p>
              <p>
                <strong>SuperAdmin:</strong> Use the SuperAdmin link in navbar
                to manage users
              </p>
              <p className="text-xs text-blue-600 mt-2">
                SuperAdmin credentials: superadmin@jobportal.com /
                SuperAdmin@123
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
