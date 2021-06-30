import React from 'react';
import Filter from '../../images/filter.png'
import Add from '../../images/add.png'
import './SearchBar.css'

const SearchBar = () => {
    return (
        <div class="searchbar barContainer">
            <input 
                class="mainLoginInput" 
                type="text" 
                placeholder="&#61442;   ค้นหารายการ"
            />

            <button class="searchbar action-btn mr-10">
                <img src={Filter} alt="filter" width="16px" />
                <div class="searchbar action-btn-content">กรอง</div>
            </button>

            <button class="searchbar action-btn">
                <img src={Add} alt="add" width="16px" maginTop="4px" />
                <div class="searchbar action-btn-content">เพิ่มข้อมูล</div>
            </button>

        </div>
    );
};

export default SearchBar;

