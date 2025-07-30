import { useState, useEffect } from "react";
import Navbar from "../components_lite/Navbar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import { TUTOR_OPPORTUNITY_API_ENDPOINT } from "@/utils/data";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";

const EditTutorOpportunity = () => {
  const [input, setInput] = useState({
    title: "",
    tutionType: "",
    salary: "",
    daysAvailable: [],
    location: "",
    requirements: "",
    experienceLevel: "",
    tutionCenterId: "",
  });
  const navigate = useNavigate();
  const { id } = useParams(); // Get job ID from URL
  const { tutionCenters } = useSelector(store => store.tutionCenter);
  const [loading, setLoading] = useState(false);
  const [fetchingJob, setFetchingJob] = useState(true);

  // Fetch existing job data
  useEffect(() => {
    const fetchJobData = async () => {
      try {
        setFetchingJob(true);
        const res = await axios.get(
          `${TUTOR_OPPORTUNITY_API_ENDPOINT}/admin/${id}`,
          {
            withCredentials: true,
          },
        );
        if (res.data.success) {
          const job = res.data.tutorOpportunity;
          setInput({
            title: job.title,
            tutionType: job.tutionType,
            salary: job.salary.toString(),
            daysAvailable: job.daysAvailable || [],
            location: job.location,
            requirements: job.requirements.join(", "),
            experienceLevel: job.experienceLevel.toString(),
            tutionCenterId: "", // We'll set this based on the tution center name
          });

          // Find the tution center ID based on the embedded name
          const matchingCenter = tutionCenters.find(
            center => center.name === job.tutionCenter.name,
          );
          if (matchingCenter) {
            setInput(prev => ({ ...prev, tutionCenterId: matchingCenter._id }));
          }
        }
      } catch (error) {
        console.error("Error fetching job data:", error);
        toast.error("Failed to fetch job data");
        navigate("/admin/jobs");
      } finally {
        setFetchingJob(false);
      }
    };

    if (id && tutionCenters.length > 0) {
      fetchJobData();
    }
  }, [id, tutionCenters, navigate]);

  const changeEventHandler = e => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleDaySelection = day => {
    const updatedDays = input.daysAvailable.includes(day)
      ? input.daysAvailable.filter(d => d !== day)
      : [...input.daysAvailable, day];
    setInput({ ...input, daysAvailable: updatedDays });
  };

  const selectChangeHandler = value => {
    const selectedTutionCenter = tutionCenters.find(
      center => center.name.toLowerCase() === value,
    );
    setInput({ ...input, tutionCenterId: selectedTutionCenter._id });
  };

  const submitHandler = async e => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.put(
        `${TUTOR_OPPORTUNITY_API_ENDPOINT}/update/${id}`,
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || "Something went wrong");
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  if (fetchingJob) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Loading job data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex items-center justify-center w-screen py-10">
        <form
          onSubmit={submitHandler}
          className="p-8 max-w-4xl bg-white border border-gray-200 shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Edit Tutor Opportunity
          </h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                placeholder="Enter opportunity title"
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-1 focus-visible:ring-1 my-1"
              />
            </div>
            <div>
              <Label>Tuition Type</Label>
              <Select
                value={input.tutionType}
                onValueChange={value =>
                  setInput({ ...input, tutionType: value })
                }>
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Select tuition type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Class 9">Class 9</SelectItem>
                    <SelectItem value="SSC">SSC</SelectItem>
                    <SelectItem value="HSC">HSC</SelectItem>
                    <SelectItem value="Admission">Admission</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Requirements</Label>
              <Input
                type="text"
                name="requirements"
                value={input.requirements}
                placeholder="Enter requirements (comma-separated)"
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-1 focus-visible:ring-1 my-1"
              />
            </div>
            <div>
              <Label>Salary</Label>
              <Input
                type="number"
                name="salary"
                value={input.salary}
                placeholder="Enter salary amount"
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-1 focus-visible:ring-1 my-1"
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                placeholder="Enter location"
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-1 focus-visible:ring-1 my-1"
              />
            </div>
            <div>
              <Label>Experience Level (Years)</Label>
              <Input
                type="number"
                name="experienceLevel"
                value={input.experienceLevel}
                placeholder="Enter required experience"
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-1 focus-visible:ring-1 my-1"
              />
            </div>
            <div>
              <Label>Days Available</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {[
                  "Saturday",
                  "Sunday",
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                ].map(day => (
                  <label
                    key={day}
                    className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={input.daysAvailable.includes(day)}
                      onChange={() => handleDaySelection(day)}
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                    <span className="text-sm">{day}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <Label>Tution Center</Label>
              {tutionCenters.length > 0 && (
                <Select onValueChange={selectChangeHandler}>
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="Select a tution center" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {tutionCenters.map(center => (
                        <SelectItem
                          key={center._id}
                          value={center.name.toLowerCase()}>
                          {center.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>
          {tutionCenters.length === 0 && (
            <p className="text-red-600 font-bold text-xs text-center my-3">
              *Please create a tution center first to post a job
            </p>
          )}
          <div className="flex items-center justify-center my-8">
            {loading ? (
              <Button disabled className="w-full">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button type="submit" className="w-full">
                Update Tutor Opportunity
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTutorOpportunity;
