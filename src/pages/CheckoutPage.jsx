import React from 'react';
import { useParams } from 'react-router-dom';

const CheckoutPage = () => {
  const { offerId } = useParams();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">
          Checkout
        </h1>
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Offer ID: {offerId}
          </p>
          <p className="text-gray-500">
            Checkout functionality will be implemented here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
