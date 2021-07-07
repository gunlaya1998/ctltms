import React from 'react';
import styled from 'styled-components';
import './MenuBar.css'

const MenuButton = styled.button`
    color: #404040;
    font-weight: 300;
    display: flex;
    border: none;
    box-shadow: none;
    background-color:${props => (props.select===props.name? "green" : "red")};
    padding: 0 0 3px 0;
    opacity: ${props => (props.select===props.name? "1" : "0.4")};
    border-bottom: ${props => (props.select===props.name? "3px solid #366F47" : null)};
`

const MenuBar = ({selected, name, amount}) => {
    return (
        <div className="menubar container">
            <MenuButton select={selected} name={name}>
                <div id={name}>{name}</div>
                {amount? 
                    <div className="amount-box">{amount}</div>
                    : null
                }
            </MenuButton>
            {selected===name? <p>yes</p> : <p>no</p>}
            <p>{selected} : {name}</p>
        </div>
    );
};

export default MenuBar;

