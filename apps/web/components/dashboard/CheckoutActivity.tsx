
import React from 'react';

interface CheckoutActivityProps {
  title?: string;
}

const CheckoutActivity: React.FC<CheckoutActivityProps> = ({ 
  title = "Checkout Activity" 
}) => {
  return (
    <div className="rounded-lg border bg-white shadow-sm hover:shadow-lg transition-all duration-300">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <div className="p-6 pt-0">
        <div className="text-center py-8 text-gray-500">
          <p>No data</p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutActivity;
