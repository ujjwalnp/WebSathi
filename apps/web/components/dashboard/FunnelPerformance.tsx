
import React from 'react';
import { Users } from 'lucide-react';

interface FunnelPerformanceProps {
  title?: string;
}

const FunnelPerformance: React.FC<FunnelPerformanceProps> = ({ 
  title = "Funnel Performance" 
}) => {
  return (
    <div className="rounded-lg border bg-white shadow-sm hover:shadow-lg transition-all duration-300">
      <div className="flex flex-col space-y-1.5 p-6">
        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 className="text-sm font-medium text-gray-600">{title}</h3>
          <Users className="h-4 w-4 text-gray-600" />
        </div>
      </div>
      <div className="p-6 pt-0">
        <div className="text-center py-8 text-gray-500">
          <p>No data</p>
        </div>
      </div>
    </div>
  );
};

export default FunnelPerformance;
