import React, { useEffect, useState } from 'react';
import { JobCard } from '../components/jobs/JobCard';
import { JobFilters } from '../components/jobs/JobFilters';
import { useJobStore } from '../store/jobStore';
import { JobFilters as IJobFilters } from '../types';

export const JobsPage: React.FC = () => {
  const { jobs, isLoading, filters, fetchJobs, setFilters, clearFilters } = useJobStore();
  const [appliedFilters, setAppliedFilters] = useState<IJobFilters>(filters);

  useEffect(() => {
    fetchJobs(appliedFilters);
  }, [appliedFilters, fetchJobs]);

  const handleFiltersChange = (newFilters: IJobFilters) => {
    setFilters(newFilters);
    setAppliedFilters(newFilters);
  };

  const handleClearFilters = () => {
    clearFilters();
    setAppliedFilters({});
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Browse Jobs
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Discover your next career opportunity from {jobs.length} available positions
          </p>
        </div>

        <JobFilters
          filters={appliedFilters}
          onFiltersChange={handleFiltersChange}
          onClearFilters={handleClearFilters}
        />

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-200 dark:bg-gray-700 rounded-xl h-64"></div>
              </div>
            ))}
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No jobs found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Try adjusting your search criteria or clearing filters
            </p>
            <button
              onClick={handleClearFilters}
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};