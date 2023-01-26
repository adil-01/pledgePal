import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from "next/router";
import styles from "../styles/Navbar.module.css";
import { useStateContext } from '../context';

export default function NavBar() {

    const router = useRouter();
    const { connect, address } = useStateContext();
    const [isActive, setIsActive] = useState('dashboard');
    const [toggleDrawer, setToggleDrawer] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className={styles.navbar_cont}>
            <div className={styles.search_box}>
                <input type="search" placeholder="search for a campaign..." 
                    value={searchQuery} onChange={e => {setSearchQuery(e.target.value);}}/>
                <i className="fa fa-search"></i>
            </div>
            <button className={`${styles.btn} ${!address ? styles["connected"] : null}`}
            onClick={() => {
                if(address) router.push('/create-campaign')
                else connect()
            }}>
                {address ? 'Create a campaign' : 'Connect'}
            </button>
        </div>
    );
}
