import React, { Component } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import SearchBar from '../../components/SearchBar/SearchBar';
import MenuBar from '../../components/MenuBar/MenuBar';
import Table from '../../components/Table/Table';
import '../../components/Global_style.css';
import './Accounts.css';

export default class main extends Component {
    state = {
        menuSelected: 1,
        staffHeader: ['ที่', 'ชื่อบัญชีผู้ใช้', 'สถานะบัญชี', 'ชื่อ-สกุล', 'เบอร์โทรศัพท์', 'แก้ไข'],
        staffData: [],
    }

    componentDidMount() {
        axios.get(`http://localhost:4000/staffaccount`)
        .then((res) => {
            let staff = [];
            for(var i = 0; i < res.data.length; i++){
                let tmp = [];
                tmp.push(`${i+1}`);
                tmp.push(res.data[i].account);
                tmp.push(res.data[i].status);
                tmp.push(res.data[i].first_name+" "+res.data[i].last_name);
                tmp.push(res.data[i].telephone);
                staff.push(tmp);
            }
            this.setState({staffData: staff});
        });
    }

    render(){
        return (
            <div>
                <Navbar />
                <div className="global-container">
                    <Sidebar menuIndex={2} />
                    <div className="global-content">
                        <div className="global-title">S02 - จัดการบัญชีผู้ใช้</div>
                        <SearchBar />
                        <div class="global-data">
                            <div className="account-menu">
                                <MenuBar selected={true} name="พนักงาน" amount={135}/>
                                <MenuBar name="ลูกค้า" amount={235}/>
                                <MenuBar name="ประวัติการเข้าใช้งาน"/>
                            </div>
                        
{/* Content Start Here */}
                            <Table 
                                theadData={this.state.staffHeader}
                                tbodyData={this.state.staffData}
                                edit
                            />
{/* Content End Here */}
                        </div>
                    </div>
                </div>
            </div>
        )
    }   
}