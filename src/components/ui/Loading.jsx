import React from "react";

const Loading = ({ type = "grid" }) => {
  if (type === "grid") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="bg-surface rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="h-32 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse" />
            <div className="p-6">
              <div className="h-6 bg-gray-200 rounded animate-pulse mb-2" />
              <div className="h-4 bg-gray-200 rounded animate-pulse mb-4 w-3/4" />
              <div className="h-4 bg-gray-200 rounded animate-pulse mb-2 w-1/2" />
              <div className="h-4 bg-gray-200 rounded animate-pulse mb-4 w-2/3" />
              <div className="flex justify-between items-center">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-24" />
                <div className="h-8 bg-gray-200 rounded animate-pulse w-16" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  if (type === "table") {
    return (
      <div className="bg-surface rounded-lg shadow-sm border border-gray-100">
        <div className="p-6">
          <div className="space-y-4">
            <div className="h-12 bg-gray-200 rounded animate-pulse" />
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 border-b border-gray-100">
                <div className="h-8 w-12 bg-gray-200 rounded animate-pulse" />
                <div className="flex-1 h-6 bg-gray-200 rounded animate-pulse" />
                <div className="h-6 w-20 bg-gray-200 rounded animate-pulse" />
                <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex items-center justify-center p-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );
};

export default Loading;