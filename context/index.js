import React, { useContext, createContext } from 'react';
import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { daysLeft } from '../utils';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract('0x06f91e6B6045DF580159A4f85ddBF62cC41D0C7b');
  const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign');

  const address = useAddress();
  const connect = useMetamask();

  const publishCampaign = async (form) => {
    try {
      const data = await createCampaign([
        address, // owner
        form.title, // title
        form.description, // description
        form.target,
        new Date(form.deadline).getTime(), // deadline,
        form.imageUrl
      ])

      console.log("contract call success", data)
      return {"status": "success", "message": "Your campaign started successfully"}
    } catch (error) {
      console.log("contract call failure", error)
      return {"status": "error", "message": "Transaction failed. Please try again"}
    }
  }

  const getCampaigns = async () => {
    const campaigns = await contract.call('getCampaigns');

    const parsedCampaings = campaigns.map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
      imageUrl: campaign.imageUrl,
      pId: i
    }));

    return parsedCampaings;
  }

  const getUserCampaigns = async () => {
    const allCampaigns = await getCampaigns();

    const filteredCampaigns = allCampaigns.filter((campaign) => campaign.owner === address);

    return filteredCampaigns;
  }

  const getCampaign = async (pId) => {

    const campaign = await contract.call('campaigns', pId);
    let camp = {}
    camp["owner"] = campaign.owner;
    camp["title"] = campaign.title;
    camp["description"] = campaign.description;
    camp["target"] = ethers.utils.formatEther(campaign.target.toString());
    camp["deadline"] = daysLeft(campaign.deadline.toNumber());
    camp["amountCollected"] = ethers.utils.formatEther(campaign.amountCollected.toString());
    camp["imageUrl"] = campaign.imageUrl;
    return camp;
  }

  const donate = async (pId, amount) => {
    try {
      const data = await contract.call('donateToCampaign', 
      pId, { value: ethers.utils.parseEther(amount)});
      return {"status": "success", "message": "Your donation is successfully"} 
    } catch (error) {
      return {"status": "error", "message": "Donation transaction failed. Please try again"}
    }
  }

  const getDonations = async (pId) => {
    const donations = await contract.call('getDonators', pId);
    const numberOfDonations = donations[0].length;

    const parsedDonations = [];

    for(let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString())
      })
    }

    return parsedDonations;
  }


  return (
    <StateContext.Provider
      value={{ 
        address,
        contract,
        connect,
        createCampaign: publishCampaign,
        getCampaigns,
        getCampaign,
        getUserCampaigns,
        donate,
        getDonations
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext);