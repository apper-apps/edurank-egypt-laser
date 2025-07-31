import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import universityService from "@/services/api/universityService";
import UniversityCard from "@/components/molecules/UniversityCard";
import SearchBar from "@/components/molecules/SearchBar";
import Button from "@/components/atoms/Button";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";

const Universities = () => {
  const navigate = useNavigate();
  const [universities, setUniversities] = useState([]);
  const [filteredUniversities, setFilteredUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
const [searchQuery, setSearchQuery] = useState("");
  const [selectedGovernorate, setSelectedGovernorate] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedProgram, setSelectedProgram] = useState("");
  const loadUniversities = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await universityService.getAll();
      setUniversities(data);
      setFilteredUniversities(data);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load universities");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUniversities();
  }, []);

useEffect(() => {
    let filtered = [...universities];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(university =>
        university.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        university.nameAr.includes(searchQuery) ||
        university.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        university.governorate.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply governorate filter
    if (selectedGovernorate) {
      filtered = filtered.filter(university =>
        university.governorate === selectedGovernorate
      );
    }

    // Apply type filter
    if (selectedType) {
      filtered = filtered.filter(university =>
        university.type === selectedType
      );
    }

    // Apply program filter
    if (selectedProgram) {
      filtered = filtered.filter(university =>
        university.programs && university.programs.includes(selectedProgram)
      );
    }

    setFilteredUniversities(filtered);
  }, [universities, searchQuery, selectedGovernorate, selectedType, selectedProgram]);

const clearFilters = () => {
    setSearchQuery("");
    setSelectedGovernorate("");
    setSelectedType("");
    setSelectedProgram("");
  };

  const handleUniversityClick = (universityId) => {
    navigate(`/university/${universityId}`);
  };

const governorates = [...new Set(universities.map(u => u.governorate))].sort();
  const types = [...new Set(universities.map(u => u.type))].sort();
  const programs = [...new Set(universities.flatMap(u => u.programs || []))].sort();

  if (loading) {
    return <Loading type="grid" />;
  }

  if (error) {
    return <Error message={error} onRetry={loadUniversities} />;
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary to-primary/80 rounded-lg p-8 text-white">
        <h1 className="font-display text-3xl font-bold mb-4">
          Egyptian Universities
        </h1>
        <p className="text-lg text-white/90 max-w-2xl">
          Explore Egypt&apos;s leading higher education institutions. Compare universities, 
          view rankings, and find the perfect fit for your academic journey.
        </p>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-2xl font-bold text-secondary">
              {universities.length}
            </div>
            <div className="text-sm text-white/80">Universities</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-2xl font-bold text-secondary">
              {governorates.length}
            </div>
            <div className="text-sm text-white/80">Governorates</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-2xl font-bold text-secondary">
              {universities.reduce((sum, u) => sum + u.studentCount, 0).toLocaleString()}
            </div>
            <div className="text-sm text-white/80">Total Students</div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-surface rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search universities by name, location, or governorate..."
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="min-w-[160px]">
              <select
                value={selectedGovernorate}
                onChange={(e) => setSelectedGovernorate(e.target.value)}
                className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">All Governorates</option>
                {governorates.map(gov => (
                  <option key={gov} value={gov}>{gov}</option>
                ))}
              </select>
            </div>
            
<div className="min-w-[120px]">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">All Types</option>
                {types.map(type => (
                  <option key={type} value={type} className="capitalize">
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="min-w-[140px]">
              <select
                value={selectedProgram}
                onChange={(e) => setSelectedProgram(e.target.value)}
                className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">All Programs</option>
                {programs.map(program => (
                  <option key={program} value={program}>
                    {program}
                  </option>
                ))}
              </select>
            </div>
{(searchQuery || selectedGovernorate || selectedType || selectedProgram) && (
              <Button variant="outline" onClick={clearFilters}>
                <ApperIcon name="X" size={16} />
                Clear
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Results Section */}
      {filteredUniversities.length === 0 ? (
        <Empty
          title="No universities found"
          description="Try adjusting your search criteria or filters to find universities."
          icon="GraduationCap"
        />
      ) : (
        <>
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              Showing {filteredUniversities.length} of {universities.length} universities
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
<ApperIcon name="Filter" size={16} />
              <span>Filtered by: </span>
              {searchQuery && <span className="bg-primary/10 text-primary px-2 py-1 rounded">Search</span>}
              {selectedGovernorate && <span className="bg-primary/10 text-primary px-2 py-1 rounded">{selectedGovernorate}</span>}
              {selectedType && <span className="bg-primary/10 text-primary px-2 py-1 rounded capitalize">{selectedType}</span>}
              {selectedProgram && <span className="bg-primary/10 text-primary px-2 py-1 rounded">{selectedProgram}</span>}
            </div>
          </div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUniversities.map((university) => (
              <UniversityCard 
                key={university.Id} 
                university={university} 
                onClick={handleUniversityClick}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Universities;