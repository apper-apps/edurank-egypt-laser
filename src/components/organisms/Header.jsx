import React from "react";
import ApperIcon from "@/components/ApperIcon";

const Header = ({ title, breadcrumbs }) => {
  return (
    <header className="bg-surface border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-gray-900">
            {title}
          </h1>
          {breadcrumbs && (
            <div className="flex items-center gap-2 mt-1">
              {breadcrumbs.map((breadcrumb, index) => (
                <React.Fragment key={index}>
                  <span className="text-sm text-gray-500">
                    {breadcrumb}
                  </span>
                  {index < breadcrumbs.length - 1 && (
                    <ApperIcon name="ChevronRight" size={14} className="text-gray-400" />
                  )}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <ApperIcon name="GraduationCap" size={24} className="text-primary" />
            <span className="font-display font-bold text-lg text-primary">
              EduRank Egypt
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;