import { setAllAppliedTutorOpportunities } from "@/redux/jobSlice";
import { APPLICATION_API_ENDPOINT } from "@/utils/data";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

const useGetAppliedJobs = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const refetch = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_ENDPOINT}/get`, {
          withCredentials: true,
        });
        console.log("Fetching applied jobs - API Response:", res.data);
        if (res.data.success) {
          console.log("Setting applications in Redux:", res.data.application);
          dispatch(setAllAppliedTutorOpportunities(res.data.application));
        }
      } catch (error) {
        console.error("Error fetching applied jobs:", error);
      }
    };
    fetchAppliedJobs();
  }, [dispatch, refreshTrigger, location.pathname]);

  return { refetch };
};

export default useGetAppliedJobs;
