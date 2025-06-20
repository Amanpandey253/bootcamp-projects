import React, { useState } from 'react';
import { Search, MapPin, Filter, X } from 'lucide-react';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { JobFilters as IJobFilters } from '../../types';

interface JobFiltersProps {
  filters: IJobFilters;
  onFiltersChange: (filters: IJobFilters) => void;
  onClearFilters: () => void;
}

export const JobFilters: React.FC<JobFiltersProps> = ({
  filters,
  onFiltersChange,
  onClearFilters,
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleFilterChange = (key: keyof IJobFilters, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const jobTypes = ['full-time', 'part-time', 'contract', 'remote', 'internship'];
  const experienceLevels = ['entry', 'mid', 'senior', 'executive'];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <Input
          placeholder="Search jobs, companies, skills..."
          value={filters.search || ''}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          icon={<Search className="w-4 h-4" />}
        />
        
        <Input
          placeholder="Location"
          value={filters.location || ''}
          onChange={(e) => handleFilterChange('location', e.target.value)}
          icon={<MapPin className="w-4 h-4" />}
        />
        
        <Button
          variant="outline"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center justify-center space-x-2"
        >
          <Filter className="w-4 h-4" />
          <span>{showAdvanced ? 'Hide' : 'Show'} Filters</span>
        </Button>
      </div>

      {showAdvanced && (
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Job Type
            </label>
            <div className="flex flex-wrap gap-2">
              {jobTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    const currentTypes = filters.type || [];
                    const newTypes = currentTypes.includes(type)
                      ? currentTypes.filter(t => t !== type)
                      : [...currentTypes, type];
                    handleFilterChange('type', newTypes);
                  }}
                  className={`px-3 py-1 rounded-md text-sm transition-colors ${
                    (filters.type || []).includes(type)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Experience Level
            </label>
            <div className="flex flex-wrap gap-2">
              {experienceLevels.map((level) => (
                <button
                  key={level}
                  onClick={() => {
                    const currentLevels = filters.experience || [];
                    const newLevels = currentLevels.includes(level)
                      ? currentLevels.filter(l => l !== level)
                      : [...currentLevels, level];
                    handleFilterChange('experience', newLevels);
                  }}
                  className={`px-3 py-1 rounded-md text-sm transition-colors ${
                    (filters.experience || []).includes(level)
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filters.remote || false}
                onChange={(e) => handleFilterChange('remote', e.target.checked)}
                className="rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Remote Only</span>
            </label>
            
            <Button variant="ghost" onClick={onClearFilters} size="sm">
              <X className="w-4 h-4 mr-1" />
              Clear All
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};