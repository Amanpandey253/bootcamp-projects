import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, DollarSign, Heart, Building, Users } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Job } from '../../types';
import { useJobStore } from '../../store/jobStore';
import { Button } from '../common/Button';

interface JobCardProps {
  job: Job;
}

export const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const { favorites, toggleFavorite } = useJobStore();
  const isFavorite = favorites.includes(job.id);

  const formatSalary = (salary: Job['salary']) => {
    const { min, max, currency, period } = salary;
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    
    if (period === 'hourly') {
      return `${formatter.format(min)}-${formatter.format(max)}/hr`;
    }
    
    return `${formatter.format(min)}-${formatter.format(max)}/${period.slice(0, -2)}`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 group">
      {job.featured && (
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-medium px-3 py-1 rounded-t-xl">
          Featured Job
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            {job.companyLogo ? (
              <img 
                src={job.companyLogo} 
                alt={job.company}
                className="w-12 h-12 rounded-lg object-cover"
              />
            ) : (
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Building className="w-6 h-6 text-white" />
              </div>
            )}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {job.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">{job.company}</p>
            </div>
          </div>
          
          <button
            onClick={() => toggleFavorite(job.id)}
            className={`p-2 rounded-lg transition-colors ${
              isFavorite 
                ? 'text-red-500 bg-red-50 dark:bg-red-900/30' 
                : 'text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30'
            }`}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center space-x-1">
            <MapPin className="w-4 h-4" />
            <span>{job.location}</span>
            {job.remote && <span className="text-green-600 dark:text-green-400">• Remote</span>}
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span className="capitalize">{job.type.replace('-', ' ')}</span>
          </div>
          <div className="flex items-center space-x-1">
            <DollarSign className="w-4 h-4" />
            <span>{formatSalary(job.salary)}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {job.skills.slice(0, 4).map((skill) => (
            <span
              key={skill}
              className="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs rounded-md"
            >
              {skill}
            </span>
          ))}
          {job.skills.length > 4 && (
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-md">
              +{job.skills.length - 4} more
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{job.applicants} applicants</span>
            </div>
            <span>{formatDistanceToNow(job.createdAt, { addSuffix: true })}</span>
          </div>
          
          <Link to={`/jobs/${job.id}`}>
            <Button size="sm">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};