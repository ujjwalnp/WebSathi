import React from 'react';
import IncomeCard from '../../components/dashboard/IncomeCard';
import PotentialIncomeCard from '../../components/dashboard/PotentialIncomeCard';
import ActiveClientsCard from '../../components/dashboard/ActiveClientsCard';
import AgencyGoalCard from '../../components/dashboard/AgencyGoalCard';
import TransactionHistory from '../../components/dashboard/TransactionHistory';
import ConversionsChart from '../../components/dashboard/ConversionsChart';
import FunnelPerformance from '../../components/dashboard/FunnelPerformance';
import CheckoutActivity from '../../components/dashboard/CheckoutActivity';
import PipelineValueCard from '../../components/dashboard/PipelineValueCard';

export default function AgencyDashboard() {
  // Mock data specific to agency dashboard
  const mockAgencyTransactions = [
    {
      id: '1',
      email: 'agency@partner.com',
      status: 'completed',
      createdDate: '2024-12-29',
      value: 5600.00
    },
    {
      id: '2',
      email: 'client@agency.net',
      status: 'completed',
      createdDate: '2024-12-28',
      value: 3200.75
    },
    {
      id: '3',
      email: 'premium@client.co',
      status: 'pending',
      createdDate: '2024-12-27',
      value: 8900.00
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Agency Dashboard</h1>
          <p className="text-gray-600">Monitor your agency's performance and client metrics</p>
        </div>

        {/* Top Row - Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <IncomeCard 
            income={89400.50} 
            year={2025} 
            description="Total agency revenue generated across all clients."
          />
          <PotentialIncomeCard 
            potentialIncome={125000.00} 
            year={2025} 
            description="Projected revenue from current pipeline."
          />
          <ActiveClientsCard 
            activeClients={28} 
            description="Total number of active agency clients."
          />
          <AgencyGoalCard 
            current={28} 
            goal={50} 
            title="Client Growth Goal"
            description="Target number of clients for this quarter."
          />
        </div>

        {/* Middle Row - Transaction History & Conversions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <TransactionHistory 
              transactions={mockAgencyTransactions}
              growthPercentage={18.7}
            />
          </div>
          <ConversionsChart 
            closingRate={42}
            abandonedCarts={8}
            wonCarts={15}
          />
        </div>

        {/* Bottom Row - Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <PipelineValueCard 
            pipelineProgress={68}
            closedValue={89400}
            totalValue={125000}
            description="Agency pipeline value across all client projects."
          />
          <FunnelPerformance title="Agency Funnel Performance" />
          <CheckoutActivity title="Client Checkout Activity" />
        </div>
      </div>
    </div>
  );
}