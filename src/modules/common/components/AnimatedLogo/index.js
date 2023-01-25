


import {animatedLogo, underline} from "./style.module.css";
import Link from 'next/link';

const AnimatedLogo = ({containerStyles}) => {
    return (
        <Link href='/'>
        <div className={animatedLogo} style={{...containerStyles}}>
            <img src='/images/dorbi_no_line.png' alt='logo' style={{
                cursor: "pointer",
                width: "100%",
                height: "auto",
                // marginBottom: "2px",
        }}/>
            <div className={underline}></div>
        </div>
        </Link>
    )
}

export default AnimatedLogo;