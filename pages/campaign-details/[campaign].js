import React, { useState, useEffect } from 'react'
import { useRouter } from "next/router";
import { useStateContext } from '../../context';
import { ethers } from 'ethers';
import { calculateBarPercentage } from '../../utils';
import SideBar from '../../components/sideBar'; 
import styles from "../../styles/details.module.css";
import Loader from '../../components/Loader';
import Toast from '../../components/Toast';


const CountBox = ({ title, value }) => (
    <div className={styles.box_bag}>
        <span className={styles.box_num}>{value}</span>
        <div className={styles.box_text}>{title}</div>
    </div>
)

const CampaignDetails = ({ id }) => {
    
    const router = useRouter();
    console.log(router.query.id);
    const { donate, getDonations, contract, address, getCampaign } = useStateContext();

    const [isLoading, setIsLoading] = useState(true);
    const [amount, setAmount] = useState('');
    const [donators, setDonators] = useState([]);
    const [campaign, setCampaign] = useState([]);

    const fetchCampaign = async () => {
        setIsLoading(true);
        const data = await getCampaign(router.query.id);
        setCampaign(data);
        // setIsLoading(false);
    }

    const fetchDonators = async () => {
        setIsLoading(true);
        const data = await getDonations(router.query.id);
        setDonators(data);
        setIsLoading(false);
    }

    useEffect(() => {
        if(contract) {
            fetchCampaign();
            fetchDonators();
        }
    }, [contract, address])


    const handleDonate = async () => {

        if (amount <= 0){
            alert("Please donate a positive amount")
            return;
        }
        
        setIsLoading(true);
        const data = await donate(router.query.id, amount); 
        router.push({
            pathname: "/",
            query: {
                "status": data.status,
                "message": data.message
            }
        });
        setIsLoading(false);
    }

  return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <SideBar initial="dashboard" />
            </div>
            <Toast type="success" isActive={false}
            message="Transaction in successful" />
            {isLoading ? <Loader /> : null}
            <div className={styles.details_cover}>
                <div className={styles.details_wrap}>
                    <div style={{ display: 'flex', flexDirection: 'column', flex: 3, height: '305px'}}>
                        <img src={campaign.imageUrl} alt="campaign" className={styles.banner}/>
                        <div className={styles.percent_wrap}>
                            <div style={{ width: `${calculateBarPercentage(campaign.target, campaign.amountCollected)}%`, 
                            maxWidth: '100%', position: 'absolute', height: '5px', backgroundColor: '#4acd84'}}></div>
                        </div>
                    </div>

                    <div className={styles.box_wrap}>
                        <CountBox title={'Days left'} value={campaign.deadline} />
                        <CountBox title={`Raised of ${campaign.target}`} value={campaign.amountCollected} />
                        <CountBox title={'Total Backers'} value={donators.length} />
                    </div>
                </div>

                <div style={{display: 'flex'}}>
                    <div style={{flex: 2, marginRight: '20px'}}>
                        <div>
                            <h4 className={styles.sub_heading}>Creator</h4>

                            <div className={styles.user_wrap}>
                                <div className={styles.account_wrap}>
                                    <img src="../thirdweb.svg" alt="user" className={styles.account_img}/>
                                </div>
                                <div style={{display: 'flex', flexDirection: 'column'}}>
                                    <span className={styles.acc_text}>{campaign.owner}</span>
                                    <div style={{fontSize: '13px', marginTop: '4px'}}>10 Campaigns</div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className={styles.sub_heading}>Story</h4>

                            <div style={{width: '90%'}}>
                                <span className={styles.desc}>{campaign.description}</span>
                            </div>
                        </div>

                        <div>
                            <h4 className={styles.sub_heading}>Donators</h4>

                            <div className="mt-[20px] flex flex-col gap-4">
                                {donators.length > 0 ? donators.map((item, index) => (
                                <div key={`${item.donator}-${index}`} 
                                style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <span className={styles.don_num}>{index + 1}. {item.donator}</span>
                                    <span className={styles.don_acc}>{item.donation}</span>
                                </div>
                                )) : (
                                <span className={styles.desc}>No donators yet. Be the first one!</span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className={styles.sub_heading}>Fund</h4>   

                        <div className={styles.fund_wrap}>
                            <span className={styles.fund_heading}>Fund the campaign</span>
                            <div style={{marginTop: '15px', display: 'flex', flexDirection: 'column'}} >
                                <input required type="number" placeholder="ETH 0.1" step="0.01"
                                    className={styles.fund_input}
                                    value={amount} onChange={(e) => setAmount(e.target.value)} />

                                <div style={{marginTop: '15px', backgroundColor: '#13131a', padding: '18px', borderRadius: '10px'}}>
                                    <div style={{fontWeight: '600', marginBottom: '8px'}}>Back it because you believe in it.</div>
                                    <span style={{color: '#808191'}}>Support the project for no reward, just because it speaks to you.</span>
                                </div>

                                <button className={styles.btn} onClick={() => handleDonate()}> DONATE</button>
                                    
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default CampaignDetails