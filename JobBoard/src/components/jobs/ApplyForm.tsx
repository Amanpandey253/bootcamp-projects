import React from 'react';
import { useForm } from 'react-hook-form';
import { Upload, Link as LinkIcon, Send } from 'lucide-react';
import { Button } from '../common/Button';
import { Input } from '../common/Input';

interface ApplyFormData {
  coverLetter: string;
  linkedinUrl?: string;
  resume?: FileList;
}

interface ApplyFormProps {
  jobId: string;
  onSubmit: (data: ApplyFormData) => void;
  isLoading?: boolean;
}

export const ApplyForm: React.FC<ApplyFormProps> = ({ jobId, onSubmit, isLoading }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<ApplyFormData>();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        Apply for this Position
      </h3>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Cover Letter *
          </label>
          <textarea
            {...register('coverLetter', { required: 'Cover letter is required' })}
            rows={6}
            className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-colors"
            placeholder="Tell us why you're interested in this role and what makes you a great fit..."
          />
          {errors.coverLetter && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.coverLetter.message}
            </p>
          )}
        </div>

        <Input
          label="LinkedIn Profile (Optional)"
          type="url"
          placeholder="https://linkedin.com/in/yourprofile"
          icon={<LinkIcon className="w-4 h-4" />}
          {...register('linkedinUrl')}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Resume/CV
          </label>
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              PDF, DOC, DOCX (max 5MB)
            </p>
            <input
              type="file"
              {...register('resume')}
              accept=".pdf,.doc,.docx"
              className="mt-2 block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900/30 dark:file:text-blue-400"
            />
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4">
          <h4 className="text-sm font-medium text-blue-900 dark:text-blue-300 mb-2">
            Application Tips
          </h4>
          <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
            <li>• Tailor your cover letter to the specific role</li>
            <li>• Highlight relevant experience and skills</li>
            <li>• Keep your resume updated and concise</li>
            <li>• Double-check for typos and formatting</li>
          </ul>
        </div>

        <Button type="submit" loading={isLoading} className="w-full" size="lg">
          <Send className="w-4 h-4 mr-2" />
          Submit Application
        </Button>
      </form>
    </div>
  );
};