import { Star } from "lucide-react";
import { useState } from "react";
import PropTypes from "prop-types";

const StarRating = ({
  rating = 0,
  onRatingChange = null,
  interactive = false,
  size = "w-5 h-5",
}) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleStarClick = value => {
    if (interactive && onRatingChange) {
      onRatingChange(value);
    }
  };

  const handleStarHover = value => {
    if (interactive) {
      setHoverRating(value);
    }
  };

  const handleStarLeave = () => {
    if (interactive) {
      setHoverRating(0);
    }
  };

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map(star => {
        const filled = (hoverRating || rating) >= star;

        return (
          <Star
            key={star}
            className={`${size} ${
              filled ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
            } ${
              interactive ? "cursor-pointer hover:scale-110" : ""
            } transition-all duration-200`}
            onClick={() => handleStarClick(star)}
            onMouseEnter={() => handleStarHover(star)}
            onMouseLeave={handleStarLeave}
          />
        );
      })}
    </div>
  );
};

StarRating.propTypes = {
  rating: PropTypes.number,
  onRatingChange: PropTypes.func,
  interactive: PropTypes.bool,
  size: PropTypes.string,
};

export default StarRating;
