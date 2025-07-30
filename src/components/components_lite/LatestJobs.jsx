import Job1 from "./Job1";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

const LatestTutorOpportunities = ({
  tutorOpportunities: propTutorOpportunities,
}) => {
  // Use prop if provided, else fallback to Redux state
  const reduxTutorOpportunities = useSelector(
    state =>
      state.tutors?.allOpportunities ||
      state.tutorOpportunities?.allTutorOpportunities ||
      [],
  );
  const tutorOpportunities = propTutorOpportunities || reduxTutorOpportunities;

  console.log(
    "LatestTutorOpportunities: tutorOpportunities:",
    tutorOpportunities,
  );
  tutorOpportunities.forEach((job, idx) => {
    console.log(`Job[${idx}]`, job);
  });

  return (
    <div className="max-w-7xl mx-auto my-20">
      <h2 className="text-4xl font-bold">
        <span className="text-[#6A38C2]">Latest & Top </span>Tutor Opportunities
      </h2>

      {/* Tutor Opportunity Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
        {tutorOpportunities.length === 0 ? (
          <span>No Tutor Opportunities Found</span>
        ) : (
          (() => {
            const validOpportunities = tutorOpportunities.filter(
              opportunity =>
                opportunity && opportunity._id && opportunity.location,
            );
            if (validOpportunities.length === 0) {
              return (
                <span>
                  All jobs are missing required fields (like <b>location</b>).
                  Check your data source.
                </span>
              );
            }
            return validOpportunities
              .slice(0, 6)
              .map(opportunity => (
                <Job1 key={opportunity._id} tutorOpportunity={opportunity} />
              ));
          })()
        )}
      </div>
    </div>
  );
};
LatestTutorOpportunities.propTypes = {
  tutorOpportunities: PropTypes.array,
};

export default LatestTutorOpportunities;
