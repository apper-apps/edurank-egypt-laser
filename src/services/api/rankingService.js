import rankingsData from "@/services/mockData/rankings.json";
import universityService from "@/services/api/universityService";

class RankingService {
  constructor() {
    this.rankings = [...rankingsData];
  }

  async delay(ms = 300) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

async getRankings() {
    await this.delay();
    const universities = await universityService.getAll();
    
    const rankingsWithUniversities = this.rankings
      .map(ranking => {
        const university = universities.find(u => u.Id === ranking.universityId);
        // Simulate previous rank for position change indicators
        const previousRank = ranking.rank + Math.floor(Math.random() * 3) - 1;
        return {
          ...ranking,
          university: university || null,
          previousRank: previousRank > 0 ? previousRank : null
        };
      })
      .filter(ranking => ranking.university)
      .sort((a, b) => a.rank - b.rank);
    
    return rankingsWithUniversities;
  }

  async getRankingByUniversityId(universityId) {
    await this.delay();
    const ranking = this.rankings.find(r => r.universityId === parseInt(universityId));
    if (!ranking) {
      throw new Error(`Ranking for university ID ${universityId} not found`);
    }
    return { ...ranking };
  }

  async updateRanking(universityId, rankingData) {
    await this.delay();
    const index = this.rankings.findIndex(r => r.universityId === parseInt(universityId));
    if (index === -1) {
      // Create new ranking
      const newRanking = {
        Id: Math.max(...this.rankings.map(r => r.Id)) + 1,
        universityId: parseInt(universityId),
        year: 2024,
        ...rankingData
      };
      this.rankings.push(newRanking);
      return { ...newRanking };
    } else {
      // Update existing ranking
      this.rankings[index] = { ...this.rankings[index], ...rankingData };
      return { ...this.rankings[index] };
    }
  }

  async getTopUniversities(limit = 5) {
    await this.delay();
    const rankings = await this.getRankings();
    return rankings.slice(0, limit);
  }
}

export default new RankingService();