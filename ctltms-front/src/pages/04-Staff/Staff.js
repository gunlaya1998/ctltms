import React, { Component } from 'react'
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar'
import Filter from '../../components/FilterDropdown/AccountFilter';
import IconFilter from '../../images/filter.png';
import IconAdd from '../../images/add.png';
import '../../components/Global_style.css';
import './Staff.css'

export default class main extends Component {
    state = {
        showModal: false,
        showFilter: false,
        menuData:   [],
        menuSelected: "พนักงาน",
    }
    

    componentDidMount(){

    }

    showModal = () => {
        this.setState(prev => ({
            showModal: !prev.showModal
        }));
    };

    showFilter = () => {
        this.setState(prev => ({
            showFilter: !prev.showFilter
        }));
    };

    render(){
        return (
            <div>
                <Navbar />
                <div className="global-container">
                    <Sidebar menuIndex={4} />
                    <div className="global-content">
                        <div className="global-title">S04 - จัดการข้อมูลพนักงาน</div>
                        {/* Search Bar START */}
                        <div className="searchbar barContainer">
                            <input 
                                className="mainLoginInput" 
                                type="text" 
                                placeholder="&#61442;   ค้นหารายการ"
                            />

                            <button 
                                className="searchbar action-btn mr-10"
                                onClick={this.showFilter}>
                                <img src={IconFilter} alt="filter" width="16px" />
                                <div className="searchbar action-btn-content">กรอง</div>
                            </button>

                            <button 
                                className="searchbar action-btn"
                                onClick={this.showModal}>
                                <img src={IconAdd} alt="add" width="16px" />
                                <div className="searchbar action-btn-content">เพิ่มข้อมูล</div>
                            </button>
                        </div>
                        <div className="accounts-filterStyle">
                            <Filter showFilter={this.state.showFilter} />
                        </div>
                        {/* Search Bar END */}
                        
{/* Content Start Here */}

{/* Content End Here */}
                    </div>
                </div>
            </div>
        )
    }   
}