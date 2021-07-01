import React from 'react';
import styled from 'styled-components';
import './MenuBar.css'

const MenuButton = styled.button`
    color: #404040;
    font-weight: 300;
    display: flex;
    border: none;
    box-shadow: none;
    background-color: white;
    padding: 0 0 3px 0;
    opacity: ${props => (props.select===true? "1" : "0.4")};
    border-bottom: ${props => (props.select===true? "3px solid #366F47" : null)};
`

const MenuBar = ({selected, name, amount}) => {
    return (
        <div class="menubar container">
            <MenuButton select={selected}>
                <div id={name}>{name}</div>
                {amount? 
                    <div class="amount-box">{amount}</div>
                    : null
                }
            </MenuButton>
        </div>
    );
};

export default MenuBar;

