import { setAllAdminJobs } from "@/redux/jobSlice";
import { TUTOR_OPPORTUNITY_API_ENDPOINT } from "@/utils/data";
import apiClient from "@/utils/axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllAdminJobs = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await apiClient.get(
          `${TUTOR_OPPORTUNITY_API_ENDPOINT}/getadminopportunities`
        );
        console.log("API Response:", res.data);
        if (res.data.success) {
          dispatch(setAllAdminJobs(res.data.adminTutorOpportunities));
        } else {
          setError("Failed to fetch tutor opportunities.");
        }
      } catch (error) {
        console.error("Fetch Error:", error);
        setError(error.message || "An error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllAdminJobs();
  }, [dispatch]);

  return { loading, error };
};

export default useGetAllAdminJobs;
