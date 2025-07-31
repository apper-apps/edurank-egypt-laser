import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import universityService from "@/services/api/universityService";
import rankingService from "@/services/api/rankingService";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/atoms/Card";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ApperIcon from "@/components/ApperIcon";

const Admin = () => {
  const [universities, setUniversities] = useState([]);
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      const [universitiesData, rankingsData] = await Promise.all([
        universityService.getAll(),
        rankingService.getRankings()
      ]);
      setUniversities(universitiesData);
      setRankings(rankingsData);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load admin data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return <Loading type="grid" />;
  }

  if (error) {
    return <Error message={error} onRetry={loadData} />;
  }

  const tabs = [
    { id: "overview", label: "Overview", icon: "BarChart3" },
    { id: "universities", label: "Universities", icon: "GraduationCap" },
    { id: "rankings", label: "Rankings", icon: "Trophy" },
    { id: "settings", label: "Settings", icon: "Settings" }
  ];

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-accent to-accent/80 rounded-lg p-8 text-white">
        <h1 className="font-display text-3xl font-bold mb-4">
          Admin Dashboard
        </h1>
        <p className="text-lg text-white/90 max-w-2xl">
          Manage universities, update rankings, and configure system settings. 
          Monitor platform statistics and user engagement.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-surface rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <ApperIcon name={tab.icon} size={16} />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === "overview" && <OverviewTab universities={universities} rankings={rankings} />}
          {activeTab === "universities" && <UniversitiesTab universities={universities} onUpdate={loadData} />}
          {activeTab === "rankings" && <RankingsTab rankings={rankings} onUpdate={loadData} />}
          {activeTab === "settings" && <SettingsTab />}
        </div>
      </div>
    </div>
  );
};

