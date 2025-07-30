import PropTypes from "prop-types";

const TutorOpportunityCards = ({ tutorOpportunity }) => {
  return (
    <div className="card">
      <h2>{tutorOpportunity.title}</h2>
      <p>{tutorOpportunity.description}</p>
      <p>Location: {tutorOpportunity.location}</p>
      <p>Experience Level: {tutorOpportunity.experienceLevel} years</p>
    </div>
  );
};

TutorOpportunityCards.propTypes = {
  tutorOpportunity: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    experienceLevel: PropTypes.number.isRequired,
  }).isRequired,
};

export default TutorOpportunityCards;
