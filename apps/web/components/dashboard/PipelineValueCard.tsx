'use client';

import React, { useState } from 'react';
import { TrendingUp, ChevronDown } from 'lucide-react';

interface PipelineValueCardProps {
  pipelineProgress: number;
  closedValue: number;
  totalValue: number;
  description?: string;
}

const PipelineValueCard: React.FC<PipelineValueCardProps> = ({ 
  pipelineProgress, 
  closedValue, 
  totalValue, 
  description 
}) => {
  const [selectedPipeline, setSelectedPipeline] = useState('lead-cycle');
  const [isOpen, setIsOpen] = useState(false);

  const pipelineOptions = [
    { value: 'lead-cycle', label: 'Lead Cycle' },
    { value: 'sales-cycle', label: 'Sales Cycle' },
    { value: 'customer-cycle', label: 'Customer Cycle' },
  ];

  return (
    <div className="bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-sm font-medium text-gray-600 flex items-center justify-between">
          Pipeline Value
          <TrendingUp className="h-4 w-4 text-cyan-600" />
        </h3>
      </div>
      <div className="p-6 pt-0">
        <div className="space-y-4">
          <div>
            <div className="text-xs text-gray-500 mb-2">Pipeline Progress</div>
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium">Closed ${closedValue.toLocaleString()}</span>
              <span className="text-gray-500">Total ${totalValue.toLocaleString()}</span>
            </div>
            <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-200">
              <div 
                className="h-full w-full flex-1 bg-cyan-500 transition-all"
                style={{ transform: `translateX(-${100 - pipelineProgress}%)` }}
              />
            </div>
            <div className="text-xs text-gray-500 mt-1">{pipelineProgress}% completed</div>
          </div>
          
          {description && (
            <p className="text-sm text-gray-600">
              {description}
            </p>
          )}
          
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Select Pipeline</label>
            <div className="relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
              >
                <span>{pipelineOptions.find(opt => opt.value === selectedPipeline)?.label}</span>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </button>
              {isOpen && (
                <div className="absolute z-50 mt-1 w-full rounded-md border bg-white shadow-md">
                  <div className="p-1">
                    {pipelineOptions.map((option) => (
                      <div
                        key={option.value}
                        className="relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-2 pr-2 text-sm outline-none hover:bg-gray-100"
                        onClick={() => {
                          setSelectedPipeline(option.value);
                          setIsOpen(false);
                        }}
                      >
                        {option.label}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PipelineValueCard;
