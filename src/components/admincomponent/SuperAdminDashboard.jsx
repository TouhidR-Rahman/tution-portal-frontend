import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import {
  CheckCircle,
  XCircle,
  Clock,
  Users,
  UserCheck,
  UserX,
} from "lucide-react";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://tution-portal-backend.vercel.app";

const SuperAdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);

  // Redirect if not superadmin
  useEffect(() => {
    if (!user || user.role !== "SuperAdmin") {
      navigate("/superadmin/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          `${API_BASE_URL}/api/superadmin/users?status=${filter}`,
          {
            withCredentials: true,
          }
        );
        if (res.data.success) {
          setUsers(res.data.users);
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    const fetchStats = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/superadmin/stats`, {
          withCredentials: true,
        });
        if (res.data.success) {
          setStats(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
    fetchStats();
  }, [filter]);

  const refetchData = async () => {
    try {
      const [usersRes, statsRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/api/superadmin/users?status=${filter}`, {
          withCredentials: true,
        }),
        axios.get(`${API_BASE_URL}/api/superadmin/stats`, {
          withCredentials: true,
        }),
      ]);

      if (usersRes.data.success) {
        setUsers(usersRes.data.users);
      }
      if (statsRes.data.success) {
        setStats(statsRes.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const approveUser = async (userId) => {
    try {
      const res = await axios.put(
        `${API_BASE_URL}/api/superadmin/approve-user/${userId}`,
        {},
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success("User approved successfully");
        refetchData();
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to approve user");
    }
  };

  const rejectUser = async (userId) => {
    try {
      const res = await axios.put(
        `${API_BASE_URL}/api/superadmin/reject-user/${userId}`,
        {},
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success("User rejected successfully");
        refetchData();
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to reject user");
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Approved
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-800">
            <XCircle className="w-3 h-3 mr-1" />
            Rejected
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getRoleBadge = (role) => {
    const colors = {
      Tutor: "bg-blue-100 text-blue-800",
      Recruiter: "bg-purple-100 text-purple-800",
    };
    return (
      <Badge className={colors[role] || "bg-gray-100 text-gray-800"}>
        {role}
      </Badge>
    );
  };

  const getStatCount = (statArray, key) => {
    const stat = statArray?.find((s) => s._id === key);
    return stat ? stat.count : 0;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                SuperAdmin Dashboard
              </h1>
              <p className="text-gray-600">
                Manage user approvals and system oversight
              </p>
            </div>
            <Button
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/superadmin/login");
              }}
              variant="outline"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">
                  {getStatCount(stats.statusStats, "pending") +
                    getStatCount(stats.statusStats, "approved") +
                    getStatCount(stats.statusStats, "rejected")}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">
                  {getStatCount(stats.statusStats, "pending")}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <UserCheck className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-gray-900">
                  {getStatCount(stats.statusStats, "approved")}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <UserX className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Rejected</p>
                <p className="text-2xl font-bold text-gray-900">
                  {getStatCount(stats.statusStats, "rejected")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex space-x-4">
              <Button
                variant={filter === "all" ? "default" : "outline"}
                onClick={() => setFilter("all")}
              >
                All Users
              </Button>
              <Button
                variant={filter === "pending" ? "default" : "outline"}
                onClick={() => setFilter("pending")}
              >
                Pending
              </Button>
              <Button
                variant={filter === "approved" ? "default" : "outline"}
                onClick={() => setFilter("approved")}
              >
                Approved
              </Button>
              <Button
                variant={filter === "rejected" ? "default" : "outline"}
                onClick={() => setFilter("rejected")}
              >
                Rejected
              </Button>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              User Management
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Joined
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={
                              user.profile?.profilePhoto ||
                              "/api/placeholder/40/40"
                            }
                            alt={user.fullname}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.fullname}
                          </div>
                          <div className="text-sm text-gray-500">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getRoleBadge(user.role)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(user.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      {user.status === "pending" && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => approveUser(user._id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => rejectUser(user._id)}
                            className="text-red-600 border-red-600 hover:bg-red-50"
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Reject
                          </Button>
                        </>
                      )}
                      {user.status === "approved" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => rejectUser(user._id)}
                          className="text-red-600 border-red-600 hover:bg-red-50"
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                      )}
                      {user.status === "rejected" && (
                        <Button
                          size="sm"
                          onClick={() => approveUser(user._id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {users.length === 0 && (
            <div className="text-center py-12">
              <Users className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No users found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                No users match the current filter criteria.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
