import { ConnectWallet } from "@thirdweb-dev/react";
import { useState, useEffect } from "react";
import { useStateContext } from "../context";
import { slugify } from '../utils';
import styles from "../styles/Home.module.css";
import SideBar from '../components/sideBar'; 
import NavBar from '../components/navBar'; 
import Card from '../components/Card'; 
import Toast from '../components/Toast';
import { useRouter } from "next/router";

export default function Home() {

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [campaigns, setCampaigns] = useState([]);
  const [toast, setToast] = useState(router.query.status ? true : false);

  const { address, contract, getCampaigns } = useStateContext();

  const handleNavigate = (campaign) => {
    router.push({
      pathname: `/campaign-details/${slugify(campaign.title)}`,
      query: {id: campaign.pId}
    })
  }

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  }

  useEffect(() => {
    if(contract) fetchCampaigns();
  }, [address, contract]);

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <SideBar initial="dashboard" />
      </div>
      {/* <div className={styles.connect}>
        <ConnectWallet />
      </div> */}
      {toast ? 
        <Toast type={router.query.status} isActive={true}
        message={router.query.message} /> : null
      }
      <div className={styles.campaigns_wrap}>
        <div className={styles.navbar}>
          <NavBar />
        </div>
        <h1 className={styles.heading}>All campaigns ({campaigns.length})</h1>
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
            key={campaign.pId}
            {...campaign}
            handleClick={() => handleNavigate(campaign)}
          />)}
        </div>
      </div>  
    </div>
  );
}
