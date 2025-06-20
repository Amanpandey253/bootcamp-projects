import { create } from 'zustand';
import { Job, JobFilters } from '../types';

interface JobState {
  jobs: Job[];
  favorites: string[];
  isLoading: boolean;
  filters: JobFilters;
  currentPage: number;
  totalPages: number;
  fetchJobs: (filters?: JobFilters, page?: number) => Promise<void>;
  toggleFavorite: (jobId: string) => void;
  setFilters: (filters: JobFilters) => void;
  clearFilters: () => void;
}

// Mock job data
const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp Inc.',
    companyLogo: 'https://images.pexels.com/photos/259091/pexels-photo-259091.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    location: 'San Francisco, CA',
    type: 'full-time',
    salary: { min: 120000, max: 180000, currency: 'USD', period: 'yearly' },
    description: 'We are looking for a talented Senior Frontend Developer to join our dynamic team. You will be responsible for building cutting-edge web applications using modern technologies.',
    requirements: ['5+ years React experience', 'TypeScript proficiency', 'Modern CSS frameworks', 'GraphQL knowledge'],
    benefits: ['Health Insurance', 'Remote Work', '401k Matching', 'Unlimited PTO'],
    skills: ['React', 'TypeScript', 'Next.js', 'GraphQL', 'Tailwind CSS'],
    experience: 'senior',
    remote: true,
    featured: true,
    postedBy: 'employer1',
    applicants: 23,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    status: 'active',
  },
  {
    id: '2',
    title: 'Product Manager',
    company: 'StartupXYZ',
    companyLogo: 'https://images.pexels.com/photos/3184307/pexels-photo-3184307.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    location: 'New York, NY',
    type: 'full-time',
    salary: { min: 100000, max: 140000, currency: 'USD', period: 'yearly' },
    description: 'Join our fast-growing startup as a Product Manager. You will drive product strategy and work closely with engineering and design teams.',
    requirements: ['3+ years PM experience', 'Agile methodology', 'Data-driven mindset', 'B2B SaaS experience'],
    benefits: ['Equity Package', 'Health Insurance', 'Professional Development'],
    skills: ['Product Strategy', 'Agile', 'Analytics', 'User Research'],
    experience: 'mid',
    remote: false,
    featured: false,
    postedBy: 'employer2',
    applicants: 15,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    status: 'active',
  },
  {
    id: '3',
    title: 'UX/UI Designer',
    company: 'Design Studio',
    companyLogo: 'https://images.pexels.com/photos/3184454/pexels-photo-3184454.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    location: 'Austin, TX',
    type: 'contract',
    salary: { min: 75, max: 120, currency: 'USD', period: 'hourly' },
    description: 'We need a creative UX/UI Designer to help us design beautiful and intuitive user experiences for our clients.',
    requirements: ['Portfolio required', 'Figma expertise', 'User research skills', 'Prototyping experience'],
    benefits: ['Flexible Hours', 'Remote Work', 'Creative Freedom'],
    skills: ['Figma', 'Adobe Creative Suite', 'Prototyping', 'User Research'],
    experience: 'mid',
    remote: true,
    featured: true,
    postedBy: 'employer3',
    applicants: 31,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    status: 'active',
  },
];

export const useJobStore = create<JobState>((set, get) => ({
  jobs: [],
  favorites: JSON.parse(localStorage.getItem('job-favorites') || '[]'),
  isLoading: false,
  filters: {},
  currentPage: 1,
  totalPages: 1,

  fetchJobs: async (filters = {}, page = 1) => {
    set({ isLoading: true, filters, currentPage: page });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      let filteredJobs = [...mockJobs];
      
      // Apply filters
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        filteredJobs = filteredJobs.filter(job => 
          job.title.toLowerCase().includes(searchTerm) ||
          job.company.toLowerCase().includes(searchTerm) ||
          job.skills.some(skill => skill.toLowerCase().includes(searchTerm))
        );
      }
      
      if (filters.location) {
        filteredJobs = filteredJobs.filter(job => 
          job.location.toLowerCase().includes(filters.location!.toLowerCase())
        );
      }
      
      if (filters.type && filters.type.length > 0) {
        filteredJobs = filteredJobs.filter(job => 
          filters.type!.includes(job.type)
        );
      }
      
      if (filters.experience && filters.experience.length > 0) {
        filteredJobs = filteredJobs.filter(job => 
          filters.experience!.includes(job.experience)
        );
      }
      
      if (filters.remote !== undefined) {
        filteredJobs = filteredJobs.filter(job => job.remote === filters.remote);
      }
      
      set({ 
        jobs: filteredJobs, 
        isLoading: false,
        totalPages: Math.ceil(filteredJobs.length / 10)
      });
    } catch (error) {
      set({ isLoading: false });
    }
  },

  toggleFavorite: (jobId: string) => {
    const { favorites } = get();
    const newFavorites = favorites.includes(jobId)
      ? favorites.filter(id => id !== jobId)
      : [...favorites, jobId];
    
    localStorage.setItem('job-favorites', JSON.stringify(newFavorites));
    set({ favorites: newFavorites });
  },

  setFilters: (filters: JobFilters) => {
    set({ filters });
  },

  clearFilters: () => {
    set({ filters: {} });
  },
}));