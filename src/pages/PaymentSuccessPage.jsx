import React from 'react';

const PaymentSuccessPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center text-green-600 mb-6">
          Payment Successful!
        </h1>
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Thank you for your payment. Your transaction has been completed successfully.
          </p>
          <p className="text-gray-500">
            You will receive a confirmation email shortly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
