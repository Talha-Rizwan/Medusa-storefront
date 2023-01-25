import React,{ useState } from 'react'
import { Wrapper,Content,Content1 } from './header.style'
import Link from 'next/link';
import SideNav from '../SideNav'

// TODO: Purge Material icons, emotion and emotion/styled
import CloseIcon from '@mui/icons-material/Close';

const Header = () => {

    const [open,setOpen] = useState(false);

    return (
        <>
        <Wrapper>
            <div className='logo' >
            <Link href='/'>
                {/* <img src='/images/dorbi.png' alt='logo' style={{cursor: "pointer"}}/> */}
            </Link>
            </div>
            <Content>
                <Link href='/models'>Auto Care</Link>
                <Link href='/model3'>Metallic Coating</Link>
                <Link href='/modelx'>Forums</Link>
                {/* <Link href='/modely'>Model Y</Link>
                <Link href='#'>Solar Roof</Link>
                <Link href='#'>Solar Panels</Link> */}
                

            </Content>
            <Content1>
                <Link href='/store' className='none'><a href='#' className='none' >Shop</a></Link>
                <Link href='/account/profile' className='none'>Account</Link>
                <a href='#' onClick={()=> setOpen(true)} >Menu</a>
                
            </Content1>
            {open && 
            <div className='top'>
                <div className='close' onClick={()=> setOpen(false)}>
                    <CloseIcon/>
                </div>
            </div> 
            }       
            <SideNav show={open}/>
        </Wrapper>
        </>
    )
}

export default Header