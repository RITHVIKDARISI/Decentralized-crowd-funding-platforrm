import React from 'react';

const Payment = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="bg-[#1c1c24] p-10 rounded-[10px] max-w-[600px] text-center">
        <h1 className="font-epilogue font-bold text-[32px] text-white mb-4">
          Payment Feature
        </h1>
        <p className="font-epilogue text-[16px] text-[#808191] leading-[26px]">
          This feature is coming soon! You'll be able to manage your payments and transactions here.
        </p>
        <div className="mt-8">
          <div className="w-[100px] h-[100px] mx-auto rounded-full bg-[#2c2f32] flex items-center justify-center">
            <span className="text-[48px]">💳</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
