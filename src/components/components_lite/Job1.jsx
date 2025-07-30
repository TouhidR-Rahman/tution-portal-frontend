import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import PropTypes from "prop-types";

const StarRating = ({ rating, totalRatings }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(
        <span key={i} className="text-yellow-400">
          ★
        </span>,
      );
    } else if (i === fullStars && hasHalfStar) {
      stars.push(
        <span key={i} className="text-yellow-400">
          ⭐
        </span>,
      );
    } else {
      stars.push(
        <span key={i} className="text-gray-300">
          ★
        </span>,
      );
    }
  }

  return (
    <div className="flex items-center gap-1">
      <div className="flex">{stars}</div>
      <span className="text-sm text-gray-600">
        {rating.toFixed(1)} ({totalRatings || 0})
      </span>
    </div>
  );
};

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
  totalRatings: PropTypes.number,
};

const Job1 = ({ tutorOpportunity }) => {
  const navigate = useNavigate();
  // ...existing code...

  const daysAgoFunction = mongodbTime => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-300 overflow-hidden">
      {/* Gradient Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-transparent to-gray-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Content */}
      <div className="relative p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Avatar className="h-12 w-12 ring-2 ring-gray-200 group-hover:ring-gray-300 transition-all duration-300">
                <AvatarImage
                  src={tutorOpportunity?.tutionCenter?.logo}
                  alt="company logo"
                  className="object-cover"
                />
              </Avatar>
              {tutorOpportunity?.tutionCenter?.averageRating > 0 && (
                <div className="absolute -top-1 -right-1 bg-yellow-400 text-white text-xs px-1.5 py-0.5 rounded-full font-medium">
                  {tutorOpportunity.tutionCenter.averageRating.toFixed(1)}
                </div>
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 group-hover:text-gray-700 transition-colors duration-300">
                {tutorOpportunity?.tutionCenter?.name}
              </h3>
              <p className="text-sm text-gray-500">Bangladesh</p>
              {tutorOpportunity?.tutionCenter?.averageRating > 0 && (
                <div className="flex items-center mt-1">
                  <StarRating
                    rating={tutorOpportunity.tutionCenter.averageRating}
                    totalRatings={tutorOpportunity.tutionCenter.totalRatings}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="text-right">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              {daysAgoFunction(tutorOpportunity?.createdAt) === 0
                ? "Today"
                : `${daysAgoFunction(tutorOpportunity?.createdAt)} days ago`}
            </span>
          </div>
        </div>

        {/* Job Details */}
        <div className="space-y-3">
          <div>
            <h2 className="text-lg font-bold text-gray-900 group-hover:text-gray-700 transition-colors duration-300">
              {tutorOpportunity?.title}
            </h2>
            <div className="mt-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800">
                📚 {tutorOpportunity?.tutionType}
              </span>
            </div>
          </div>

          {/* Requirements */}
          {tutorOpportunity?.requirements &&
            tutorOpportunity.requirements.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-start space-x-2">
                  <span className="text-sm font-medium text-gray-700">
                    📋 Requirements:
                  </span>
                  <span className="text-sm text-gray-600 flex-1">
                    {Array.isArray(tutorOpportunity.requirements)
                      ? tutorOpportunity.requirements.join(", ").trim()
                      : tutorOpportunity.requirements}
                  </span>
                </div>
              </div>
            )}

          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-red-100 to-red-200 text-red-800">
              📅{" "}
              {Array.isArray(tutorOpportunity?.daysAvailable)
                ? tutorOpportunity.daysAvailable.join(", ")
                : ""}
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800">
              💰 {tutorOpportunity?.salary} BDT/Month
            </span>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6 pt-4 border-t border-gray-100">
          <Button
            onClick={() => {
              if (tutorOpportunity?._id) {
                navigate(`/description/${tutorOpportunity._id}`);
              } else {
                alert("This job is missing an ID and cannot be viewed.");
              }
            }}
            className="w-full bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
            View Details
            <svg
              className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
};

Job1.propTypes = {
  tutorOpportunity: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    tutionType: PropTypes.string.isRequired,
    requirements: PropTypes.arrayOf(PropTypes.string),
    salary: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    daysAvailable: PropTypes.arrayOf(PropTypes.string).isRequired,
    tutionCenter: PropTypes.shape({
      name: PropTypes.string.isRequired,
      logo: PropTypes.string.isRequired,
      averageRating: PropTypes.number,
      totalRatings: PropTypes.number,
    }).isRequired,
  }).isRequired,
};

export default Job1;
