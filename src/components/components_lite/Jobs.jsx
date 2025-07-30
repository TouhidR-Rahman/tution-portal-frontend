import { useEffect, useState } from "react";
import useGetAllTutorOpportunities from "@/hooks/useGetAllJobs";
import Navbar from "./Navbar";
import FilterCard from "./Filtercard";
import Job1 from "./Job1";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const TutorOpportunities = () => {
  useGetAllTutorOpportunities();
  const { allTutorOpportunities, searchedQuery } = useSelector(
    (store) => store.tutorOpportunities
  );
  const [filterJobs, setFilterJobs] = useState(allTutorOpportunities);
  const [sortBy, setSortBy] = useState("latest");

  // Function to sort jobs based on selected option
  const sortJobs = (jobs, sortOption) => {
    const jobsCopy = [...jobs];
    switch (sortOption) {
      case "latest":
        return jobsCopy.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      case "salary-high":
        return jobsCopy.sort((a, b) => (b.salary || 0) - (a.salary || 0));
      case "salary-low":
        return jobsCopy.sort((a, b) => (a.salary || 0) - (b.salary || 0));
      case "rating":
        return jobsCopy.sort(
          (a, b) =>
            (b.tutionCenter?.averageRating || 0) -
            (a.tutionCenter?.averageRating || 0)
        );
      default:
        return jobsCopy;
    }
  };

  // useGetAllTutorOpportunities hook will fetch jobs on mount

  useEffect(() => {
    let filtered = allTutorOpportunities;

    // Apply filters only if there are search queries
    if (searchedQuery && Object.keys(searchedQuery).length > 0) {
      // Subjects (text input, substring match)
      if (
        searchedQuery["Subjects"] &&
        searchedQuery["Subjects"].trim() !== ""
      ) {
        const subStr = searchedQuery["Subjects"].toLowerCase();
        filtered = filtered.filter((job) =>
          (job.requirements || []).some((subj) =>
            subj.toLowerCase().includes(subStr)
          )
        );
      }

      // Location
      if (searchedQuery["Location"]) {
        filtered = filtered.filter(
          (job) =>
            job.location?.toLowerCase() ===
            searchedQuery["Location"].toLowerCase()
        );
      }

      // Days Available (multi)
      if (
        searchedQuery["Days Available"] &&
        searchedQuery["Days Available"].length > 0
      ) {
        filtered = filtered.filter((job) =>
          Array.isArray(job.daysAvailable)
            ? searchedQuery["Days Available"].every((day) =>
                job.daysAvailable.includes(day)
              )
            : false
        );
      }

      // Tution Type
      if (searchedQuery["Tution Type"]) {
        filtered = filtered.filter(
          (job) => job.tutionType === searchedQuery["Tution Type"]
        );
      }

      // Experience Level
      if (searchedQuery["Experience Level"]) {
        const [minExp, maxExp] = searchedQuery["Experience Level"];
        filtered = filtered.filter((job) => {
          const exp = Number(job.experienceLevel) || 0;
          return exp >= minExp && exp <= maxExp;
        });
      }

      // Salary Range
      if (searchedQuery["Salary Range"]) {
        const min = Number(searchedQuery["Salary Range"].min) || 0;
        const max = Number(searchedQuery["Salary Range"].max) || Infinity;
        filtered = filtered.filter((job) => {
          const salary = Number(job.salary) || 0;
          return salary >= min && salary <= max;
        });
      }

      // Rating
      if (searchedQuery["Rating"] && searchedQuery["Rating"] !== "Any Rating") {
        const ratingThreshold = parseFloat(
          searchedQuery["Rating"].split(" ")[0]
        );
        filtered = filtered.filter((job) => {
          const rating = job.tutionCenter?.averageRating || 0;
          return rating >= ratingThreshold;
        });
      }
    }

    // Apply sorting
    const sorted = sortJobs(filtered, sortBy);
    setFilterJobs(sorted);
  }, [allTutorOpportunities, searchedQuery, sortBy]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Navbar />

      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Find Your Perfect{" "}
              <span className="bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent">
                Tutions
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore thousands of tutor opportunities from top institutions
              across Bangladesh
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 sticky top-24">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
              </div>
              <div className="p-6">
                <FilterCard />
              </div>
            </div>
          </div>

          {/* Jobs Grid */}
          <div className="flex-1">
            {filterJobs.length <= 0 ? (
              <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-12 h-12 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No opportunities found
                  </h3>
                  <p className="text-gray-600">
                    Try adjusting your filters or search criteria
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Results Header */}
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Showing{" "}
                    <span className="font-medium">{filterJobs.length}</span>{" "}
                    opportunities
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Sort by:</span>
                    <select
                      className="text-sm border border-gray-300 rounded-lg px-3 py-2 bg-white"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <option value="latest">Latest</option>
                      <option value="salary-high">Salary: High to Low</option>
                      <option value="salary-low">Salary: Low to High</option>
                      <option value="rating">Rating</option>
                    </select>
                  </div>
                </div>

                {/* Jobs Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {filterJobs.map((job) => (
                    <motion.div
                      key={job._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="transform hover:scale-105 transition-transform duration-200"
                    >
                      <Job1 tutorOpportunity={job} />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorOpportunities;
