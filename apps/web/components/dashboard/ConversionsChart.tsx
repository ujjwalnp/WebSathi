"use client";
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface ConversionData {
  name: string;
  value: number;
  color: string;
}

interface ConversionsChartProps {
  closingRate: number;
  abandonedCarts: number;
  wonCarts: number;
}

const ConversionsChart: React.FC<ConversionsChartProps> = ({ 
  closingRate, 
  abandonedCarts, 
  wonCarts 
}) => {
  const data: ConversionData[] = [
    { name: 'Abandoned', value: abandonedCarts, color: '#ef4444' },
    { name: 'Won', value: wonCarts, color: '#10b981' },
  ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx, cy, midAngle, innerRadius, outerRadius, percent
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize="12"
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="rounded-lg border bg-white shadow-sm hover:shadow-lg transition-all duration-300">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-lg font-semibold">Conversions</h3>
      </div>
      <div className="p-6 pt-0">
        <div className="flex items-center justify-between">
          <div className="w-40 h-40">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={60}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex-1 ml-6">
            <div className="text-center mb-4">
              <div className="text-3xl font-bold text-gray-900">{closingRate}%</div>
              <div className="text-sm text-gray-600">Closing Rate</div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                  <span className="text-sm text-gray-600">Abandoned</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{abandonedCarts}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm text-gray-600">Won Carts</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{wonCarts}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversionsChart;