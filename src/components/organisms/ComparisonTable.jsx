import React from "react";
import ApperIcon from "@/components/ApperIcon";
import StarRating from "@/components/molecules/StarRating";
import MultiCriteriaRating from "@/components/molecules/MultiCriteriaRating";
import Button from "@/components/atoms/Button";
import { Card, CardContent } from "@/components/atoms/Card";

const ComparisonTable = ({ universities, onClose, onRemoveUniversity }) => {
  if (!universities || universities.length === 0) {
    return null;
  }

  const criteriaLabels = {
    academicRating: "التقييم الأكاديمي",
    researchRating: "البحث العلمي", 
    facilitiesRating: "المرافق",
    teachingRating: "جودة التدريس",
    employmentRating: "التوظيف"
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-7xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <ApperIcon name="BarChart3" size={24} className="text-primary" />
            <h2 className="text-xl font-display font-semibold text-gray-900">
              مقارنة الجامعات ({universities.length})
            </h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <ApperIcon name="X" size={20} />
          </Button>
        </div>

        {/* Comparison Table */}
        <div className="overflow-auto max-h-[calc(90vh-80px)]">
          <table className="w-full">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="text-right p-4 font-medium text-gray-900 w-48">
                  المعايير
                </th>
                {universities.map((university) => (
                  <th key={university.Id} className="text-center p-4 min-w-64">
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-display font-semibold text-gray-900 text-center">
                          {university.name}
                        </h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onRemoveUniversity(university.Id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <ApperIcon name="X" size={16} />
                        </Button>
                      </div>
                      <p className="text-sm text-gray-600">{university.nameAr}</p>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <ApperIcon name="MapPin" size={12} />
                        <span>{university.location}, {university.governorate}</span>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Overall Rating */}
              <tr className="border-b border-gray-100">
                <td className="p-4 font-medium text-gray-900 bg-gray-50">
                  التقييم العام
                </td>
                {universities.map((university) => (
                  <td key={university.Id} className="p-4 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <StarRating 
                        rating={university.overallRating} 
                        className="justify-center"
                      />
                      <span className="text-lg font-semibold text-gray-900">
                        {university.overallRating}/5
                      </span>
                    </div>
                  </td>
                ))}
              </tr>

              {/* Criteria Ratings */}
              {Object.entries(criteriaLabels).map(([key, label]) => (
                <tr key={key} className="border-b border-gray-100">
                  <td className="p-4 font-medium text-gray-900 bg-gray-50">
                    {label}
                  </td>
                  {universities.map((university) => (
                    <td key={university.Id} className="p-4 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <StarRating 
                          rating={university.ratings?.[key] || 0} 
                          className="justify-center"
                        />
                        <span className="text-sm font-medium text-gray-700">
                          {university.ratings?.[key] || 0}/5
                        </span>
                      </div>
                    </td>
                  ))}
                </tr>
              ))}

              {/* Type */}
              <tr className="border-b border-gray-100">
                <td className="p-4 font-medium text-gray-900 bg-gray-50">
                  نوع الجامعة
                </td>
                {universities.map((university) => (
                  <td key={university.Id} className="p-4 text-center">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {university.type}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Programs Count */}
              <tr className="border-b border-gray-100">
                <td className="p-4 font-medium text-gray-900 bg-gray-50">
                  عدد البرامج
                </td>
                {universities.map((university) => (
                  <td key={university.Id} className="p-4 text-center">
                    <span className="text-lg font-semibold text-gray-900">
                      {university.programs?.length || 0}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Students Count */}
              <tr className="border-b border-gray-100">
                <td className="p-4 font-medium text-gray-900 bg-gray-50">
                  عدد الطلاب
                </td>
                {universities.map((university) => (
                  <td key={university.Id} className="p-4 text-center">
                    <span className="text-lg font-semibold text-gray-900">
                      {university.studentsCount?.toLocaleString() || 'غير محدد'}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Faculty Count */}
              <tr className="border-b border-gray-100">
                <td className="p-4 font-medium text-gray-900 bg-gray-50">
                  عدد أعضاء هيئة التدريس
                </td>
                {universities.map((university) => (
                  <td key={university.Id} className="p-4 text-center">
                    <span className="text-lg font-semibold text-gray-900">
                      {university.facultyCount?.toLocaleString() || 'غير محدد'}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Established Year */}
              <tr className="border-b border-gray-100">
                <td className="p-4 font-medium text-gray-900 bg-gray-50">
                  سنة التأسيس
                </td>
                {universities.map((university) => (
                  <td key={university.Id} className="p-4 text-center">
                    <span className="text-lg font-semibold text-gray-900">
                      {university.establishedYear || 'غير محدد'}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Website */}
              <tr className="border-b border-gray-100">
                <td className="p-4 font-medium text-gray-900 bg-gray-50">
                  الموقع الإلكتروني
                </td>
                {universities.map((university) => (
                  <td key={university.Id} className="p-4 text-center">
                    {university.website ? (
                      <a 
                        href={university.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 underline"
                      >
                        زيارة الموقع
                      </a>
                    ) : (
                      <span className="text-gray-400">غير متاح</span>
                    )}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <div className="text-sm text-gray-600">
            يمكنك إزالة أي جامعة من المقارنة بالضغط على علامة X بجانب اسمها
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => universities.forEach(uni => onRemoveUniversity(uni.Id))}
              className="text-red-600 border-red-200 hover:bg-red-50"
            >
              <ApperIcon name="Trash2" size={16} className="ml-2" />
              مسح الكل
            </Button>
            <Button onClick={onClose}>
              إغلاق المقارنة
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonTable;