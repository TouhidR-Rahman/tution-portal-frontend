import { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/data";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";

const Register = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    password: "",
    role: "",
    phoneNumber: "",
    file: "",
  });

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { loading } = useSelector(store => store.auth);
  const changeEventHandler = e => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const ChangeFilehandler = e => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("role", input.role);
    formData.append("phoneNumber", input.phoneNumber);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_ENDPOINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      const errorMessage = error.response
        ? error.response.data.message
        : "An unexpected error occurred.";
      toast.error(errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const { user } = useSelector(store => store.auth);
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <Navbar />

      <div className="flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-lg">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent mb-2">
              Sign Up
            </h1>
            <p className="text-gray-600">
              Create your account and start your journey
            </p>
          </div>

          {/* Register Form */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <form onSubmit={submitHandler} className="space-y-6">
              {/* Full Name */}
              <div>
                <Label className="text-gray-700 font-medium mb-2 block">
                  👤 Full Name
                </Label>
                <Input
                  type="text"
                  value={input.fullname}
                  name="fullname"
                  onChange={changeEventHandler}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                  required
                />
              </div>

              {/* Email */}
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <Label className="text-gray-700 font-medium mb-2 block">
                  🔒 Password
                </Label>
                <Input
                  type="password"
                  value={input.password}
                  name="password"
                  onChange={changeEventHandler}
                  placeholder="Create a strong password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                  required
                />
              </div>

              {/* Phone Number */}
              <div>
                <Label className="text-gray-700 font-medium mb-2 block">
                  📱 Phone Number
                </Label>
                <Input
                  type="tel"
                  value={input.phoneNumber}
                  name="phoneNumber"
                  onChange={changeEventHandler}
                  placeholder="+880 1234567890"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                  required
                />
              </div>

              {/* Role Selection */}
              <div>
                <Label className="text-gray-700 font-medium mb-3 block">
                  🎯 I want to join as:
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
                      className="text-sm text-gray-700 cursor-pointer">
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
                      className="text-sm text-gray-700 cursor-pointer">
                      🏢 Recruiter
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Profile Photo */}
              <div>
                <Label className="text-gray-700 font-medium mb-2 block">
                  📸 Profile Photo (Optional)
                </Label>
                <div className="relative">
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        {input.file ? (
                          <div className="text-center">
                            <p className="text-sm text-green-600 font-medium">
                              ✅ {input.file.name}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              Click to change
                            </p>
                          </div>
                        ) : (
                          <div className="text-center">
                            <svg
                              className="w-8 h-8 mb-2 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                              />
                            </svg>
                            <p className="text-sm text-gray-500">
                              <span className="font-medium">
                                Click to upload
                              </span>{" "}
                              or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">
                              PNG, JPG or GIF (MAX. 5MB)
                            </p>
                          </div>
                        )}
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={ChangeFilehandler}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                {loading ? (
                  <div className="w-full py-4 px-6 bg-gray-100 rounded-xl flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-purple-500 border-t-transparent"></div>
                    <span className="ml-2 text-gray-600">
                      Creating account...
                    </span>
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="w-full py-4 px-6 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white font-semibold rounded-xl transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl">
                    🚀 Create Account
                  </button>
                )}
              </div>

              {/* Login Link */}
              <div className="text-center pt-4 border-t border-gray-200">
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-gray-900 font-semibold">
                    Sign In
                  </Link>
                </p>
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 text-gray-500 text-sm">
            <p>🔒 Your information is safe and secure</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
