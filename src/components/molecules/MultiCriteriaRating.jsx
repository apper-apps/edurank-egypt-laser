import React from "react";
import StarRating from "@/components/molecules/StarRating";

const MultiCriteriaRating = ({ ratings, compact = true, className = "" }) => {
  const criteria = [
    { key: 'academicQuality', label: 'Academic', shortLabel: 'Acad' },
    { key: 'campusFacilities', label: 'Facilities', shortLabel: 'Fac' },
    { key: 'studentLife', label: 'Student Life', shortLabel: 'Life' },
    { key: 'careerServices', label: 'Career Services', shortLabel: 'Career' },
    { key: 'facultyQuality', label: 'Faculty', shortLabel: 'Faculty' }
  ];

  if (compact) {
    return (
      <div className={`grid grid-cols-5 gap-2 ${className}`}>
        {criteria.map(criterion => (
          <div key={criterion.key} className="text-center">
            <div className="text-xs text-gray-500 mb-1">{criterion.shortLabel}</div>
            <StarRating 
              rating={ratings[criterion.key]} 
              size={12} 
              className="justify-center"
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {criteria.map(criterion => (
        <div key={criterion.key} className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">{criterion.label}</span>
          <StarRating rating={ratings[criterion.key]} size={16} />
        </div>
      ))}
    </div>
  );
};

export default MultiCriteriaRating;