import { useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { COMPANY_API_ENDPOINT } from "@/utils/data";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleTutionCenter } from "@/redux/companyslice";
import axios from "axios";

const TutionCenterCreate = () => {
  const navigate = useNavigate();
  const [tutionCenterName, setTutionCenterName] = useState("");
  const dispatch = useDispatch();
  const registerNewTutionCenter = async () => {
    try {
      const res = await axios.post(
        `${COMPANY_API_ENDPOINT}/register`,
        { tutionCenterName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );
      if (res?.data?.success) {
        dispatch(setSingleTutionCenter(res.data.tutionCenter));
        toast.success(res.data.message);
        const tutionCenterId = res?.data?.tutionCenter?._id;
        navigate(`/admin/tution-centers/${tutionCenterId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto">
        <div className="my-10">
          <h1 className="font-bold text-2xl ">Tution Center Name</h1>
          <p className="text-gray-600">
            Enter your tution center&#39;s name to get started.
          </p>
        </div>
        <Label>Tution Center Name</Label>
        <Input
          type="text"
          placeholder="Tution Center Name"
          className="my-2"
          onChange={e => setTutionCenterName(e.target.value)}
        />

        <div className="flex items-center gap-2 my-10">
          <Button
            variant="outline"
            onClick={() => navigate("/admin/tution-centers")}>
            Cancel
          </Button>
          <Button onClick={registerNewTutionCenter}>Continue</Button>
        </div>
      </div>
    </div>
  );
};

export default TutionCenterCreate;
