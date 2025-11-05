import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useActiveAccount, useDisconnect } from 'thirdweb/react';

const Logout = () => {
  const navigate = useNavigate();
  const account = useActiveAccount();
  const { disconnect } = useDisconnect();
  const [isDisconnecting, setIsDisconnecting] = useState(false);

  useEffect(() => {
    const handleLogout = async () => {
      if (account && !isDisconnecting) {
        setIsDisconnecting(true);
        try {
          // Disconnect the wallet
          await disconnect();
          console.log('Wallet disconnected successfully');
        } catch (error) {
          console.error('Error disconnecting wallet:', error);
        }
        
        // Redirect to home after logout
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else if (!account) {
        // If no account is connected, just redirect
        setTimeout(() => {
          navigate('/');
        }, 1000);
      }
    };

    handleLogout();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="bg-[#1c1c24] p-10 rounded-[10px] max-w-[600px] text-center">
        <h1 className="font-epilogue font-bold text-[32px] text-white mb-4">
          {account ? 'Logging Out...' : 'Already Logged Out'}
        </h1>
        <p className="font-epilogue text-[16px] text-[#808191] leading-[26px]">
          {account 
            ? 'Disconnecting your wallet. Redirecting to home page...'
            : 'Redirecting to home page...'
          }
        </p>
        <div className="mt-8">
          <div className="w-[100px] h-[100px] mx-auto rounded-full bg-[#2c2f32] flex items-center justify-center">
            <span className="text-[48px]">👋</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logout;
