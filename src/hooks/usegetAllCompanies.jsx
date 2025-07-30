import { setTutionCenters } from "@/redux/companyslice";
import { TUTION_CENTER_API_ENDPOINT } from "@/utils/data";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllTutionCenters = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchTutionCenters = async () => {
      try {
        const res = await axios.get(`${TUTION_CENTER_API_ENDPOINT}/get`, {
          withCredentials: true,
        });
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
