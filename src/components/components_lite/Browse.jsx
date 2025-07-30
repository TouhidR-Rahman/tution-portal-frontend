import { useEffect } from "react";
import Navbar from "./Navbar";
import Job1 from "./Job1";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";

const Browse = () => {
  useGetAllJobs();
  const { allTutorOpportunities = [] } = useSelector(
    store => store.tutorOpportunities || {},
  );
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, [dispatch]);
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <h1 className="font-bold text-xl my-10 ">
          Search Results {allTutorOpportunities.length}
        </h1>
        <div className="grid grid-cols-3 gap-4  ">
          {allTutorOpportunities.map(job => (
            <Job1 key={job._id} tutorOpportunity={job} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Browse;
