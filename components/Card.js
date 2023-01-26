
import { daysLeft } from '../utils';
import styles from "../styles/Card.module.css";

const Card = ({ owner, title, description, target, deadline, amountCollected, imageUrl, handleClick }) => {
    const remainingDays = daysLeft(deadline);
  
    return (
        <div className={styles.card_wrap} onClick={handleClick}>
            <img src={imageUrl} alt="fund" className={styles.thumb} />

            <div className={styles.card_details}>

                <div className={styles.card_text}>
                    <h3 className={styles.card_heading}>{title}</h3>
                    <p className={styles.card_para}>{description}</p>
                </div>

                <div className={styles.amount_wrap}>
                    <div className="flex flex-col">
                        <span className={styles.amount}>{amountCollected}</span>
                        <div className={styles.amount_text}>Raised of {target}</div>
                    </div>
                    <div className="flex flex-col">
                        <span className={styles.amount}>{remainingDays}</span>
                        <div className={styles.amount_text}>Days Left</div>
                    </div>
                </div>

                <div className={styles.user_wrap}>
                    <div className={styles.account_wrap}>
                        <img src="./thirdweb.svg" alt="user" className={styles.account_img}/>
                    </div>
                    <p className={styles.acc_text}>by <b>{owner}</b></p>
                </div>
            </div>
        </div>
    )
}

export default Card;