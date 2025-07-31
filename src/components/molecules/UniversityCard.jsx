import React from "react";
import ApperIcon from "@/components/ApperIcon";
import StarRating from "@/components/molecules/StarRating";
import MultiCriteriaRating from "@/components/molecules/MultiCriteriaRating";
import { Card, CardContent } from "@/components/atoms/Card";
const UniversityCard = ({ university, onClick, isSelected, onSelectionChange, showCheckbox = false }) => {
  const handleCardClick = () => {
    if (!showCheckbox) {
      onClick(university.Id);
    }
  };

  const handleCheckboxChange = (e) => {
    e.stopPropagation();
    onSelectionChange(university.Id, e.target.checked);
  };

  return (
    <Card className="university-card cursor-pointer" onClick={() => onClick(university.Id)}>
      <CardContent className="p-0">
        <div className="h-32 bg-gradient-to-br from-primary to-primary/80 rounded-t-lg flex items-center justify-center">
          <ApperIcon name="GraduationCap" size={48} className="text-white/80" />
        </div>
        
        <div className="p-6">
<div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="font-display font-semibold text-lg text-gray-900 mb-1 leading-tight">
                {university.name}
              </h3>
              <p className="text-sm text-gray-600 mb-2">{university.nameAr}</p>
            </div>
            {showCheckbox && (
              <div className="flex items-center ml-3">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={handleCheckboxChange}
                  className="w-5 h-5 text-primary bg-white border-2 border-gray-300 rounded focus:ring-primary focus:ring-2 cursor-pointer"
                />
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2 mb-3">
            <ApperIcon name="MapPin" size={14} className="text-gray-500" />
            <span className="text-sm text-gray-600">
              {university.location}, {university.governorate}
            </span>
          </div>
          
          <div className="flex items-center gap-2 mb-4">
            <ApperIcon name="Calendar" size={14} className="text-gray-500" />
            <span className="text-sm text-gray-600">
              Est. {university.establishedYear}
            </span>
          </div>
          
<div className="space-y-4">
            <MultiCriteriaRating ratings={university.ratings} compact={true} />
            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <div className="text-sm text-gray-500">Overall Score</div>
              <div className="font-bold text-lg text-primary">
                {university.overallScore}
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Students</span>
              <span className="font-medium text-gray-900">
                {university.studentCount.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm mt-1">
              <span className="text-gray-500">Type</span>
              <span className="font-medium text-gray-900 capitalize">
                {university.type}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UniversityCard;