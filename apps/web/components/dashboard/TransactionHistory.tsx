
import React from 'react';
import { TrendingUp, MoreHorizontal } from 'lucide-react';

interface Transaction {
  id: string;
  email: string;
  status: string;
  createdDate: string;
  value: number;
}

interface TransactionHistoryProps {
  transactions: Transaction[];
  growthPercentage?: number;
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ 
  transactions, 
  growthPercentage 
}) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="col-span-full rounded-lg border bg-white shadow-sm hover:shadow-lg transition-all duration-300">
      <div className="flex flex-col space-y-1.5 p-6">
        <div className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <h3 className="text-xl font-semibold">Transaction History</h3>
            <p className="text-sm text-gray-500 mt-1">Recent payment transactions</p>
          </div>
          <div className="flex items-center space-x-4">
            {growthPercentage && (
              <div className="flex items-center text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">+{growthPercentage}%</span>
              </div>
            )}
            <MoreHorizontal className="h-5 w-5 text-gray-400 cursor-pointer" />
          </div>
        </div>
      </div>
      <div className="p-6 pt-0">
        {transactions.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <TrendingUp className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-lg font-medium">No transactions yet</p>
            <p className="text-sm">Your transaction history will appear here</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3">Email</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3">Status</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3">Date</th>
                  <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider py-3">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 text-sm text-gray-900 font-medium">{transaction.email}</td>
                    <td className="py-4">
                      <span className={`px-2.5 py-1 text-xs rounded-full border font-medium ${getStatusColor(transaction.status)}`}>
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 text-sm text-gray-600">{new Date(transaction.createdDate).toLocaleDateString()}</td>
                    <td className="py-4 text-sm text-gray-900 text-right font-semibold">
                      ${transaction.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;