import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import rankingService from "@/services/api/rankingService";
import StarRating from "@/components/molecules/StarRating";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";

const Rankings = () => {
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState("rank");
  const [sortOrder, setSortOrder] = useState("asc");

  const loadRankings = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await rankingService.getRankings();
      setRankings(data);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load rankings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRankings();
  }, []);

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const sortedRankings = [...rankings].sort((a, b) => {
    let aValue, bValue;
    
    switch (sortBy) {
      case "name":
        aValue = a.university.name;
        bValue = b.university.name;
        break;
      case "academicScore":
        aValue = a.academicScore;
        bValue = b.academicScore;
        break;
      case "researchScore":
        aValue = a.researchScore;
        bValue = b.researchScore;
        break;
      case "facilitiesScore":
        aValue = a.facilitiesScore;
        bValue = b.facilitiesScore;
        break;
      case "overallScore":
        aValue = a.university.overallScore;
        bValue = b.university.overallScore;
        break;
      default:
        aValue = a.rank;
        bValue = b.rank;
    }
    
    if (typeof aValue === "string") {
      return sortOrder === "asc" 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
  });

  const getSortIcon = (column) => {
    if (sortBy !== column) {
      return <ApperIcon name="ArrowUpDown" size={14} className="text-gray-400" />;
    }
    return sortOrder === "asc" 
      ? <ApperIcon name="ArrowUp" size={14} className="text-primary" />
      : <ApperIcon name="ArrowDown" size={14} className="text-primary" />;
  };

  const getRankMedal = (rank) => {
    switch (rank) {
      case 1:
        return <ApperIcon name="Medal" size={20} className="text-yellow-500" />;
      case 2:
        return <ApperIcon name="Medal" size={20} className="text-gray-400" />;
      case 3:
        return <ApperIcon name="Medal" size={20} className="text-orange-500" />;
      default:
        return <span className="text-lg font-bold text-primary">#{rank}</span>;
    }
  };

  if (loading) {
    return <Loading type="table" />;
  }

  if (error) {
    return <Error message={error} onRetry={loadRankings} />;
  }

  if (rankings.length === 0) {
    return (
      <Empty
        title="No rankings available"
        description="Rankings data is not available at the moment."
        icon="Trophy"
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-secondary to-secondary/80 rounded-lg p-8 text-white">
        <h1 className="font-display text-3xl font-bold mb-4">
          University Rankings 2024
        </h1>
        <p className="text-lg text-white/90 max-w-2xl">
          Comprehensive rankings of Egyptian universities based on academic performance, 
          research output, and facility quality. Rankings are updated annually.
        </p>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-2xl font-bold text-white">
              {rankings.length}
            </div>
            <div className="text-sm text-white/80">Ranked Universities</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-2xl font-bold text-white">
              {Math.max(...rankings.map(r => r.academicScore)).toFixed(1)}
            </div>
            <div className="text-sm text-white/80">Highest Academic Score</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-2xl font-bold text-white">
              2024
            </div>
            <div className="text-sm text-white/80">Current Year</div>
          </div>
        </div>
      </div>

      {/* Rankings Table */}
      <div className="bg-surface rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="font-display text-xl font-semibold text-gray-900">
            Official Rankings
          </h2>
          <p className="text-gray-600 mt-1">
            Click on column headers to sort the rankings
          </p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort("rank")}
                >
                  <div className="flex items-center gap-2">
                    Rank
                    {getSortIcon("rank")}
                  </div>
                </th>
                <th 
                  className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort("name")}
                >
                  <div className="flex items-center gap-2">
                    University
                    {getSortIcon("name")}
                  </div>
                </th>
                <th 
                  className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort("overallScore")}
                >
                  <div className="flex items-center gap-2">
                    Overall Score
                    {getSortIcon("overallScore")}
                  </div>
                </th>
                <th 
                  className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort("academicScore")}
                >
                  <div className="flex items-center gap-2">
                    Academic
                    {getSortIcon("academicScore")}
                  </div>
                </th>
                <th 
                  className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort("researchScore")}
                >
                  <div className="flex items-center gap-2">
                    Research
                    {getSortIcon("researchScore")}
                  </div>
                </th>
                <th 
                  className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort("facilitiesScore")}
                >
                  <div className="flex items-center gap-2">
                    Facilities
                    {getSortIcon("facilitiesScore")}
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedRankings.map((ranking, index) => (
                <tr 
                  key={ranking.Id} 
                  className={`ranking-row ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {getRankMedal(ranking.rank)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900">
                        {ranking.university.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {ranking.university.location}, {ranking.university.governorate}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-lg font-bold text-primary">
                      {ranking.university.overallScore.toFixed(1)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {ranking.academicScore.toFixed(1)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {ranking.researchScore.toFixed(1)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {ranking.facilitiesScore.toFixed(1)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StarRating rating={ranking.university.rating} size={16} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top 3 Highlight */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sortedRankings.slice(0, 3).map((ranking, index) => (
          <div 
            key={ranking.Id}
            className={`bg-gradient-to-br ${
              index === 0 ? 'from-yellow-400 to-yellow-600' :
              index === 1 ? 'from-gray-300 to-gray-500' :
              'from-orange-400 to-orange-600'
            } rounded-lg p-6 text-white relative overflow-hidden`}
          >
            <div className="absolute top-4 right-4">
              {getRankMedal(ranking.rank)}
            </div>
            <div className="mb-4">
              <h3 className="font-display text-lg font-bold mb-1">
                {ranking.university.name}
              </h3>
              <p className="text-white/80 text-sm">
                {ranking.university.location}
              </p>
            </div>
            <div className="text-3xl font-bold mb-2">
              {ranking.university.overallScore.toFixed(1)}
            </div>
            <div className="text-sm text-white/80">
              Overall Score
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
              <div>
                <div className="font-medium">{ranking.academicScore.toFixed(1)}</div>
                <div className="text-white/70">Academic</div>
              </div>
              <div>
                <div className="font-medium">{ranking.researchScore.toFixed(1)}</div>
                <div className="text-white/70">Research</div>
              </div>
              <div>
                <div className="font-medium">{ranking.facilitiesScore.toFixed(1)}</div>
                <div className="text-white/70">Facilities</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rankings;