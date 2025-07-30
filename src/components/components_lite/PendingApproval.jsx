import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { setUser } from "@/redux/authSlice";
import { Clock, Shield, Mail, Phone } from "lucide-react";

const PendingApproval = () => {
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login if no user or user is not pending
    if (!user || user.status !== "pending") {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    dispatch(setUser(null));
    navigate("/login");
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-yellow-100 mb-6">
            <Clock className="h-8 w-8 text-yellow-600" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Account Pending Approval
          </h2>

          <div className="text-gray-600 mb-6">
            <p className="mb-4">
              Hello{" "}
              <span className="font-semibold text-gray-900">
                {user.fullname}
              </span>
              ,
            </p>
            <p className="mb-4">
              Your account has been successfully created but is currently
              pending approval from our administrators.
            </p>
            <p className="mb-4">
              You will be notified once your account is approved and you can
              start using all features.
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Your Account Details
            </h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <span>{user.phoneNumber}</span>
              </div>
              <div className="flex items-center">
                <div className="h-4 w-4 mr-2 bg-blue-500 rounded-full"></div>
                <span>Role: {user.role}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">
                What happens next?
              </h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Our team will review your account</li>
                <li>• You&apos;ll receive an email notification</li>
                <li>• Once approved, you can access all features</li>
              </ul>
            </div>

            <div className="flex space-x-3">
              <Button
                onClick={handleLogout}
                variant="outline"
                className="flex-1">
                Logout
              </Button>
              <Button
                onClick={() => window.location.reload()}
                className="flex-1">
                Refresh Status
              </Button>
            </div>
          </div>

          <div className="mt-6 text-xs text-gray-500">
            <p>
              Need help? Contact support at{" "}
              <a
                href="mailto:support@jobportal.com"
                className="text-blue-600 hover:underline">
                support@jobportal.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingApproval;
