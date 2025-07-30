import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import StarRating from "../ui/StarRating";
import { Building2 } from "lucide-react";

const TutorOpportunityCards = ({ tutorOpportunity }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/description/${tutorOpportunity._id}`)}
      className="p-4 border rounded-md shadow-md cursor-pointer transition-transform duration-200 hover:shadow-lg hover:scale-105">
      {/* Header with company info */}
      <div className="flex items-center gap-3 mb-3">
        {tutorOpportunity.tutionCenter?.logo ? (
          <img
            src={tutorOpportunity.tutionCenter.logo}
            alt={tutorOpportunity.tutionCenter.name}
            className="w-10 h-10 rounded-lg object-cover"
          />
        ) : (
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Building2 className="w-5 h-5 text-white" />
          </div>
        )}
        <div>
          <h3 className="font-semibold text-sm">
            {tutorOpportunity.tutionCenter?.name}
          </h3>
          <div className="flex items-center gap-2">
            <StarRating
              rating={tutorOpportunity.tutionCenter?.averageRating || 0}
              size="w-4 h-4"
            />
            <span className="text-xs text-gray-500">
              ({tutorOpportunity.tutionCenter?.totalRatings || 0} reviews)
            </span>
          </div>
        </div>
      </div>

      <h2 className="text-lg font-bold">{tutorOpportunity.title}</h2>
      <p className="text-gray-600 mb-3">{tutorOpportunity.description}</p>

      <div className="flex gap-2 mt-2">
        <Badge className={"text-[#FA4F09] font-bold"} variant={"ghost"}>
          {tutorOpportunity.salary} BDT/month
        </Badge>
        <Badge className={"text-[#6B3AC2] font-bold"} variant={"ghost"}>
          {tutorOpportunity.location}
        </Badge>
        <Badge className={"text-black font-bold"} variant={"ghost"}>
          {tutorOpportunity.tutionType.join(", ")}
        </Badge>
      </div>
    </div>
  );
};

TutorOpportunityCards.propTypes = {
  tutorOpportunity: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    salary: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    location: PropTypes.string.isRequired,
    tutionType: PropTypes.arrayOf(PropTypes.string).isRequired,
    tutionCenter: PropTypes.shape({
      name: PropTypes.string,
      logo: PropTypes.string,
      averageRating: PropTypes.number,
      totalRatings: PropTypes.number,
    }),
  }).isRequired,
};

export default TutorOpportunityCards;
