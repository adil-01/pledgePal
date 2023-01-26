import styles from "../styles/Sidebar.module.css";
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from "next/router";

const Icon = ({ icon_styles, name, imgUrl, isActive, disabled, handleClick }) => (
    <div className={`${styles.icon} ${isActive && isActive === name ? styles["active"] : null} ${icon_styles}`} onClick={handleClick}>
      {!isActive ? (
        <img src={imgUrl} alt="fund_logo" className={styles.icon_img} />
      ) : (
        <img src={imgUrl} alt="fund_logo" className={`${styles.icon_img} ${isActive !== name ? styles.gray : null}`} />
      )}
    </div>
)

export default function SideBar({ initial }) {

  const router = useRouter();
  const [isActive, setIsActive] = useState(initial);

  return (
    <div className={styles.sidebar_wrap}>
        <div className={styles.sidebar_cont}>
            <div>
                <Link href="/">
                    <img className={styles.logo} src="/pledgePal_logo.png" alt="logo" />
                </Link>
            </div>
            <div className={styles.sidebar_bag}>
                <Icon key="dashboard" name="dashboard" isActive={isActive} imgUrl="/dashboard.svg"
                handleClick={() => {
                    setIsActive("dashboard");
                    router.push("/");
                }}
                />

                <Icon key="campaign" name="campaign" isActive={isActive} imgUrl="/create-campaign.svg"
                handleClick={() => {
                    setIsActive("campaign");
                    router.push("/create-campaign");
                }}
                />

                <Icon key="profile" name="profile" isActive={isActive} imgUrl="/profile.svg"
                handleClick={() => {
                    setIsActive("profile");
                    router.push("/profile");
                }}
                />
            </div>
        </div>
    </div>
  );
}
