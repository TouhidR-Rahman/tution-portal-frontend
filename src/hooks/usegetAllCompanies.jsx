import { setTutionCenters } from "@/redux/companyslice";
import { TUTION_CENTER_API_ENDPOINT } from "@/utils/data";
import apiClient from "@/utils/axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllTutionCenters = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchTutionCenters = async () => {
      try {
        const res = await apiClient.get(`${TUTION_CENTER_API_ENDPOINT}/get`);
        console.log("called");
        if (res.data.success) {
          dispatch(setTutionCenters(res.data.tutionCenters));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchTutionCenters();
  }, [dispatch]);
};

export default useGetAllTutionCenters;
