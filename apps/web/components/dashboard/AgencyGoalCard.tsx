
import React from 'react';
import { Target } from 'lucide-react';

interface AgencyGoalCardProps {
  current: number;
  goal: number;
  title?: string;
  description?: string;
}

const AgencyGoalCard: React.FC<AgencyGoalCardProps> = ({ 
  current, 
  goal, 
  title = "Agency Goal",
  description 
}) => {
  const progressPercentage = Math.min((current / goal) * 100, 100);

  return (
    <div className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300">
      <div className="flex flex-col space-y-1.5 p-6">
        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 className="text-sm font-medium text-gray-600">{title}</h3>
          <Target className="h-4 w-4 text-orange-600" />
        </div>
      </div>
      <div className="p-6 pt-0">
        {description && (
          <p className="text-sm text-gray-600 mb-4">
            {description}
          </p>
        )}
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Current: {current}</span>
          <span className="text-sm text-gray-600">Goal: {goal}</span>
        </div>
        <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-200">
          <div 
            className="h-full w-full flex-1 bg-orange-500 transition-all"
            style={{ transform: `translateX(-${100 - progressPercentage}%)` }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-2">
          {progressPercentage.toFixed(1)}% completed
        </p>
      </div>
    </div>
  );
};

export default AgencyGoalCard;