import { useEffect } from "react";
import ApplicantsTable from "./ApplicantsTable";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "@/redux/applicationSlice";
import { APPLICATION_API_ENDPOINT } from "@/utils/data";
import Navbar from "../components_lite/Navbar";

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector(store => store.application);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_ENDPOINT}/${params.id}/applicants`,
          { withCredentials: true },
        );
        dispatch(setAllApplicants(res.data.tutorOpportunity));
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllApplicants();
  }, [dispatch, params.id]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            👥 Job{" "}
            <span className="bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent">
              Applicants ({applicants?.applications?.length})
            </span>
          </h1>
          <p className="text-gray-600">
            View all applicants for this opportunity
            <span className="ml-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800">
              {applicants?.applications?.length || 0} applicants
            </span>
          </p>
        </div>

        {/* Job Details Card */}
        {applicants && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {applicants.title}
                </h2>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span className="flex items-center">
                    🏢 {applicants.tutionCenter?.name || "Unknown Center"}
                  </span>
                  <span className="flex items-center">
                    📍 {applicants.location}
                  </span>
                  <span className="flex items-center">
                    💰 {applicants.salary} BDT/month
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-800">
                  {applicants?.applications?.length || 0}
                </div>
                <div className="text-sm text-gray-500">Total Applications</div>
              </div>
            </div>
          </div>
        )}

        {/* Applicants Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <ApplicantsTable />
        </div>
      </div>
    </div>
  );
};

export default Applicants;
