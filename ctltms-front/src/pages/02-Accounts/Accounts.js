import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import SearchBar from '../../components/SearchBar/SearchBar';
import Table from '../../components/Table/Table';
// import AddAccountModal from './Modal-Accounts';
import '../../components/Global_style.css';
import './Accounts.css';
import AddAccountModal from './Modal-Accounts';

const MenuButton = styled.button`
    color: #404040;
    font-weight: 300;
    display: flex;
    border: none;
    box-shadow: none;
    background-color: white;
    padding: 0 0 2px 0;
    margin-right: 1.25rem;
    opacity: ${props => (props.select===props.name? "1" : "0.4")};
    border-bottom: ${props => (props.select===props.name? "3px solid #366F47" : null)};
`

export default class main extends Component {
    state = {
        menuData:   [{"name": "พนักงาน", "amount": 135}, 
                    {"name": "ลูกค้า", "amount": 235}, 
                    {"name": "ประวัติการเข้าใช้งาน"}],
        menuSelected: "พนักงาน",
        staffHeader: ['ที่', 'ชื่อบัญชีผู้ใช้', 'สถานะบัญชี', 'ชื่อ-สกุล', 'เบอร์โทรศัพท์', 'แก้ไข'],
        staffData: [],
        customerHeader: ['ที่', 'ชื่อบัญชีผู้ใช้', 'สถานะบัญชี', 'ชื่อ-สกุล', 'ร้าน / บริษัท', 'ประเภทธุรกิจ', 'เบอร์โทรศัพท์', 'แก้ไข'],
        customerData: [],
        logHeader: ['ที่', 'Timestamp', 'ชื่อบัญชีผู้ใช้', 'Role', 'ชื่อ-สกุล', 'ร้าน / บริษัท', 'เบอร์โทรศัพท์'],
        logData: [],
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

    getData_Customer = () => {
        axios.get(`http://localhost:4000/customeraccount`)
            .then((res) => {
                let customer = [];
                for(var i = 0; i < res.data.length; i++){
                    let tmp = [];
                    tmp.push(`${i+1}`);
                    tmp.push(res.data[i].account);
                    tmp.push(res.data[i].status);
                    tmp.push(res.data[i].first_name+" "+res.data[i].last_name);
                    tmp.push(res.data[i].company);
                    tmp.push(res.data[i].Business);
                    tmp.push(res.data[i].telephone);
                    customer.push(tmp);
                }
                this.setState({customerData: customer});
            });
        }

    getData_Log = () => {
        axios.get(`http://localhost:4000/log`)
            .then((res) => {
                let log = [];
                for(var i = 0; i < res.data.length; i++){
                    let tmp = [];
                    tmp.push(`${i+1}`);
                    tmp.push(res.data[i].timestamp);
                    tmp.push(res.data[i].account);
                    tmp.push(res.data[i].role);
                    tmp.push(res.data[i].first_name+" "+res.data[i].last_name);
                    tmp.push(res.data[i].company);
                    tmp.push(res.data[i].telephone);
                    log.push(tmp);
                }
                this.setState({logData: log});
            });
        }

    handleSelect = (name) => {
        this.setState({menuSelected: name});
        if (name==="ลูกค้า"){
            this.getData_Customer();
        } else if (name==="ประวัติการเข้าใช้งาน"){
            this.getData_Log();
        }
    }

    render(){
        return (
            <div>
                <AddAccountModal />
                <Navbar />
                <div className="global-container">
                    <Sidebar menuIndex={2} />
                    <div className="global-content">
                        <div className="global-title">S02 - จัดการบัญชีผู้ใช้</div>
                        <SearchBar page="Accounts"/>
                        <div className="global-data">
                            <div className="global-menu">
                                {this.state.menuData.map( (menu) => (
                                    <MenuButton 
                                        onClick={() => this.handleSelect(menu.name)}
                                        name={menu.name}
                                        select={this.state.menuSelected}
                                    >
                                        {menu.name}
                                        {menu.amount? 
                                            <div className="global-amount-box">{menu.amount}</div>
                                            : null
                                        }
                                    </MenuButton>
                                ))}
                            </div>
{/* Content Start Here */}
                            {this.state.menuSelected==="พนักงาน"? 
                                <Table 
                                    theadData={this.state.staffHeader}
                                    tbodyData={this.state.staffData}
                                    edit
                                /> 
                                : this.state.menuSelected==="ลูกค้า"?
                                    <Table 
                                        theadData={this.state.customerHeader}
                                        tbodyData={this.state.customerData}
                                        edit
                                    /> 
                                    :   <Table 
                                            theadData={this.state.logHeader}
                                            tbodyData={this.state.logData}
                                        />
                            }
                            
{/* Content End Here */}
                        </div>
                    </div>
                </div>
            </div>
        )
    }   
}