import { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const PostTutorOpportunity = () => {
  const [input, setInput] = useState({
    title: "",
    tutionType: "",
    requirements: "",
    salary: "",
    location: "",
    daysAvailable: [],
    experience: "",
    tutionCenterId: "",
  });
  const navigate = useNavigate();
  const { tutionCenters } = useSelector(store => store.tutionCenter);
  const changeEventHandler = e => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleDaySelection = day => {
    const updatedDays = input.daysAvailable.includes(day)
      ? input.daysAvailable.filter(d => d !== day)
      : [...input.daysAvailable, day];
    setInput({ ...input, daysAvailable: updatedDays });
  };

  const handleTutionTypeChange = value => {
    setInput({ ...input, tutionType: value });
  };

  const [loading, setLoading] = useState(false);

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
      const res = await axios.post(
        `${TUTOR_OPPORTUNITY_API_ENDPOINT}/post`,
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
        navigate("/admin/jobs");
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            ✨ Post New{" "}
            <span className="bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent">
              Post a New Job
            </span>
          </h1>
          <p className="text-gray-600">
            Create a new opportunity for tutors to apply
          </p>
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <form onSubmit={submitHandler} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div>
                <Label className="text-gray-700 font-medium mb-2 block">
                  📝 Opportunity Title
                </Label>
                <Input
                  type="text"
                  name="title"
                  value={input.title}
                  placeholder="Enter opportunity title"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                  onChange={changeEventHandler}
                  required
                />
              </div>

              {/* Tuition Type */}
              <div>
                <Label className="text-gray-700 font-medium mb-2 block">
                  🎓 Tuition Type
                </Label>
                <Select onValueChange={handleTutionTypeChange}>
                  <SelectTrigger className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors">
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

              {/* Location */}
              <div>
                <Label className="text-gray-700 font-medium mb-2 block">
                  📍 Location
                </Label>
                <Input
                  type="text"
                  name="location"
                  value={input.location}
                  placeholder="Enter opportunity location"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                  onChange={changeEventHandler}
                  required
                />
              </div>

              {/* Salary */}
              <div>
                <Label className="text-gray-700 font-medium mb-2 block">
                  💰 Salary (BDT/month)
                </Label>
                <Input
                  type="number"
                  name="salary"
                  value={input.salary}
                  placeholder="Enter opportunity salary"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                  onChange={changeEventHandler}
                  required
                />
              </div>

              {/* Requirements */}
              <div>
                <Label className="text-gray-700 font-medium mb-2 block">
                  📋 Requirements
                </Label>
                <Input
                  type="text"
                  name="requirements"
                  value={input.requirements}
                  placeholder="Enter opportunity requirements"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                  onChange={changeEventHandler}
                  required
                />
              </div>

              {/* Experience */}
              <div>
                <Label className="text-gray-700 font-medium mb-2 block">
                  🎯 Experience (Years)
                </Label>
                <Input
                  type="number"
                  name="experience"
                  value={input.experience}
                  placeholder="Enter required experience"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                  onChange={changeEventHandler}
                  required
                />
              </div>
            </div>

            {/* Days Available */}
            <div>
              <Label className="text-gray-700 font-medium mb-3 block">
                📅 Days Available
              </Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
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
                    className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="checkbox"
                      checked={input.daysAvailable.includes(day)}
                      onChange={() => handleDaySelection(day)}
                      className="w-4 h-4 text-gray-600 border-gray-300 rounded focus:ring-gray-500"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {day}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Tuition Center */}
            <div>
              <Label className="text-gray-700 font-medium mb-2 block">
                🏢 Tuition Center
              </Label>
              {tutionCenters.length > 0 ? (
                <Select onValueChange={selectChangeHandler}>
                  <SelectTrigger className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors">
                    <SelectValue placeholder="Select a tuition center" />
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
              ) : (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-red-600 font-medium text-center">
                    ⚠️ Please register a tuition center first to post
                    opportunities.
                  </p>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              {loading ? (
                <Button
                  disabled
                  className="w-full py-4 px-6 bg-gray-400 text-white font-semibold rounded-xl cursor-not-allowed">
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Creating Opportunity...
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={tutionCenters.length === 0}
                  className="w-full py-4 px-6 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white font-semibold rounded-xl transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
                  🚀 Post Tutor Opportunity
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostTutorOpportunity;
