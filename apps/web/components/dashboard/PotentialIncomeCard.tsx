
import React from 'react';
import { DollarSign } from 'lucide-react';

interface PotentialIncomeCardProps {
  potentialIncome: number;
  year: number;
  description?: string;
}

const PotentialIncomeCard: React.FC<PotentialIncomeCardProps> = ({ 
  potentialIncome, 
  year, 
  description 
}) => {
  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300">
      <div className="flex flex-col space-y-1.5 p-6">
        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 className="text-sm font-medium text-gray-600">Potential Income</h3>
          <DollarSign className="h-4 w-4 text-green-600" />
        </div>
      </div>
      <div className="p-6 pt-0">
        <div className="text-2xl font-bold text-gray-900">
          ${potentialIncome.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
        <p className="text-xs text-gray-500 mt-1">
          For the year {year}
        </p>
        {description && (
          <p className="text-sm text-gray-600 mt-2">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default PotentialIncomeCard;