import { useState, useEffect } from "react";
import { useStateContext } from "../context";
import styles from "../styles/home.module.css";
import SideBar from '../components/sideBar'; 
import NavBar from '../components/navBar'; 
import Card from '../components/Card'; 

export default function Profile() {

  const [isLoading, setIsLoading] = useState(true);
  const [campaigns, setCampaigns] = useState([]);

  const { address, contract, getUserCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getUserCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  }

  useEffect(() => {
    if(contract) fetchCampaigns();
  }, [address, contract]);

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <SideBar initial="profile" />
      </div>
      <div className={styles.campaigns_wrap}>
        <div className={styles.navbar}>
          <NavBar />
        </div>
        <h1 className={styles.heading}>Your campaigns ({campaigns.length})</h1>
        <div className={styles.cards_bag}>
          {isLoading && (
            <img src="./loader.svg" alt="loader" className={styles.loader} />
          )}

          {!isLoading && campaigns.length === 0 && (
            <p className={styles.no_result}>
              You have not created any campigns yet
            </p>
          )}

          {!isLoading && campaigns.length > 0 && campaigns.map((campaign) => <Card 
            key={campaign.id}
            {...campaign}
            handleClick={() => handleNavigate(campaign)}
          />)}
        </div>
      </div>  
    </div>
  );
}
