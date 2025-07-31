import universitiesData from "@/services/mockData/universities.json";

class UniversityService {
  constructor() {
    this.universities = [...universitiesData];
  }

  async delay(ms = 300) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

async getAll() {
    await this.delay();
    return this.universities.map(university => ({
      ...university,
      programs: this.getUniversityPrograms(university.Id),
      logoUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(university.name)}&background=1a5f7a&color=fff&size=96`
    }));
  }

  async getById(id) {
    await this.delay();
    const university = this.universities.find(u => u.Id === parseInt(id));
    if (!university) {
      throw new Error(`University with ID ${id} not found`);
    }
return { ...university };
  }

  async getDetailedById(id) {
    await this.delay();
    const university = this.universities.find(u => u.Id === parseInt(id));
    if (!university) {
      throw new Error(`University with ID ${id} not found`);
    }
    
    // Enhanced university data with detailed information
    const detailedData = {
      ...university,
      description: this.getUniversityDescription(university.Id),
      programs: this.getUniversityPrograms(university.Id),
      facilities: this.getUniversityFacilities(university.Id),
      contact: this.getUniversityContact(university.Id),
      statistics: this.getUniversityStatistics(university.Id),
      achievements: this.getUniversityAchievements(university.Id)
    };
    
    return detailedData;
  }

  getUniversityDescription(id) {
    const descriptions = {
      1: "Cairo University is Egypt's premier modern university and one of the most prestigious institutions of higher education in Egypt, the Arab world and Africa. It serves as the mother university for many universities in Egypt and the Arab world.",
      2: "Alexandria University is a public research university in Alexandria, Egypt. It was established in 1942 as a branch of Cairo University, becoming an independent entity in 1952. The university has educated and trained undergraduate and graduate students for over 75 years.",
      3: "The American University in Cairo is an independent, nonprofit, apolitical, non-sectarian and equal opportunity institution of higher learning. AUC provides English-language liberal arts and professional education to students from Egypt and the surrounding region.",
      4: "Ain Shams University is a public university located in Cairo, Egypt. Founded in 1950, the university provides education at the undergraduate, graduate and post-graduate levels. The university is considered one of Egypt's most prestigious institutions.",
      5: "Assiut University is a public university located in Assiut, Egypt. It was established in 1957 as the first university in Upper Egypt. The university has played a crucial role in the development of higher education in southern Egypt.",
      6: "Mansoura University is a public university in the city of Mansoura, Egypt. It was established in 1972 and has since become one of the most distinguished universities in the Middle East, known for its medical and engineering programs.",
      7: "Zagazig University is a public university located in Zagazig, Egypt. Established in 1974, it serves the eastern region of the Nile Delta and has grown to become one of Egypt's largest universities.",
      8: "Helwan University is a public university based in Helwan, Egypt, which is part of the Greater Cairo metropolitan area. Founded in 1975, it is known for its programs in engineering, fine arts, and applied arts.",
      9: "Tanta University is a public university in Tanta, Egypt. Established in 1972, it serves the Gharbia Governorate and surrounding areas, offering a wide range of undergraduate and graduate programs.",
      10: "The German University in Cairo is a private university established through cooperation between Egypt and Germany. Founded in 2003, it offers German-accredited degrees and maintains strong ties with German industry and academia."
    };
    return descriptions[id] || "A prestigious institution of higher education committed to academic excellence and research innovation.";
  }

  getUniversityPrograms(id) {
    const programsData = {
      1: ["Medicine", "Engineering", "Pharmacy", "Dentistry", "Veterinary Medicine", "Agriculture", "Economics & Political Science", "Law", "Arts", "Science", "Commerce", "Mass Communication", "Computers & Information", "Nursing", "Physical Therapy"],
      2: ["Medicine", "Engineering", "Pharmacy", "Dentistry", "Agriculture", "Veterinary Medicine", "Science", "Arts", "Law", "Commerce", "Education", "Fine Arts", "Nursing", "Physical Education"],
      3: ["Business Administration", "Engineering", "Computer Science", "Mass Communication", "International & Comparative Education", "Global Affairs", "Construction Engineering", "Petroleum Engineering", "Economics", "Political Science", "Psychology", "English & Comparative Literature"],
      4: ["Medicine", "Engineering", "Pharmacy", "Dentistry", "Science", "Agriculture", "Education", "Arts", "Law", "Commerce", "Computer & Information Sciences", "Environmental Studies", "Nursing", "Physical Therapy"],
      5: ["Medicine", "Engineering", "Pharmacy", "Dentistry", "Veterinary Medicine", "Agriculture", "Science", "Arts", "Education", "Law", "Commerce", "Social Work", "Nursing", "Physical Education"],
      6: ["Medicine", "Engineering", "Pharmacy", "Dentistry", "Veterinary Medicine", "Agriculture", "Science", "Arts", "Education", "Law", "Commerce", "Computers & Information", "Fine Arts", "Tourism & Hotels"],
      7: ["Medicine", "Engineering", "Pharmacy", "Veterinary Medicine", "Agriculture", "Science", "Arts", "Education", "Law", "Commerce", "Physical Education", "Nursing"],
      8: ["Engineering", "Fine Arts", "Applied Arts", "Music Education", "Commerce", "Law", "Education", "Science", "Pharmacy", "Physical Education", "Social Work", "Home Economics"],
      9: ["Medicine", "Engineering", "Pharmacy", "Dentistry", "Science", "Agriculture", "Arts", "Education", "Law", "Commerce", "Physical Education", "Nursing"],
      10: ["Engineering", "Business Administration", "Applied Sciences & Arts", "Pharmacy", "Dentistry", "Management Technology", "Information Engineering Technology", "Media Engineering Technology"]
    };
    return programsData[id] || ["Engineering", "Business", "Science", "Arts"];
  }

  getUniversityFacilities(id) {
    const facilitiesData = {
      1: ["Main Library", "Medical Research Centers", "University Hospital", "Student Housing", "Sports Complex", "Conference Centers", "Research Laboratories", "Innovation Hub", "Student Centers", "Cafeterias"],
      2: ["Central Library", "University Hospitals", "Marine Research Station", "Sports Facilities", "Student Dormitories", "Research Centers", "Conference Halls", "Computer Labs", "Cultural Centers"],
      3: ["Rare Books Library", "Science Labs", "Engineering Workshops", "Sports Center", "Student Center", "Performing Arts Center", "Media Center", "Research Centers", "Innovation Labs"],
      4: ["University Hospitals", "Research Centers", "Sports Complex", "Student Housing", "Libraries", "Conference Centers", "Computer Labs", "Cultural Centers", "Innovation Hub"],
      5: ["Medical Centers", "Agricultural Research Stations", "Libraries", "Sports Facilities", "Student Housing", "Research Labs", "Conference Halls", "Computer Centers"],
      6: ["University Hospital", "Research Centers", "Sports Complex", "Student Dormitories", "Libraries", "Conference Centers", "Innovation Labs", "Cultural Centers"],
      7: ["Medical Centers", "Research Facilities", "Sports Complex", "Student Housing", "Libraries", "Computer Labs", "Conference Halls", "Agricultural Research Stations"],
      8: ["Art Studios", "Engineering Labs", "Sports Facilities", "Student Centers", "Libraries", "Computer Centers", "Conference Halls", "Cultural Centers"],
      9: ["University Hospital", "Research Centers", "Sports Facilities", "Student Housing", "Libraries", "Computer Labs", "Conference Centers", "Agricultural Research"],
      10: ["Modern Labs", "Engineering Workshops", "Business Incubator", "Sports Center", "Student Center", "Research Centers", "Conference Facilities", "Innovation Hub"]
    };
    return facilitiesData[id] || ["Library", "Sports Center", "Student Housing", "Research Labs"];
  }

  getUniversityContact(id) {
    const contactData = {
      1: { phone: "+20 2 3567 6800", email: "info@cu.edu.eg", website: "www.cu.edu.eg", address: "Giza, Egypt" },
      2: { phone: "+20 3 4871 500", email: "info@alexu.edu.eg", website: "www.alexu.edu.eg", address: "Alexandria, Egypt" },
      3: { phone: "+20 2 2615 1000", email: "info@aucegypt.edu", website: "www.aucegypt.edu", address: "New Cairo, Egypt" },
      4: { phone: "+20 2 2248 2332", email: "info@asu.edu.eg", website: "www.asu.edu.eg", address: "Abbasia, Cairo, Egypt" },
      5: { phone: "+20 88 241 1503", email: "info@aun.edu.eg", website: "www.aun.edu.eg", address: "Assiut, Egypt" },
      6: { phone: "+20 50 236 5000", email: "info@mans.edu.eg", website: "www.mans.edu.eg", address: "Mansoura, Egypt" },
      7: { phone: "+20 55 230 4200", email: "info@zu.edu.eg", website: "www.zu.edu.eg", address: "Zagazig, Egypt" },
      8: { phone: "+20 2 2556 4239", email: "info@helwan.edu.eg", website: "www.helwan.edu.eg", address: "Helwan, Egypt" },
      9: { phone: "+20 40 331 7928", email: "info@tanta.edu.eg", website: "www.tanta.edu.eg", address: "Tanta, Egypt" },
      10: { phone: "+20 2 2759 0909", email: "info@guc.edu.eg", website: "www.guc.edu.eg", address: "New Cairo, Egypt" }
    };
    return contactData[id] || { phone: "+20 2 XXXX XXXX", email: "info@university.edu.eg", website: "www.university.edu.eg", address: "Egypt" };
  }

  getUniversityStatistics(id) {
    const baseStats = this.universities.find(u => u.Id === parseInt(id));
    return {
      studentCount: baseStats?.studentCount || 50000,
      facultyCount: Math.floor((baseStats?.studentCount || 50000) / 25),
      internationalStudents: Math.floor((baseStats?.studentCount || 50000) * 0.05),
      graduationRate: 85 + Math.floor(Math.random() * 10),
      employmentRate: 80 + Math.floor(Math.random() * 15),
      researchProjects: 150 + Math.floor(Math.random() * 200)
    };
  }

  getUniversityAchievements(id) {
    const achievements = [
      "QS World University Rankings Recognition",
      "Leading Research Institution",
      "International Accreditation",
      "Excellence in Teaching Award",
      "Innovation Hub Recognition",
      "Community Service Award",
      "Sustainable Campus Initiative",
      "Industry Partnership Excellence"
    ];
    return achievements.slice(0, 4 + Math.floor(Math.random() * 4));
  }

  async create(universityData) {
    await this.delay();
    const newUniversity = {
      ...universityData,
      Id: Math.max(...this.universities.map(u => u.Id)) + 1
    };
    this.universities.push(newUniversity);
    return { ...newUniversity };
  }

  async update(id, universityData) {
    await this.delay();
    const index = this.universities.findIndex(u => u.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`University with ID ${id} not found`);
    }
    this.universities[index] = { ...this.universities[index], ...universityData };
    return { ...this.universities[index] };
  }

  async delete(id) {
    await this.delay();
    const index = this.universities.findIndex(u => u.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`University with ID ${id} not found`);
    }
    const deleted = this.universities.splice(index, 1)[0];
    return { ...deleted };
  }

  async search(query) {
    await this.delay();
    const searchTerm = query.toLowerCase();
    const filtered = this.universities.filter(university => 
      university.name.toLowerCase().includes(searchTerm) ||
      university.nameAr.includes(searchTerm) ||
      university.location.toLowerCase().includes(searchTerm) ||
      university.governorate.toLowerCase().includes(searchTerm)
    );
    return filtered;
}

  getAvailablePrograms() {
    const allPrograms = new Set();
    Object.values(this.getUniversityPrograms(1)).forEach(program => allPrograms.add(program));
    Object.values(this.getUniversityPrograms(2)).forEach(program => allPrograms.add(program));
    Object.values(this.getUniversityPrograms(3)).forEach(program => allPrograms.add(program));
    Object.values(this.getUniversityPrograms(4)).forEach(program => allPrograms.add(program));
    Object.values(this.getUniversityPrograms(5)).forEach(program => allPrograms.add(program));
    Object.values(this.getUniversityPrograms(6)).forEach(program => allPrograms.add(program));
    Object.values(this.getUniversityPrograms(7)).forEach(program => allPrograms.add(program));
    Object.values(this.getUniversityPrograms(8)).forEach(program => allPrograms.add(program));
    Object.values(this.getUniversityPrograms(9)).forEach(program => allPrograms.add(program));
    Object.values(this.getUniversityPrograms(10)).forEach(program => allPrograms.add(program));
    return Array.from(allPrograms).sort();
  }

  async filterByGovernorate(governorate) {
    await this.delay();
    if (!governorate) {
      return [...this.universities];
    }
    const filtered = this.universities.filter(university => 
      university.governorate.toLowerCase() === governorate.toLowerCase()
    );
    return filtered;
  }

  async filterByType(type) {
    await this.delay();
    if (!type) {
      return [...this.universities];
    }
    const filtered = this.universities.filter(university => 
      university.type.toLowerCase() === type.toLowerCase()
    );
return filtered;
  }

  async filterByPrograms(programs) {
    await this.delay();
    if (!programs || programs.length === 0) {
      return [...this.universities];
    }
    const filtered = this.universities.filter(university => {
      const universityPrograms = this.getUniversityPrograms(university.Id);
      return programs.some(program => universityPrograms.includes(program));
    });
    return filtered;
  }
}

export default new UniversityService();