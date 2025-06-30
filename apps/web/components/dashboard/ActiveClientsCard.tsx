import React from 'react';
import { Users } from 'lucide-react';

interface ActiveClientsCardProps {
  activeClients: number;
  description?: string;
}

const ActiveClientsCard: React.FC<ActiveClientsCardProps> = ({ 
  activeClients, 
  description 
}) => {
  return (
    <div className="rounded-lg border bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200 p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex flex-row items-center justify-between space-y-0 pb-2">
        <h3 className="text-sm font-medium text-gray-600">Active Clients</h3>
        <Users className="h-4 w-4 text-purple-600" />
      </div>
      <div className="pt-2">
        <div className="text-2xl font-bold text-gray-900">
          {activeClients}
        </div>
        {description && (
          <p className="text-sm text-gray-600 mt-2">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default ActiveClientsCard;
