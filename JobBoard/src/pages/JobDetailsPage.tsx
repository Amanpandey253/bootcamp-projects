import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Building, 
  Users, 
  Calendar,
  ArrowLeft,
  Heart,
  Share2,
  CheckCircle
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Button } from '../components/common/Button';
import { ApplyForm } from '../components/jobs/ApplyForm';
import { useJobStore } from '../store/jobStore';
import { useAuthStore } from '../store/authStore';

export const JobDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { jobs, favorites, toggleFavorite } = useJobStore();
  const { isAuthenticated } = useAuthStore();
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);

  const job = jobs.find(j => j.id === id);
  const isFavorite = job ? favorites.includes(job.id) : false;

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Job Not Found
          </h2>
          <Link to="/jobs">
            <Button>Browse Jobs</Button>
          </Link>
        </div>
      </div>
    );
  }

  const formatSalary = (salary: typeof job.salary) => {
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

  const handleApply = async (formData: any) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setApplicationSubmitted(true);
    setShowApplyForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link 
            to="/jobs" 
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Jobs
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Header */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              {job.featured && (
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium px-3 py-1 rounded-md inline-block mb-4">
                  Featured Job
                </div>
              )}
              
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  {job.companyLogo ? (
                    <img 
                      src={job.companyLogo} 
                      alt={job.company}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                      <Building className="w-8 h-8 text-white" />
                    </div>
                  )}
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {job.title}
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400">{job.company}</p>
                  </div>
                </div>
                
                <div className="flex space-x-2">
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
                  <button className="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <MapPin className="w-5 h-5" />
                  <div>
                    <p className="text-sm font-medium">{job.location}</p>
                    {job.remote && <p className="text-xs text-green-600 dark:text-green-400">Remote</p>}
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <Clock className="w-5 h-5" />
                  <div>
                    <p className="text-sm font-medium capitalize">{job.type.replace('-', ' ')}</p>
                    <p className="text-xs">Job Type</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <DollarSign className="w-5 h-5" />
                  <div>
                    <p className="text-sm font-medium">{formatSalary(job.salary)}</p>
                    <p className="text-xs">Salary</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <Calendar className="w-5 h-5" />
                  <div>
                    <p className="text-sm font-medium">{formatDistanceToNow(job.createdAt, { addSuffix: true })}</p>
                    <p className="text-xs">Posted</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm rounded-md"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Job Description */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Job Description
              </h2>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {job.description}
                </p>
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Requirements
              </h2>
              <ul className="space-y-2">
                {job.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-400">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Benefits
              </h2>
              <ul className="space-y-2">
                {job.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-400">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Apply Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              {applicationSubmitted ? (
                <div className="text-center">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Application Submitted!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Thank you for your interest. We'll review your application and get back to you soon.
                  </p>
                </div>
              ) : (
                <>
                  <div className="text-center mb-4">
                    <div className="flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-400 mb-2">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">{job.applicants} applicants</span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Be among the first to apply
                    </p>
                  </div>
                  
                  {isAuthenticated ? (
                    <Button 
                      onClick={() => setShowApplyForm(!showApplyForm)}
                      className="w-full" 
                      size="lg"
                    >
                      {showApplyForm ? 'Hide Application Form' : 'Apply Now'}
                    </Button>
                  ) : (
                    <div className="space-y-2">
                      <Link to="/register">
                        <Button className="w-full" size="lg">
                          Sign Up to Apply
                        </Button>
                      </Link>
                      <Link to="/login">
                        <Button variant="outline" className="w-full">
                          Login
                        </Button>
                      </Link>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Company Info */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                About {job.company}
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Building className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Technology Company</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">{job.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">201-500 employees</span>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4">
                View Company Profile
              </Button>
            </div>

            {/* Similar Jobs */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Similar Jobs
              </h3>
              <div className="space-y-3">
                {jobs.slice(0, 3).map((similarJob) => (
                  <Link
                    key={similarJob.id}
                    to={`/jobs/${similarJob.id}`}
                    className="block p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-1">
                      {similarJob.title}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {similarJob.company} • {similarJob.location}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Apply Form Modal */}
        {showApplyForm && isAuthenticated && (
          <div className="mt-8">
            <ApplyForm
              jobId={job.id}
              onSubmit={handleApply}
            />
          </div>
        )}
      </div>
    </div>
  );
};