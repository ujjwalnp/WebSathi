import React from 'react';
import { DollarSign } from 'lucide-react';

interface IncomeCardProps {
  income: number;
  year: number;
  description?: string;
}

const IncomeCard: React.FC<IncomeCardProps> = ({ income, year, description }) => {
  return (
    <div className="rounded-lg border bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex flex-row items-center justify-between space-y-0 pb-2">
        <h3 className="text-sm font-medium text-gray-600">Income</h3>
        <DollarSign className="h-4 w-4 text-blue-600" />
      </div>

      <div className="pt-2">
        <div className="text-2xl font-bold text-gray-900">
          ${income.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </div>
        <p className="text-xs text-gray-500 mt-1">For the year {year}</p>

        {description && (
          <p className="text-sm text-gray-600 mt-2">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default IncomeCard;
