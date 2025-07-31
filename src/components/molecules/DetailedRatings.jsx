import React from "react";
import StarRating from "@/components/molecules/StarRating";
import ApperIcon from "@/components/ApperIcon";

const DetailedRatings = ({ ratings, className = "" }) => {
  const criteria = [
    { 
      key: 'academicQuality', 
      label: 'Academic Quality', 
      icon: 'GraduationCap',
      description: 'Quality of education, curriculum, and academic programs'
    },
    { 
      key: 'campusFacilities', 
      label: 'Campus Facilities', 
      icon: 'Building2',
      description: 'Libraries, labs, sports facilities, and infrastructure'
    },
    { 
      key: 'studentLife', 
      label: 'Student Life', 
      icon: 'Users',
      description: 'Social activities, clubs, campus culture, and community'
    },
    { 
      key: 'careerServices', 
      label: 'Career Services', 
      icon: 'BriefcaseBusiness',
      description: 'Job placement, internships, and career guidance'
    },
    { 
      key: 'facultyQuality', 
      label: 'Faculty Quality', 
      icon: 'UserCheck',
      description: 'Teaching quality, expertise, and faculty support'
    }
  ];

  const averageRating = criteria.reduce((sum, criterion) => sum + ratings[criterion.key], 0) / criteria.length;

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="text-center pb-6 border-b border-white/20">
        <div className="text-2xl font-bold text-white mb-2">Overall Rating</div>
        <StarRating rating={averageRating} size={24} className="justify-center mb-2" />
        <div className="text-white/80 text-sm">Based on {criteria.length} criteria</div>
      </div>
      
      <div className="space-y-4">
        {criteria.map(criterion => (
          <div key={criterion.key} className="bg-white/5 rounded-lg p-4">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-3">
                <ApperIcon name={criterion.icon} size={20} className="text-secondary" />
                <div>
                  <div className="font-semibold text-white">{criterion.label}</div>
                  <div className="text-sm text-white/70">{criterion.description}</div>
                </div>
              </div>
              <div className="text-right">
                <StarRating rating={ratings[criterion.key]} size={16} />
                <div className="text-sm text-white/80 mt-1">
                  {ratings[criterion.key].toFixed(1)}/5.0
                </div>
              </div>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2 mt-3">
              <div 
                className="bg-secondary rounded-full h-2 transition-all duration-300"
                style={{ width: `${(ratings[criterion.key] / 5) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailedRatings;