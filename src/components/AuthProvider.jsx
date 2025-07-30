import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/authSlice";
import { auth } from "@/utils/auth";
import apiClient from "@/utils/axios";

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated but Redux state is empty
    const initializeAuth = async () => {
      const token = auth.getToken();

      if (token && !user) {
        try {
          // Try to get user profile - try multiple possible endpoints
          let response;
          try {
            response = await apiClient.get("/api/user/profile");
          } catch (profileError) {
            // Fallback to other possible endpoints
            try {
              response = await apiClient.get("/api/user/me");
            } catch (meError) {
              response = await apiClient.get("/api/auth/me");
            }
          }

          if (response.data.success) {
            dispatch(setUser(response.data.user));
            console.log("User restored from token:", response.data.user);
          }
        } catch (error) {
          console.log("Token validation failed:", error);
          // Clear invalid token
          auth.removeToken();
        }
      }

      setIsInitializing(false);
    };

    initializeAuth();
  }, [dispatch, user]);

  // Show loading while initializing
  if (isInitializing) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Initializing application...</p>
        </div>
      </div>
    );
  }

  return children;
};

export default AuthProvider;
