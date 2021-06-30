import React, { Component } from 'react'
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar'
// import Table from '../../components/Table/Table';
import '../../components/Global_style.css'
import './Vehicles.css'

export default class main extends Component {
    render(){
        return (
            <div>
                <Navbar />
                <div className="global-container">
                    <Sidebar menuIndex={3} />
                    <div className="global-content">
                        <div className="global-title">S03 - จัดการข้อมูลรถขนส่ง</div>
{/* Content Start Here */}

{/* Content End Here */}
                    </div>
                </div>
            </div>
        )
    }   
}