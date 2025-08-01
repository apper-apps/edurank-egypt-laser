import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import universityService from "@/services/api/universityService";
import reviewService from "@/services/api/reviewService";
import ApperIcon from "@/components/ApperIcon";
import StarRating from "@/components/molecules/StarRating";
import DetailedRatings from "@/components/molecules/DetailedRatings";
import MultiCriteriaRating from "@/components/molecules/MultiCriteriaRating";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Universities from "@/components/pages/Universities";
import Button from "@/components/atoms/Button";
import { Card } from "@/components/atoms/Card";
import ReviewForm from "@/components/organisms/ReviewForm";
const UniversityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
const [university, setUniversity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reviews, setReviews] = useState([]);
  const [reviewStats, setReviewStats] = useState(null);
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const [reviewsLoading, setReviewsLoading] = useState(false);

  const loadUniversity = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await universityService.getDetailedById(id);
      setUniversity(data);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load university details");
    } finally {
      setLoading(false);
    }
  };

  const loadReviews = async () => {
    try {
      setReviewsLoading(true);
      const [reviewsData, statsData] = await Promise.all([
        reviewService.getByUniversityId(id),
        reviewService.getUniversityStats(id)
      ]);
      setReviews(reviewsData);
      setReviewStats(statsData);
    } catch (err) {
      console.error("Failed to load reviews:", err);
    } finally {
      setReviewsLoading(false);
    }
  };

  useEffect(() => {
    loadUniversity();
    loadReviews();
  }, [id]);

  const handleBack = () => {
    navigate("/universities");
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={loadUniversity} />;
  }

  if (!university) {
    return <Error message="University not found" onRetry={handleBack} />;
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary to-primary/80 rounded-lg p-8 text-white relative overflow-hidden">
        <div className="absolute top-4 left-4">
          <Button 
            variant="outline" 
            onClick={handleBack}
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <ApperIcon name="ArrowLeft" size={16} />
            Back to Universities
          </Button>
        </div>
        
        <div className="mt-12 flex flex-col lg:flex-row items-start gap-8">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-20 h-20 bg-white/10 rounded-lg flex items-center justify-center">
                <ApperIcon name="GraduationCap" size={40} className="text-white/80" />
              </div>
              <div>
                <h1 className="font-display text-4xl font-bold mb-2">
                  {university.name}
                </h1>
                <p className="text-xl text-white/90 mb-2">{university.nameAr}</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <ApperIcon name="MapPin" size={16} className="text-white/70" />
                    <span className="text-white/90">{university.location}, {university.governorate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ApperIcon name="Calendar" size={16} className="text-white/70" />
                    <span className="text-white/90">Est. {university.establishedYear}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <p className="text-lg text-white/90 leading-relaxed max-w-3xl">
              {university.description}
            </p>
          </div>
          
<div className="bg-white/10 rounded-lg p-6 min-w-[320px]">
            <div className="text-center mb-6">
              <div className="text-3xl font-bold text-secondary mb-2">
                {reviewStats?.averageRating || university.overallScore}
              </div>
              <div className="text-white/80 mb-3">
                {reviewStats?.totalReviews > 0 ? `Based on ${reviewStats.totalReviews} reviews` : 'Overall Score'}
              </div>
              {reviewStats?.totalReviews > 0 && (
                <div className="flex justify-center">
                  <StarRating rating={reviewStats.averageRating} size={16} />
                </div>
              )}
            </div>
            <DetailedRatings ratings={reviewStats?.criteriaAverages || university.ratings} />
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-white/70">Students</span>
                <span className="text-white font-semibold">
                  {university.studentCount.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70">Type</span>
                <span className="text-white font-semibold capitalize">
                  {university.type}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70">Faculty</span>
                <span className="text-white font-semibold">
                  {university.statistics.facultyCount.toLocaleString()}
                </span>
              </div>
            </div>
            
            <Button
              onClick={() => setIsReviewFormOpen(true)}
              className="w-full bg-secondary hover:bg-secondary/90 text-white"
            >
              <ApperIcon name="PenTool" size={16} />
              Write Review
            </Button>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Academic Programs */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <ApperIcon name="BookOpen" size={20} className="text-primary" />
              </div>
              <h2 className="font-display text-2xl font-semibold text-gray-900">
                Academic Programs
              </h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {university.programs.map((program, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <ApperIcon name="BookOpen" size={16} className="text-primary" />
                  <span className="text-gray-700">{program}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Campus Facilities */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <ApperIcon name="Building" size={20} className="text-primary" />
              </div>
              <h2 className="font-display text-2xl font-semibold text-gray-900">
                Campus Facilities
              </h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {university.facilities.map((facility, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <ApperIcon name="MapPin" size={16} className="text-primary" />
                  <span className="text-gray-700">{facility}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Achievements */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <ApperIcon name="Award" size={20} className="text-primary" />
              </div>
              <h2 className="font-display text-2xl font-semibold text-gray-900">
                Achievements & Recognition
              </h2>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              {university.achievements.map((achievement, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border-l-4 border-primary">
                  <ApperIcon name="Trophy" size={16} className="text-primary" />
                  <span className="text-gray-700">{achievement}</span>
                </div>
              ))}
            </div>
</Card>

          {/* Student Reviews */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-primary flex items-center gap-2">
                <ApperIcon name="MessageSquare" size={24} />
                Student Reviews ({reviewStats?.totalReviews || 0})
              </h2>
              <Button
                onClick={() => setIsReviewFormOpen(true)}
                variant="outline"
                size="sm"
              >
                <ApperIcon name="PenTool" size={16} />
                Write Review
              </Button>
            </div>
            
            {reviewsLoading ? (
              <div className="flex justify-center py-8">
                <Loading />
              </div>
            ) : reviews.length > 0 ? (
<div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.Id} className="border-b border-gray-100 last:border-b-0 pb-6 last:pb-0">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <ApperIcon name="User" size={16} className="text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-900">{review.reviewerName}</span>
                            {review.isVerified && (
                              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                Verified
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-gray-500">
                            {review.program} • {new Date(review.date).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <StarRating rating={review.overallRating} size={14} />
                        <span className="text-sm font-semibold text-gray-700">
                          {review.overallRating}/5
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{review.reviewText}</p>
                  </div>
                ))}
                
                {reviews.length > 3 && (
                  <div className="text-center pt-4">
                    <Button variant="outline">
                      View All {reviews.length} Reviews
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <ApperIcon name="MessageSquare" size={48} className="text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Reviews Yet</h3>
                <p className="text-gray-500 mb-4">Be the first to share your experience at this university!</p>
                <Button onClick={() => setIsReviewFormOpen(true)}>
                  <ApperIcon name="PenTool" size={16} />
                  Write First Review
                </Button>
              </div>
            )}
          </Card>

          {/* Detailed Ratings Breakdown */}
          <Card className="p-6">
            <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
              <ApperIcon name="BarChart3" size={24} />
              Rating Breakdown
            </h2>
            <MultiCriteriaRating ratings={reviewStats?.criteriaAverages || university.ratings} compact={false} />
          </Card>
        </div>
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Key Statistics */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <ApperIcon name="BarChart3" size={20} className="text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold text-gray-900">
                Key Statistics
              </h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Students</span>
                <span className="font-semibold text-gray-900">
                  {university.statistics.studentCount.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Faculty</span>
                <span className="font-semibold text-gray-900">
                  {university.statistics.facultyCount.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">International Students</span>
                <span className="font-semibold text-gray-900">
                  {university.statistics.internationalStudents.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Graduation Rate</span>
                <span className="font-semibold text-gray-900">
                  {university.statistics.graduationRate}%
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Employment Rate</span>
                <span className="font-semibold text-gray-900">
                  {university.statistics.employmentRate}%
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Research Projects</span>
                <span className="font-semibold text-gray-900">
                  {university.statistics.researchProjects}
                </span>
              </div>
            </div>
          </Card>

          {/* Contact Information */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <ApperIcon name="Phone" size={20} className="text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold text-gray-900">
                Contact Information
              </h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <ApperIcon name="Phone" size={16} className="text-gray-500 mt-1" />
                <div>
                  <div className="text-sm text-gray-500">Phone</div>
                  <div className="font-medium text-gray-900">{university.contact.phone}</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <ApperIcon name="Mail" size={16} className="text-gray-500 mt-1" />
                <div>
                  <div className="text-sm text-gray-500">Email</div>
                  <div className="font-medium text-gray-900">{university.contact.email}</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <ApperIcon name="Globe" size={16} className="text-gray-500 mt-1" />
                <div>
                  <div className="text-sm text-gray-500">Website</div>
                  <div className="font-medium text-primary">{university.contact.website}</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <ApperIcon name="MapPin" size={16} className="text-gray-500 mt-1" />
                <div>
                  <div className="text-sm text-gray-500">Address</div>
                  <div className="font-medium text-gray-900">{university.contact.address}</div>
                </div>
              </div>
            </div>
</Card>
        </div>
      </div>
      
      {/* Review Form Modal */}
      <ReviewForm
        isOpen={isReviewFormOpen}
        onClose={() => setIsReviewFormOpen(false)}
        universityId={id}
        onReviewSubmitted={() => {
          loadReviews();
          toast.success("Thank you for your review!");
        }}
      />
    </div>
  );
};

export default UniversityDetail;