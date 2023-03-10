import React from "react";

import { Wrapper,Content } from "./footer.syle";

const Footer = ({bottom}) =>{

    return(
        <Wrapper>
            <Content className={bottom} >
                <div>
                <a href="https://github.com/chirag-23/Tesla-clone-reactjs" target='_blank' rel="noreferrer" >Tesla-Clone &copy; 2022</a>
                </div>
                <div>
                <a href="mailto:chiragchouhan163@gmail.com" target='_blank' rel="noreferrer">Gmail</a>
                <a href="https://www.linkedin.com/in/chirag-chouhan-b48311228/" target="_blank" rel="noreferrer" >LinkedIn</a>
                <a href="https://github.com/chirag-23" target="_blank" rel="noreferrer" >GitHub</a>
                </div>
            </Content>
        </Wrapper>
    )
}

export default Footer