import { setAllTutorOpportunities } from "@/redux/jobSlice";
import { TUTOR_OPPORTUNITY_API_ENDPOINT } from "@/utils/data";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllTutorOpportunities = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { searchedQuery } = useSelector(store => store.tutorOpportunities);

  useEffect(() => {
    const fetchTutorOpportunities = async () => {
      setLoading(true);
      setError(null);
      try {
        let url = `${TUTOR_OPPORTUNITY_API_ENDPOINT}/get`;
        const params = new URLSearchParams();

        // Add keyword search
        if (searchedQuery && typeof searchedQuery === "string") {
          params.append("keyword", searchedQuery);
        } else if (searchedQuery && typeof searchedQuery === "object") {
          // Handle rating filter
          if (searchedQuery.Rating) {
            params.append("sortBy", "rating");
            params.append("order", "desc");
          }
        }

        if (params.toString()) {
          url += `?${params.toString()}`;
        }

        const res = await axios.get(url, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setAllTutorOpportunities(res.data.tutorOpportunities));
        }
      } catch (error) {
        setError(error.message || "Failed to fetch tutor opportunities");
      } finally {
        setLoading(false);
      }
    };

    fetchTutorOpportunities();
  }, [dispatch, searchedQuery]);

  return { loading, error };
};

export default useGetAllTutorOpportunities;