const OverviewTab = ({ universities, rankings }) => {
  const stats = {
    totalUniversities: universities.length,
    publicUniversities: universities.filter(u => u.type === "public").length,
    privateUniversities: universities.filter(u => u.type === "private").length,
    totalStudents: universities.reduce((sum, u) => sum + u.studentCount, 0),
    averageRating: universities.reduce((sum, u) => sum + u.rating, 0) / universities.length,
    topRanked: rankings[0]?.university?.name || "N/A"
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Universities</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalUniversities}</p>
              </div>
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <ApperIcon name="GraduationCap" size={24} className="text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalStudents.toLocaleString()}</p>
              </div>
              <div className="h-12 w-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                <ApperIcon name="Users" size={24} className="text-secondary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Rating</p>
                <p className="text-2xl font-bold text-gray-900">{stats.averageRating.toFixed(1)}</p>
              </div>
              <div className="h-12 w-12 bg-success/10 rounded-lg flex items-center justify-center">
                <ApperIcon name="Star" size={24} className="text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Public Universities</p>
                <p className="text-2xl font-bold text-gray-900">{stats.publicUniversities}</p>
              </div>
              <div className="h-12 w-12 bg-info/10 rounded-lg flex items-center justify-center">
                <ApperIcon name="Building2" size={24} className="text-info" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Private Universities</p>
                <p className="text-2xl font-bold text-gray-900">{stats.privateUniversities}</p>
              </div>
              <div className="h-12 w-12 bg-warning/10 rounded-lg flex items-center justify-center">
                <ApperIcon name="Building" size={24} className="text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Top Ranked</p>
                <p className="text-2xl font-bold text-gray-900 truncate">{stats.topRanked}</p>
              </div>
              <div className="h-12 w-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <ApperIcon name="Trophy" size={24} className="text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <ApperIcon name="Plus" size={16} className="text-success" />
                <div className="flex-1">
                  <p className="text-sm font-medium">New university added</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <ApperIcon name="Edit" size={16} className="text-info" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Rankings updated</p>
                  <p className="text-xs text-gray-500">5 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <ApperIcon name="Settings" size={16} className="text-warning" />
                <div className="flex-1">
                  <p className="text-sm font-medium">System settings changed</p>
                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button className="w-full justify-start gap-2" variant="outline">
                <ApperIcon name="Plus" size={16} />
                Add New University
              </Button>
              <Button className="w-full justify-start gap-2" variant="outline">
                <ApperIcon name="Upload" size={16} />
                Import Rankings Data
              </Button>
              <Button className="w-full justify-start gap-2" variant="outline">
                <ApperIcon name="Download" size={16} />
                Export Report
              </Button>
              <Button className="w-full justify-start gap-2" variant="outline">
                <ApperIcon name="RefreshCw" size={16} />
                Refresh All Data
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const UniversitiesTab = ({ universities, onUpdate }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    nameAr: "",
    governorate: "",
    location: "",
    rating: 0,
    overallScore: 0,
    establishedYear: new Date().getFullYear(),
    studentCount: 0,
    type: "public"
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await universityService.create(formData);
      toast.success("University added successfully");
      setShowAddForm(false);
      setFormData({
        name: "",
        nameAr: "",
        governorate: "",
        location: "",
        rating: 0,
        overallScore: 0,
        establishedYear: new Date().getFullYear(),
        studentCount: 0,
        type: "public"
      });
      onUpdate();
    } catch (err) {
      toast.error("Failed to add university");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg font-semibold">Manage Universities</h3>
        <Button onClick={() => setShowAddForm(!showAddForm)} className="flex items-center gap-2">
          <ApperIcon name="Plus" size={16} />
          Add University
        </Button>
      </div>

      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New University</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    University Name (English)
                  </label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    University Name (Arabic)
                  </label>
                  <Input
                    value={formData.nameAr}
                    onChange={(e) => setFormData(prev => ({ ...prev, nameAr: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Governorate
                  </label>
                  <Input
                    value={formData.governorate}
                    onChange={(e) => setFormData(prev => ({ ...prev, governorate: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <Input
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Established Year
                  </label>
                  <Input
                    type="number"
                    value={formData.establishedYear}
                    onChange={(e) => setFormData(prev => ({ ...prev, establishedYear: parseInt(e.target.value) }))}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Student Count
                  </label>
                  <Input
                    type="number"
                    value={formData.studentCount}
                    onChange={(e) => setFormData(prev => ({ ...prev, studentCount: parseInt(e.target.value) }))}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rating (1-5)
                  </label>
                  <Input
                    type="number"
                    min="1"
                    max="5"
                    step="0.1"
                    value={formData.rating}
                    onChange={(e) => setFormData(prev => ({ ...prev, rating: parseFloat(e.target.value) }))}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Overall Score
                  </label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value={formData.overallScore}
                    onChange={(e) => setFormData(prev => ({ ...prev, overallScore: parseFloat(e.target.value) }))}
                    required
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <Button type="submit">Add University</Button>
                <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>University List ({universities.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Location</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Type</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Students</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Rating</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {universities.map((university) => (
                  <tr key={university.Id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium text-gray-900">{university.name}</div>
                        <div className="text-sm text-gray-500">{university.nameAr}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {university.location}, {university.governorate}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        university.type === "public" 
                          ? "bg-blue-100 text-blue-800" 
                          : "bg-green-100 text-green-800"
                      }`}>
                        {university.type}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {university.studentCount.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {university.rating.toFixed(1)}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <ApperIcon name="Edit" size={14} />
                        </Button>
                        <Button size="sm" variant="outline">
                          <ApperIcon name="Trash2" size={14} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const RankingsTab = ({ rankings }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg font-semibold">Manage Rankings</h3>
        <Button className="flex items-center gap-2">
          <ApperIcon name="RefreshCw" size={16} />
          Update Rankings
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current Rankings (2024)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Rank</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">University</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Overall</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Academic</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Research</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Facilities</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rankings.map((ranking) => (
                  <tr key={ranking.Id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <span className="text-lg font-bold text-primary">#{ranking.rank}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium text-gray-900">{ranking.university.name}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-bold text-primary">{ranking.university.overallScore.toFixed(1)}</span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {ranking.academicScore.toFixed(1)}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {ranking.researchScore.toFixed(1)}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {ranking.facilitiesScore.toFixed(1)}
                    </td>
                    <td className="py-3 px-4">
                      <Button size="sm" variant="outline">
                        <ApperIcon name="Edit" size={14} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const SettingsTab = () => {
  const [settings, setSettings] = useState({
    siteName: "EduRank Egypt",
    maintenanceMode: false,
    allowRegistration: true,
    emailNotifications: true,
    dataUpdateFrequency: "monthly"
  });

  const handleSaveSettings = () => {
    toast.success("Settings saved successfully");
  };

  return (
    <div className="space-y-6">
      <h3 className="font-display text-lg font-semibold">System Settings</h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Site Name
              </label>
              <Input
                value={settings.siteName}
                onChange={(e) => setSettings(prev => ({ ...prev, siteName: e.target.value }))}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data Update Frequency
              </label>
              <select
                value={settings.dataUpdateFrequency}
                onChange={(e) => setSettings(prev => ({ ...prev, dataUpdateFrequency: e.target.value }))}
                className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="annually">Annually</option>
              </select>
            </div>
            
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                Maintenance Mode
              </label>
              <input
                type="checkbox"
                checked={settings.maintenanceMode}
                onChange={(e) => setSettings(prev => ({ ...prev, maintenanceMode: e.target.checked }))}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                Allow Registration
              </label>
              <input
                type="checkbox"
                checked={settings.allowRegistration}
                onChange={(e) => setSettings(prev => ({ ...prev, allowRegistration: e.target.checked }))}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                Email Notifications
              </label>
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) => setSettings(prev => ({ ...prev, emailNotifications: e.target.checked }))}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Data Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full justify-start gap-2" variant="outline">
              <ApperIcon name="Upload" size={16} />
              Import Universities Data
            </Button>
            <Button className="w-full justify-start gap-2" variant="outline">
              <ApperIcon name="Download" size={16} />
              Export All Data
            </Button>
            <Button className="w-full justify-start gap-2" variant="outline">
              <ApperIcon name="RefreshCw" size={16} />
              Refresh Rankings
            </Button>
            <Button className="w-full justify-start gap-2" variant="outline">
              <ApperIcon name="Database" size={16} />
              Backup System
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSaveSettings} className="flex items-center gap-2">
          <ApperIcon name="Save" size={16} />
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default Admin;