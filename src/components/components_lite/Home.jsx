import { useEffect } from "react";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import Header from "./Header";
import LatestJobs from "./LatestJobs";
import Footer from "./Footer";
import AuthStatus from "./AuthStatus";
import useGetAllTutorOpportunities from "@/hooks/useGetAllJobs";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { loading, error } = useGetAllTutorOpportunities(); // Trigger data fetch
  const jobs = useSelector(
    (state) => state.tutorOpportunities.allTutorOpportunities
  ); // Access Redux state

  console.log("Jobs in Component:", { loading, error, jobs }); // Log to check state
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "Recruiter") {
      navigate("/admin/tution-centers");
    }
  }, [user, navigate]);

  return (
    <div>
      <Navbar />
      <AuthStatus />
      <Header />
      {/* <Categories /> */}
      {loading && <p>Loading jobs...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && <LatestJobs jobs={jobs} />}
      <Footer />
    </div>
  );
};

export default Home;
