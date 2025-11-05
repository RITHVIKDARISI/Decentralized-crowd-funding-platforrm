import React, { useContext, createContext } from 'react';
import { parseEther } from 'viem';
import { client } from '../client';
import { defineChain, getContract } from 'thirdweb';
import {
  useSendAndConfirmTransaction,
  useActiveAccount,
} from 'thirdweb/react';
import { prepareContractCall, readContract } from 'thirdweb'
import { useReadContract } from 'thirdweb/react'

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const contract = getContract({
    client,
    chain: defineChain(11155111), // Sepolia testnet
    address: '0x5DE9De05724b8860899ab0169E2d4FE17FaBAE68', // Use the same address as in client.ts
  });

  const { mutateAsync: sendTx } = useSendAndConfirmTransaction();
  const account = useActiveAccount();

  const publishCampaign = async (form) => {
    try {
      if (!account) {
        alert('Please connect your wallet first!');
        throw new Error('No wallet connected');
      }

      // Validate deadline is in the future
      const deadlineTimestamp = Math.floor(new Date(form.deadline).getTime() / 1000);
      const currentTimestamp = Math.floor(Date.now() / 1000);
      
      if (deadlineTimestamp <= currentTimestamp) {
        alert('Please select a future date for the deadline!');
        throw new Error('Deadline must be in the future');
      }

      console.log('Creating campaign with data:', {
        owner: account.address,
        title: form.title,
        description: form.description,
        target: form.target,
        deadline: form.deadline,
        deadlineTimestamp: deadlineTimestamp,
        currentTimestamp: currentTimestamp,
        image: form.image,
      });

      const transaction = prepareContractCall({
        contract,
        method:
          'function createCampaign(address _owner, string _title, string _description, uint256 _target, uint256 _deadline, string _image) returns (uint256)',
        params: [
          account.address,
          form.title,
          form.description,
          parseEther(form.target),
          BigInt(deadlineTimestamp),
          form.image,
        ],
      });

      console.log('Transaction prepared, sending...');
      
      const result = await sendTx(transaction);

      console.log('Campaign created successfully!', result);
      alert('Campaign created successfully! Transaction hash: ' + (result.transactionHash || 'pending'));
      return result;
    } catch (error) {
      console.error('Contract call failure:', error);
      
      // Provide more specific error messages
      let errorMessage = error.message || 'Unknown error';
      
      if (errorMessage.includes('deadline')) {
        errorMessage = 'Deadline validation failed. Please select a future date.';
      } else if (errorMessage.includes('user rejected')) {
        errorMessage = 'Transaction was rejected by user.';
      } else if (errorMessage.includes('insufficient funds')) {
        errorMessage = 'Insufficient funds for transaction.';
      }
      
      alert(`Failed to create campaign: ${errorMessage}`);
      throw error;
    }
  };

  const getCampaigns = async () => {
    const campaigns = await readContract({
      contract,
      method:
        "function getCampaigns() view returns ((address owner, string title, string description, uint256 target, uint256 deadline, uint256 amountCollected, string image, address[] donators, uint256[] donations)[])",
      params: [],
    });

    const parsedCampaigns = campaigns.map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: campaign.target.toString(),
      deadline: Number(campaign.deadline),
      amountCollected: campaign.amountCollected.toString(),
      image: campaign.image,
      pId: i,
    }));

    return parsedCampaigns;
  };

  const getUserCampaigns = async () => {
    try {
      const allCampaigns = await readContract({
        contract,
        method:
          'function getCampaigns() view returns ((address owner, string title, string description, uint256 target, uint256 deadline, uint256 amountCollected, string image, address[] donators, uint256[] donations)[])',
        params: [],
      });

      const filteredCampaigns = allCampaigns
        .map((campaign, i) => ({
          owner: campaign.owner,
          title: campaign.title,
          description: campaign.description,
          target: campaign.target.toString(),
          deadline: Number(campaign.deadline),
          amountCollected: campaign.amountCollected.toString(),
          image: campaign.image,
          pId: i,
        }))
        .filter((campaign) => campaign.owner.toLowerCase() === account?.address.toLowerCase());

      return filteredCampaigns;
    } catch (error) {
      console.error('Error fetching user campaigns:', error);
      return [];
    }
  };

  const donate = async (pId, amount) => {
    try {
      const transaction = await prepareContractCall({
        contract,
        method: 'function donateToCampaign(uint256 _id) payable',
        params: [pId],
        value: parseEther(amount),
      });

      const { transactionHash } = await sendTx({
        transaction,
        account,
      });

      console.log('Donation successful:', transactionHash);
    } catch (error) {
      console.log('Donation failed:', error);
    }
  };

  const getDonations = async (pId) => {
    const donations = await readContract({
      contract,
      method: 'function getDonators(uint256 _id) view returns (address[], uint256[])',
      params: [pId],
    });

    const numberOfDonations = donations[0].length;
    const parsedDonations = [];

    for (let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: donations[1][i].toString(),
      });
    }

    return parsedDonations;
  };

  return (
    <StateContext.Provider
      value={{
        address: account?.address || '',
        contract,
        createCampaign: publishCampaign,
        getCampaigns,
        getUserCampaigns,
        donate,
        getDonations,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
