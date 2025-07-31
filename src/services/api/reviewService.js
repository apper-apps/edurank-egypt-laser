// Mock review data
const mockReviews = [
  {
    Id: 1,
    universityId: 1,
    reviewerName: "Ahmed Hassan",
    program: "Engineering",
    reviewText: "Excellent university with outstanding faculty and modern facilities. The engineering program is comprehensive and well-structured.",
    ratings: {
      academicQuality: 4.5,
      campusFacilities: 4.2,
      studentLife: 4.0,
      careerServices: 3.8,
      researchOpportunities: 4.6
    },
    overallRating: 4.2,
    date: "2024-01-15T10:30:00Z",
    isVerified: true
  },
  {
    Id: 2,
    universityId: 1,
    reviewerName: "Fatma Ali",
    program: "Medicine",
    reviewText: "Great medical program with hands-on experience. However, the campus could use more recreational facilities.",
    ratings: {
      academicQuality: 4.8,
      campusFacilities: 3.5,
      studentLife: 3.2,
      careerServices: 4.0,
      researchOpportunities: 4.5
    },
    overallRating: 4.0,
    date: "2024-01-10T14:22:00Z",
    isVerified: true
  },
  {
    Id: 3,
    universityId: 2,
    reviewerName: "Omar Mohamed",
    program: "Business Administration",
    reviewText: "Alexandria University offers a vibrant campus life and excellent business program. The location near the sea is a plus!",
    ratings: {
      academicQuality: 4.0,
      campusFacilities: 4.3,
      studentLife: 4.7,
      careerServices: 3.9,
      researchOpportunities: 3.8
    },
    overallRating: 4.1,
    date: "2024-01-08T09:15:00Z",
    isVerified: false
  },
  {
    Id: 4,
    universityId: 3,
    reviewerName: "Sarah Johnson",
    program: "Computer Science",
    reviewText: "AUC provides world-class education in a beautiful campus. The international environment and English instruction are major advantages.",
    ratings: {
      academicQuality: 4.9,
      campusFacilities: 4.8,
      studentLife: 4.5,
      careerServices: 4.7,
      researchOpportunities: 4.6
    },
    overallRating: 4.7,
    date: "2024-01-05T16:45:00Z",
    isVerified: true
  }
];

class ReviewService {
  constructor() {
    this.reviews = [...mockReviews];
    this.nextId = Math.max(...this.reviews.map(r => r.Id)) + 1;
  }

  async delay(ms = 300) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getAll() {
    await this.delay();
    return [...this.reviews];
  }

  async getById(id) {
    await this.delay();
    const review = this.reviews.find(r => r.Id === parseInt(id));
    if (!review) {
      throw new Error(`Review with ID ${id} not found`);
    }
    return { ...review };
  }

  async getByUniversityId(universityId) {
    await this.delay();
    const universityReviews = this.reviews.filter(r => r.universityId === parseInt(universityId));
    return universityReviews.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  async create(reviewData) {
    await this.delay(500); // Longer delay for create operation
    const newReview = {
      Id: this.nextId++,
      ...reviewData,
      date: reviewData.date || new Date().toISOString()
    };
    this.reviews.push(newReview);
    return { ...newReview };
  }

  async update(id, reviewData) {
    await this.delay();
    const index = this.reviews.findIndex(r => r.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Review with ID ${id} not found`);
    }
    this.reviews[index] = { 
      ...this.reviews[index], 
      ...reviewData,
      Id: parseInt(id) // Preserve the ID
    };
    return { ...this.reviews[index] };
  }

  async delete(id) {
    await this.delay();
    const index = this.reviews.findIndex(r => r.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Review with ID ${id} not found`);
    }
    const deletedReview = this.reviews.splice(index, 1)[0];
    return { ...deletedReview };
  }

  async getUniversityStats(universityId) {
    await this.delay();
    const universityReviews = this.reviews.filter(r => r.universityId === parseInt(universityId));
    
    if (universityReviews.length === 0) {
      return {
        totalReviews: 0,
        averageRating: 0,
        ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
        criteriaAverages: {
          academicQuality: 0,
          campusFacilities: 0,
          studentLife: 0,
          careerServices: 0,
          researchOpportunities: 0
        }
      };
    }

    const totalReviews = universityReviews.length;
    const averageRating = universityReviews.reduce((sum, review) => sum + review.overallRating, 0) / totalReviews;
    
    // Rating distribution
    const ratingDistribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    universityReviews.forEach(review => {
      const roundedRating = Math.round(review.overallRating);
      ratingDistribution[roundedRating]++;
    });

    // Criteria averages
    const criteriaAverages = {
      academicQuality: 0,
      campusFacilities: 0,
      studentLife: 0,
      careerServices: 0,
      researchOpportunities: 0
    };

    Object.keys(criteriaAverages).forEach(criteria => {
      criteriaAverages[criteria] = universityReviews.reduce((sum, review) => 
        sum + (review.ratings[criteria] || 0), 0) / totalReviews;
    });

    return {
      totalReviews,
      averageRating: Math.round(averageRating * 10) / 10,
      ratingDistribution,
      criteriaAverages
    };
  }

  async searchReviews(query) {
    await this.delay();
    const searchTerm = query.toLowerCase();
    return this.reviews.filter(review =>
      review.reviewText.toLowerCase().includes(searchTerm) ||
      review.program.toLowerCase().includes(searchTerm) ||
      review.reviewerName.toLowerCase().includes(searchTerm)
    );
  }

  async filterByProgram(program) {
    await this.delay();
    if (!program) return [...this.reviews];
    return this.reviews.filter(review => 
      review.program.toLowerCase() === program.toLowerCase()
    );
  }

  async filterByRating(minRating) {
    await this.delay();
    return this.reviews.filter(review => review.overallRating >= minRating);
  }
}

export default new ReviewService();