export interface User {
  id: string;
  email: string;
  name: string;
  role: 'jobseeker' | 'employer' | 'admin';
  avatar?: string;
  company?: string;
  location?: string;
  bio?: string;
  createdAt: Date;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'remote' | 'internship';
  salary: {
    min: number;
    max: number;
    currency: string;
    period: 'hourly' | 'monthly' | 'yearly';
  };
  description: string;
  requirements: string[];
  benefits: string[];
  skills: string[];
  experience: 'entry' | 'mid' | 'senior' | 'executive';
  remote: boolean;
  featured: boolean;
  postedBy: string;
  applicants: number;
  createdAt: Date;
  updatedAt: Date;
  status: 'active' | 'closed' | 'draft';
}

export interface Application {
  id: string;
  jobId: string;
  userId: string;
  coverLetter?: string;
  resume?: string;
  linkedinUrl?: string;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

export interface JobFilters {
  search?: string;
  location?: string;
  type?: string[];
  experience?: string[];
  remote?: boolean;
  salaryMin?: number;
  salaryMax?: number;
  company?: string;
}