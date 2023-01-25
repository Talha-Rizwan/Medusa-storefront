import React from 'react'
import { Wrapper,Content} from './sidenav.style'

import Link from 'next/link';

function SideNav({ show }) {

    return (
        <Wrapper show={show}>
            <Content>
                <Link href='/models'><li className='half'>Model S</li></Link>
                <Link href='/model3'><li className='half'>Model 3</li></Link>
                <Link href='/modelx'><li className='half'>Model X</li></Link>
                <Link href='/modely'><li className='half'>Model Y</li></Link>
                <li className='half'>Solar Roof</li>
                <li className='half'>Solar Panels</li>
                <li>Existing Inventory</li>
                <li>Used Inventory</li>
                <li>Trade-In</li>
                <li>Cybertruck</li>
                <li>Roadster</li>
                <li>Semi</li>
                <li>Charging</li>
                <li>Powerwall</li>
                <li>Commercial Energy</li>
                <li>Utilities</li>
                <li>Find Us</li>
                <li>Support</li>
                <li>Investor Relations</li>
                <li className='half' >Shop</li>
                <Link href='/login'><li className='half'>Account</li></Link>
                <li className='half'>More</li>
            </Content>
        </Wrapper>
    )
}

export default SideNav