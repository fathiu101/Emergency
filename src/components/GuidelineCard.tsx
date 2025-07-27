import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Guideline } from '../stores/guidelinesStore';

interface GuidelineCardProps {
  guideline: Guideline;
}

const GuidelineCard: React.FC<GuidelineCardProps> = ({ guideline }) => {
  const [expanded, setExpanded] = React.useState(false);
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <button
        className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {guideline.title}
        </h3>
        <div className="ml-2 flex-shrink-0">
          {expanded ? (
            <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          )}
        </div>
      </button>
      
      {expanded && (
        <div className="px-6 pb-5 pt-2">
          <ol className="list-decimal pl-5 space-y-2">
            {guideline.steps.map((step, index) => (
              <li key={index} className="text-gray-700 dark:text-gray-300">
                {step}
              </li>
            ))}
          </ol>
          
          {guideline.additionalInfo && (
            <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Additional Information:</strong> {guideline.additionalInfo}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GuidelineCard;
