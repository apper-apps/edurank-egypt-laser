import React from "react";
import ApperIcon from "@/components/ApperIcon";

const StarRating = ({ rating, maxRating = 5, size = 16, className = "" }) => {
  const stars = [];
  
  for (let i = 1; i <= maxRating; i++) {
    const isFilled = i <= Math.floor(rating);
    const isHalfFilled = i === Math.floor(rating) + 1 && rating % 1 >= 0.5;
    
    stars.push(
      <div key={i} className="relative">
        <ApperIcon 
          name="Star" 
          size={size} 
          className={`${isFilled || isHalfFilled ? "star-filled" : "star-empty"} transition-colors duration-150`}
          fill={isFilled || isHalfFilled ? "currentColor" : "none"}
        />
        {isHalfFilled && (
          <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
            <ApperIcon 
              name="Star" 
              size={size} 
              className="star-filled" 
              fill="currentColor"
            />
          </div>
        )}
      </div>
    );
  }
  
  return (
    <div className={`star-rating ${className}`}>
      {stars}
      <span className="ml-2 text-sm text-gray-600 font-medium">
        {rating.toFixed(1)}
      </span>
    </div>
  );
};

export default StarRating;