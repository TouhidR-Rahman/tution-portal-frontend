import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (user.role !== "Recruiter") {
      navigate("/");
      return;
    }

    // Check if user is pending approval
    if (user.status === "pending") {
      navigate("/pending-approval");
      return;
    }

    // Check if user is rejected
    if (user.status === "rejected") {
      navigate("/login");
      return;
    }
  }, [user, navigate]);

  if (!user || user.role !== "Recruiter" || user.status !== "approved") {
    return null;
  }

  return <>{children}</>;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
