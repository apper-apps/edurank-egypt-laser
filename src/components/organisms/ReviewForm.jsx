import React, { useState } from "react";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import { Card } from "@/components/atoms/Card";
import reviewService from "@/services/api/reviewService";
import universityService from "@/services/api/universityService";

const ReviewForm = ({ isOpen, onClose, universityId, onReviewSubmitted }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    academicQuality: 3,
    campusFacilities: 3,
    studentLife: 3,
    careerServices: 3,
    researchOpportunities: 3,
    reviewText: "",
    program: "",
    reviewerName: ""
  });

  const criteria = [
    { key: "academicQuality", label: "Academic Quality" },
    { key: "campusFacilities", label: "Campus Facilities" },
    { key: "studentLife", label: "Student Life" },
    { key: "careerServices", label: "Career Services" },
    { key: "researchOpportunities", label: "Research Opportunities" }
  ];

  const availablePrograms = universityService.getAvailablePrograms();

  const handleSliderChange = (criteriaKey, value) => {
    setFormData(prev => ({
      ...prev,
      [criteriaKey]: value
    }));
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.reviewText.trim()) {
      toast.error("Please write a review");
      return;
    }
    
    if (!formData.program) {
      toast.error("Please select your program");
      return;
    }
    
    if (!formData.reviewerName.trim()) {
      toast.error("Please enter your name");
      return;
    }

    try {
      setIsSubmitting(true);
      
      const reviewData = {
        universityId: parseInt(universityId),
        ...formData,
        ratings: {
          academicQuality: formData.academicQuality,
          campusFacilities: formData.campusFacilities,
          studentLife: formData.studentLife,
          careerServices: formData.careerServices,
          researchOpportunities: formData.researchOpportunities
        },
        overallRating: (
          formData.academicQuality + 
          formData.campusFacilities + 
          formData.studentLife + 
          formData.careerServices + 
          formData.researchOpportunities
        ) / 5,
        date: new Date().toISOString(),
        isVerified: Math.random() > 0.3 // 70% chance of being verified
      };

      await reviewService.create(reviewData);
      toast.success("Review submitted successfully!");
      
      // Reset form
      setFormData({
        academicQuality: 3,
        campusFacilities: 3,
        studentLife: 3,
        careerServices: 3,
        researchOpportunities: 3,
        reviewText: "",
        program: "",
        reviewerName: ""
      });
      
      onReviewSubmitted?.();
      onClose();
    } catch (error) {
      toast.error("Failed to submit review");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Write a Review</h2>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <ApperIcon name="X" size={20} />
          </Button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Name *
              </label>
              <Input
                value={formData.reviewerName}
                onChange={(e) => handleInputChange("reviewerName", e.target.value)}
                placeholder="Enter your name"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Program/Department *
              </label>
              <select
                value={formData.program}
                onChange={(e) => handleInputChange("program", e.target.value)}
                className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              >
                <option value="">Select your program</option>
                {availablePrograms.map((program) => (
                  <option key={program} value={program}>
                    {program}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Rating Criteria */}
          <div className="space-y-6">
            <h3 className="font-semibold text-lg text-gray-900">Rate Your Experience</h3>
            {criteria.map((criterion) => (
              <div key={criterion.key} className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-gray-700">
                    {criterion.label}
                  </label>
                  <span className="text-sm font-semibold text-primary">
                    {formData[criterion.key]}/5
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-gray-500 w-8">Poor</span>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    step="0.1"
                    value={formData[criterion.key]}
                    onChange={(e) => handleSliderChange(criterion.key, parseFloat(e.target.value))}
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    style={{
                      background: `linear-gradient(to right, #1a5f7a 0%, #1a5f7a ${(formData[criterion.key] - 1) * 25}%, #e5e5e5 ${(formData[criterion.key] - 1) * 25}%, #e5e5e5 100%)`
                    }}
                  />
                  <span className="text-xs text-gray-500 w-10">Excellent</span>
                </div>
                <div className="flex justify-center">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <ApperIcon
                        key={star}
                        name="Star"
                        size={16}
                        className={
                          formData[criterion.key] >= star
                            ? "text-secondary fill-secondary"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Review Text */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Detailed Review *
            </label>
            <Input
              as="textarea"
              rows={6}
              value={formData.reviewText}
              onChange={(e) => handleInputChange("reviewText", e.target.value)}
              placeholder="Share your experience at this university. What did you like? What could be improved? Your insights will help other students make informed decisions."
              className="resize-none"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.reviewText.length}/500 characters
            </p>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <ApperIcon name="Loader2" size={16} className="animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <ApperIcon name="Send" size={16} />
                  Submit Review
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;