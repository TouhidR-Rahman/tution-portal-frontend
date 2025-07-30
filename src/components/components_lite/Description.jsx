import { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useParams, useNavigate } from "react-router-dom";
import {
  TUTOR_OPPORTUNITY_API_ENDPOINT,
  APPLICATION_API_ENDPOINT,
} from "@/utils/data";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSingleTutorOpportunity } from "@/redux/jobSlice";
import { toast } from "sonner";
import Navbar from "./Navbar";

const Description = () => {
  const params = useParams();
  const navigate = useNavigate();
  const tutorOpportunityId = params.id;
  const { singleTutorOpportunity } = useSelector(
    store => store.tutorOpportunities || {},
  );
  const dispatch = useDispatch();
  const { user } = useSelector(store => store.auth);

  const isInitiallyApplied =
    singleTutorOpportunity?.applications?.some(
      application => application.applicant === user?._id,
    ) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const applyTutorOpportunityHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_ENDPOINT}/apply/${tutorOpportunityId}`,
        { withCredentials: true },
      );
      if (res.data.success) {
        // Refetch the single tutor opportunity to get updated applications
        try {
          const refetch = await axios.get(
            `${TUTOR_OPPORTUNITY_API_ENDPOINT}/get/${tutorOpportunityId}`,
            { withCredentials: true },
          );
          if (refetch.data.status || refetch.data.success) {
            dispatch(setSingleTutorOpportunity(refetch.data.tutorOpportunity));
            // DEBUG: Log applications array and applicant field
            console.log(
              "applications after apply:",
              refetch.data.tutorOpportunity.applications,
            );
            setIsApplied(
              refetch.data.tutorOpportunity.applications.some(application => {
                const applicantId =
                  typeof application.applicant === "object"
                    ? application.applicant._id
                    : application.applicant;
                return String(applicantId) === String(user?._id);
              }),
            );
          }
        } catch {
          // fallback: just set as applied
          setIsApplied(true);
        }
        toast.success(res.data.message);
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to apply.";
      if (msg.includes("already applied")) {
        setIsApplied(true);
      }
      toast.error(msg);
    }
  };

  useEffect(() => {
    const fetchSingleTutorOpportunity = async () => {
      try {
        const res = await axios.get(
          `${TUTOR_OPPORTUNITY_API_ENDPOINT}/get/${tutorOpportunityId}`,
          {
            withCredentials: true,
          },
        );
        if (res.data.status || res.data.success) {
          dispatch(setSingleTutorOpportunity(res.data.tutorOpportunity));
          setIsApplied(
            res.data.tutorOpportunity.applications.some(application => {
              const applicantId =
                typeof application.applicant === "object"
                  ? application.applicant._id
                  : application.applicant;
              return String(applicantId) === String(user?._id);
            }),
          );
        } else {
          console.error("Failed to fetch tutor opportunity details.");
        }
      } catch (error) {
        console.error("Error fetching tutor opportunity details:", error);
      }
    };
    fetchSingleTutorOpportunity();
  }, [tutorOpportunityId, dispatch, user?._id]);

  if (!singleTutorOpportunity) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-500 border-t-transparent mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">
              Loading opportunity details...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {singleTutorOpportunity?.title}
              </h1>
              <div className="flex flex-wrap gap-3">
                <Badge className="bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 font-medium px-4 py-2 rounded-full">
                  💰 {singleTutorOpportunity?.salary} BDT/month
                </Badge>
                <Badge className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 font-medium px-4 py-2 rounded-full">
                  📍 {singleTutorOpportunity?.location}
                </Badge>
                <Badge className="bg-gradient-to-r from-green-100 to-green-200 text-green-800 font-medium px-4 py-2 rounded-full">
                  🎓 {singleTutorOpportunity?.tutionType}
                </Badge>
              </div>
            </div>
            <div className="flex-shrink-0">
              {user ? (
                user.role === "Tutor" ? (
                  <Button
                    onClick={isApplied ? null : applyTutorOpportunityHandler}
                    disabled={isApplied}
                    className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 ${
                      isApplied
                        ? "bg-gray-400 cursor-not-allowed text-gray-700"
                        : "bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    }`}>
                    {isApplied ? "✅ Already Applied" : "🚀 Apply as Tutor"}
                  </Button>
                ) : (
                  <Button
                    disabled
                    className="px-8 py-4 rounded-xl font-semibold text-lg bg-gray-400 cursor-not-allowed text-gray-700">
                    👨‍💼 Recruiters Cannot Apply
                  </Button>
                )
              ) : (
                <Button
                  onClick={() => {
                    toast.info("Please log in to apply for this opportunity");
                    navigate("/login");
                  }}
                  className="px-8 py-4 rounded-xl font-semibold text-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
                  🔐 Login to Apply
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <div className="border-b border-gray-200 pb-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              📋 Opportunity Details
            </h2>
            <p className="text-gray-600">
              Everything you need to know about this position
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="p-6 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl">
                <h3 className="font-semibold text-purple-800 mb-2 flex items-center gap-2">
                  🏢 Tuition Center
                </h3>
                <p className="text-gray-700">
                  {singleTutorOpportunity?.tutionCenter?.name || "N/A"}
                </p>
              </div>

              <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl">
                <h3 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                  👤 Role
                </h3>
                <p className="text-gray-700">Tutor</p>
              </div>

              <div className="p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-xl">
                <h3 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                  📍 Location
                </h3>
                <p className="text-gray-700">
                  {singleTutorOpportunity?.location}
                </p>
              </div>

              <div className="p-6 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl">
                <h3 className="font-semibold text-orange-800 mb-2 flex items-center gap-2">
                  💰 Salary
                </h3>
                <p className="text-gray-700">
                  {singleTutorOpportunity?.salary} BDT/month
                </p>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div className="p-6 bg-gradient-to-r from-pink-50 to-pink-100 rounded-xl">
                <h3 className="font-semibold text-pink-800 mb-2 flex items-center gap-2">
                  📚 Requirements
                </h3>
                <p className="text-gray-700">
                  {singleTutorOpportunity?.requirements || "Not specified"}
                </p>
              </div>

              <div className="p-6 bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-xl">
                <h3 className="font-semibold text-indigo-800 mb-2 flex items-center gap-2">
                  🎯 Experience
                </h3>
                <p className="text-gray-700">
                  {singleTutorOpportunity?.experienceLevel} Year(s)
                </p>
              </div>

              <div className="p-6 bg-gradient-to-r from-teal-50 to-teal-100 rounded-xl">
                <h3 className="font-semibold text-teal-800 mb-2 flex items-center gap-2">
                  📅 Days Available
                </h3>
                <p className="text-gray-700">
                  {Array.isArray(singleTutorOpportunity?.daysAvailable)
                    ? singleTutorOpportunity.daysAvailable.join(", ")
                    : singleTutorOpportunity?.daysAvailable || "Not specified"}
                </p>
              </div>

              <div className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
                <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  📊 Statistics
                </h3>
                <div className="space-y-2">
                  <p className="text-gray-700">
                    <span className="font-medium">Total Applicants:</span>{" "}
                    {singleTutorOpportunity?.applications?.length}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Posted:</span>{" "}
                    {singleTutorOpportunity?.createdAt.split("T")[0]}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;
