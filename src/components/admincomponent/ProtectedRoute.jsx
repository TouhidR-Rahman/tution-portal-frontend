import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { auth } from "@/utils/auth";
import { navigationUtils } from "@/utils/navigation";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const currentPath = location.pathname;

      // If we have a token but no user in Redux, wait a bit for AuthProvider to load user
      const token = auth.getToken();

      if (token && !user) {
        // Give AuthProvider time to restore user state
        setTimeout(() => {
          setIsChecking(false);
        }, 1000);
        return;
      }

      if (!user && !token) {
        // Check if we should navigate to prevent loops
        if (navigationUtils.canNavigate(currentPath, "/login")) {
          navigationUtils.recordAttempt(currentPath, "/login");
          navigate("/login");
        }
        return;
      }

      if (user) {
        if (user.role !== "Recruiter") {
          if (navigationUtils.canNavigate(currentPath, "/")) {
            navigationUtils.recordAttempt(currentPath, "/");
            navigate("/");
          }
          return;
        }

        // Check if user is pending approval
        if (user.status === "pending") {
          if (navigationUtils.canNavigate(currentPath, "/pending-approval")) {
            navigationUtils.recordAttempt(currentPath, "/pending-approval");
            navigate("/pending-approval");
          }
          return;
        }

        // Check if user is rejected
        if (user.status === "rejected") {
          if (navigationUtils.canNavigate(currentPath, "/login")) {
            navigationUtils.recordAttempt(currentPath, "/login");
            navigate("/login");
          }
          return;
        }

        // User is properly authenticated, reset navigation attempts
        navigationUtils.resetAttempts();
      }

      setIsChecking(false);
    };

    checkAuth();
  }, [user, navigate, location.pathname]);

  // Show loading while checking authentication
  if (isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Don't render anything if user is not properly authenticated
  if (!user || user.role !== "Recruiter" || user.status !== "approved") {
    return null;
  }

  return <>{children}</>;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
