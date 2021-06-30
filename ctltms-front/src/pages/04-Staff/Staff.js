import React, { Component } from 'react'
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar'
// import Table from '../../components/Table/Table';
import '../../components/Global_style.css'
import './Staff.css'

export default class main extends Component {
    render(){
        return (
            <div>
                <Navbar />
                <div className="global-container">
                    <Sidebar menuIndex={4} />
                    <div className="global-content">
                        <div className="global-title">S04 - จัดการข้อมูลพนักงาน</div>
{/* Content Start Here */}

{/* Content End Here */}
                    </div>
                </div>
            </div>
        )
    }   
}