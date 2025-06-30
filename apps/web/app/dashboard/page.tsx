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

export default function Dashboard() {
  // Mock data - in a real app, this would come from API calls or props
  const mockTransactions = [
    {
      id: '1',
      email: 'user@example.com',
      status: 'completed',
      createdDate: '2024-12-29',
      value: 1299.99
    },
    {
      id: '2',
      email: 'client@business.com',
      status: 'pending',
      createdDate: '2024-12-28',
      value: 899.50
    },
    {
      id: '3',
      email: 'customer@website.org',
      status: 'completed',
      createdDate: '2024-12-27',
      value: 2150.00
    },
    {
      id: '4',
      email: 'premium@service.com',
      status: 'failed',
      createdDate: '2024-12-26',
      value: 750.25
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome to your SaaS dashboard overview</p>
        </div>

        {/* Top Row - Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <IncomeCard 
            income={42500.75} 
            year={2025} 
            description="Total revenue generated as reflected in your dashboard."
          />
          <PotentialIncomeCard 
            potentialIncome={68000.00} 
            year={2025} 
            description="This is how much you can close."
          />
          <ActiveClientsCard 
            activeClients={15} 
            description="Reflects the number of sub accounts you own and manage."
          />
          <AgencyGoalCard 
            current={3} 
            goal={8} 
            title="Agency Goal"
            description="Reflects the number of sub accounts you want to own and manage."
          />
        </div>

        {/* Middle Row - Transaction History & Conversions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <TransactionHistory 
              transactions={mockTransactions}
              growthPercentage={12.3}
            />
          </div>
          <ConversionsChart 
            closingRate={24}
            abandonedCarts={12}
            wonCarts={8}
          />
        </div>

        {/* Bottom Row - Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <PipelineValueCard 
            pipelineProgress={35}
            closedValue={15000}
            totalValue={45000}
            description="Total value of all tickets in the given pipeline except the last lane."
          />
          <FunnelPerformance />
          <CheckoutActivity />
        </div>
      </div>
    </div>
  );
}
