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
        staffHeader: ['ที่', 'ชื่อบัญชีผู้ใช้', 'สถานะบัญชี', 'ชื่อ-สกุล', 'เบอร์โทรศัพท์', 'อีเมล', 'แก้ไข'],
        tbodyData:  [["1", "johny y.", "john","0812345678", "working", "cp1523"], 
        ["2", "alexa p.", "nile","0912345678", "pending", "sk5424"],
        ["3", "jenny h.", "jay","0212345678", "working", "jh2563"],
        ["4", "johny y.", "john","0812345678", "working", "cp1523"], 
        ["5", "alexa p.", "nile","0912345678", "pending", "sk5424"],
        ["6", "jenny h.", "jay","0212345678", "working", "jh2563"]],
        staffData: [],
    }

    componentDidMount() {
        axios.get(`https://jsonplaceholder.typicode.com/users`)
                .then(res => {
                const persons = res.data;
                this.setState({ persons });
            })
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
                                <MenuBar name="พนักงาน" amount={135}/>
                                <MenuBar name="ลูกค้า" amount={235}/>
                                <MenuBar name="ประวัติการเข้าใช้งาน"/>
                            </div>
                        
{/* Content Start Here */}
                            <Table 
                                theadData={this.state.staffHeader}
                                tbodyData={this.state.tbodyData}
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