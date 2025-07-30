import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/authSlice";
import { auth } from "@/utils/auth";
import apiClient from "@/utils/axios";

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);

  useEffect(() => {
    // Check if user is already authenticated but Redux state is empty
    const initializeAuth = async () => {
      const token = auth.getToken();

      if (token && !user) {
        try {
          // Verify token with backend and get user info
          const response = await apiClient.get("/api/user/profile");
          if (response.data.success) {
            dispatch(setUser(response.data.user));
          }
        } catch (error) {
          console.log("Token validation failed:", error);
          // Clear invalid token
          auth.removeToken();
        }
      }
    };

    initializeAuth();
  }, [dispatch, user]);

  return children;
};

export default AuthProvider;
