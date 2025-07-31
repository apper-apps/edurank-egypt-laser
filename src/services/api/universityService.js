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
    return [...this.universities];
  }

  async getById(id) {
    await this.delay();
    const university = this.universities.find(u => u.Id === parseInt(id));
    if (!university) {
      throw new Error(`University with ID ${id} not found`);
    }
    return { ...university };
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
}

export default new UniversityService();