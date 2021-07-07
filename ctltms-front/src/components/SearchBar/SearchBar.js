import React from 'react';
import Filter from '../../images/filter.png'
import Add from '../../images/add.png'
import './SearchBar.css'

const SearchBar = () => {
    return (
        <div className="searchbar barContainer">
            <input 
                className="mainLoginInput" 
                type="text" 
                placeholder="&#61442;   ค้นหารายการ"
            />

            <button className="searchbar action-btn mr-10">
                <img src={Filter} alt="filter" width="16px" />
                <div className="searchbar action-btn-content">กรอง</div>
            </button>

            <button className="searchbar action-btn">
                <img src={Add} alt="add" width="16px" />
                <div className="searchbar action-btn-content">เพิ่มข้อมูล</div>
            </button>

        </div>
    );
};

export default SearchBar;

