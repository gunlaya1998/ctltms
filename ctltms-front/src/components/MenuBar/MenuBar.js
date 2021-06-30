import React from 'react';
import './MenuBar.css'

const MenuBar = ({name, amount}) => {
    return (
        <div class="menubar container">
            <button class="menubar menu-btn">
                <div id={name}>{name}</div>
                {amount? 
                    <div class="amount-box">{amount}</div>
                    : null
                }
            </button>
        </div>
    );
};

export default MenuBar;

