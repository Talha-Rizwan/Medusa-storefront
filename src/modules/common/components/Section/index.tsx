import React from 'react'
import { Wrapper,ContentTop,ContentMid,Content } from './section.style'

interface componentProps {
    title?: any;
    desc?: any;
    backgroundImg?: any;
    link?: any;
    leftbtn?: any;
    rightbtn?: any;
    arrow?: any;
    range?: any;
    speed?: any;
    hp?: any;
    top?: any;
    idx?: any;
    total?: any;
    children?: any;
    ContentContainer?: any; 
    containerClassNames?: any;
}


function Section({ title,desc,backgroundImg,link,leftbtn,rightbtn,arrow,range,speed,hp,top, idx, total, children, ContentContainer, containerClassNames }: componentProps) {

    return (
        <Wrapper bg={backgroundImg} className={containerClassNames}>
            {children}

            {/* <div 
            // TODO: Make classes
            style={{
                position: "fixed",
                zIndex: total - idx,
                height: "100vh",
                width: "100vw",
                top: 0,
                left: 0,
                maxWidth:  "100%",   // Won't cause horizontal scrollbars
                maxHeight: "100%",   // Won't cause vertical scrollbars 
                overflow: "none",
                pointerEvents: "none",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",


                width: '100vw',
                height: '100vh',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                // backgroundImage: '${props => `url('/images/${props.bg}')`} //url is by default in public section',
            
                display: 'flex',
                flexWrap: 'wrap',
                flexDirection: 'column',
                justifyContent: 'space-between',


            }}
            > */}
            <ContentTop>
                <h1>{title}</h1>
                <p>{desc} <a href='#'>{link}</a></p>
            </ContentTop>

            <div>
                <ContentMid className={arrow ? '' : 'buttons'} >
                    {leftbtn &&
                    <div className='left'>
                        <button>{leftbtn}</button>
                    </div>
                    }
                    {rightbtn && 
                        <div className='right'>
                            <button>{rightbtn}</button>
                        </div>
                    }
                </ContentMid>
                {range && 
                <Content>
                    <div className="Info-bar">
                        <div className="Specs" >
                            <h2>{range} mi</h2>
                            <p>Range (EPA est.)</p>
                        </div>
                        <div className="Specs" >
                            <h2>{speed}s</h2>
                            <p>0-60 mph*</p>
                        </div>
                        <div className="Specs" >
                            <h2>{top} mph</h2>
                            <p>Top Speed</p>
                        </div>
                        {hp && 
                        <div className="Specs hp" >
                            <h2>{hp} hp</h2>
                            <p>Peak Power</p>
                        </div>
                        }
                        <div className="order_btn">
                            <button> ORDER NOW </button>
                        </div>
                    </div>
                </Content>
                }
                {ContentContainer && 
                <Content>
                    {ContentContainer}
                </Content>
                }
                {arrow && 
                    <div className='arrow'>
                        <img src='/images/down-arrow.svg' alt='arrow'/>
                    </div>
                }
            </div>
            {/* </div> */}
        </Wrapper>
    )
}

export default Section
