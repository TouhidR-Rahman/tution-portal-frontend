import { setSingleTutionCenter } from "@/redux/companyslice";
import { TUTION_CENTER_API_ENDPOINT } from "@/utils/data";
import apiClient from "@/utils/axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetTutionCenterById = (tutionCenterId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSingleTutionCenter = async () => {
      try {
        const res = await apiClient.get(
          `${TUTION_CENTER_API_ENDPOINT}/get/${tutionCenterId}`
        );
        dispatch(setSingleTutionCenter(res.data.tutionCenter));
      } catch (error) {
        console.error("Error fetching tution center:", error);
      }
    };

    if (tutionCenterId) {
      fetchSingleTutionCenter();
    }
  }, [tutionCenterId, dispatch]);
};

export default useGetTutionCenterById;
