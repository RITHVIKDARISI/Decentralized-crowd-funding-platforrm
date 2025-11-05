import React, { useState, useEffect } from 'react'
import { useActiveAccount } from 'thirdweb/react';

import { DisplayCampaigns } from '../components';
import { useStateContext } from '../context'

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const account = useActiveAccount();

  const { contract, getUserCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    if (!account) {
      setCampaigns([]);
      return;
    }
    
    setIsLoading(true);
    try {
      const data = await getUserCampaigns();
      setCampaigns(data);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      setCampaigns([]);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    if(contract && account) {
      fetchCampaigns();
    }
  }, [account?.address, contract]);

  return (
    <DisplayCampaigns 
      title={`My Campaigns (${account?.address ? campaigns.length : 0})`}
      isLoading={isLoading}
      campaigns={campaigns}
    />
  )
}

export default Profile