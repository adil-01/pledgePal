import { ConnectWallet } from "@thirdweb-dev/react";
import { useState } from 'react';
import styles from "../styles/create-campaign.module.css";
import SideBar from '../components/sideBar'; 
import NavBar from '../components/navBar'; 
import FormField from '../components/formField'; 
import Loader from '../components/Loader';
import { ethers } from 'ethers';
import { checkIfImage } from '../utils';
import Link from 'next/link';
import { useRouter } from "next/router";
import { useStateContext } from '../context';

export default function CreateCampaign() {

    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const { createCampaign } = useStateContext();
    const [form, setForm] = useState({
        name: '',
        title: '',
        description: '',
        target: '', 
        deadline: '',
        imageUrl: ''
    });

    const handleFormFieldChange = (fieldName, e) => {
        setForm({ ...form, [fieldName]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(form);
    
        checkIfImage(form.imageUrl, async (exists) => {
          if(exists) {
            setIsLoading(true);
            const data = await createCampaign({ ...form, target: ethers.utils.parseUnits(form.target, 18)})
            setIsLoading(false);
            router.push({
                pathname: "/",
                query: {
                    "status": data.status,
                    "message": data.message
                }
            });
          } else {
            alert('Provide valid image URL')
            setForm({ ...form, imageUrl: '' });
          }
        })
      }
    
    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <SideBar initial="campaign" />
            </div>
            <div className={styles.form_cont}>
                {isLoading && <Loader />}
                <div className={styles.heading_wrap}>
                    <h1>Start a Campaign</h1>
                </div>

                <form onSubmit={handleSubmit} className={styles.form_bag}>
                    <div className={styles.inline}>
                        <FormField 
                            labelName="Your Name *"
                            placeholder="John Doe"
                            inputType="text"
                            value={form.name}
                            handleChange={(e) => handleFormFieldChange('name', e)}
                        />
                        <FormField 
                            labelName="Campaign Title *"
                            placeholder="Write a title"
                            inputType="text"
                            value={form.title}
                            handleChange={(e) => handleFormFieldChange('title', e)}
                        />
                    </div>

                    <FormField 
                        labelName="Story *"
                        placeholder="Write your story"
                        isTextArea
                        value={form.description}
                        handleChange={(e) => handleFormFieldChange('description', e)}
                    />

                    {/* <div className="w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px]">
                    <img src={money} alt="money" className="w-[40px] h-[40px] object-contain"/>
                    <h4 className="font-epilogue font-bold text-[25px] text-white ml-[20px]">You will get 100% of the raised amount</h4>
                    </div> */}

                    <div className={styles.inline}>
                        <FormField 
                            labelName="Goal *"
                            placeholder="ETH 0.50"
                            inputType="number"
                            value={form.target}
                            handleChange={(e) => handleFormFieldChange('target', e)}
                        />
                        <FormField 
                            labelName="End Date *"
                            placeholder="End Date"
                            inputType="date"
                            value={form.deadline}
                            handleChange={(e) => handleFormFieldChange('deadline', e)}
                        />
                    </div>

                    <FormField 
                        labelName="Campaign image *"
                        placeholder="Place image URL of your campaign"
                        inputType="url"
                        value={form.image}
                        handleChange={(e) => handleFormFieldChange('imageUrl', e)}
                    />

                    <button type="submit" className={styles.btn}> Create Campaign</button>

                </form>
            </div>

        {/* <div className={styles.connect}>
            <ConnectWallet />
        </div> */}
        </div>
    );
}
