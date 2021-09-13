import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import Table from '../../components/Table/Table';
import AddAccountModal from './Modal-Accounts';
import Filter from '../../components/FilterDropdown/AccountFilter';
import IconFilter from '../../images/filter.png';
import IconAdd from '../../images/add.png';
import '../../components/Global_style.css';
import './Accounts.css';

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
        showModal: false,
        showFilter: false,
        menuData:   [],
        menuSelected: "พนักงาน",
        staffHeader: ['ที่', 'ชื่อบัญชีผู้ใช้', 'สถานะบัญชี', 'ชื่อ-สกุล', 'ชื่อเล่น', 'เบอร์โทรศัพท์', 'แก้ไข'],
        staffData: [],
        customerHeader: ['ที่', 'ชื่อบัญชีผู้ใช้', 'สถานะบัญชี', 'ชื่อ-สกุล', 'ร้าน / บริษัท', 'ประเภทธุรกิจ', 'อีเมล', 'เบอร์โทรศัพท์', 'แก้ไข'],
        customerData: [],
        logHeader: ['ที่', 'Timestamp', 'ชื่อบัญชีผู้ใช้', 'Role', 'ชื่อ-สกุล', 'ร้าน / บริษัท', 'เบอร์โทรศัพท์'],
        logData: [],
    }

    staffAPI = axios.get("http://localhost:4000/staffaccount");
    customerAPI = axios.get("http://localhost:4000/customeraccount");

    componentDidMount(){
        axios
        .all([this.staffAPI, this.customerAPI])
        .then(
            axios.spread((...responses) => {
                const resStaff = responses[0];
                const resCustomer = responses[1];

                let amountCustomer = resCustomer.data.length;
                let amountStaff = resStaff.data.length;

                // staff section
                let staff = [];
                for(var i = 0; i < resStaff.data.length; i++){
                    let tmp = [];
                    tmp.push(`${i+1}`);
                    tmp.push(resStaff.data[i].account);
                    tmp.push(resStaff.data[i].status);
                    tmp.push(resStaff.data[i].first_name+" "+resStaff.data[i].last_name);
                    tmp.push(resStaff.data[i].nickname);
                    tmp.push(resStaff.data[i].telephone);
                    staff.push(tmp);
                }
                this.setState({staffData: staff});
                this.setState({ menuData: [
                    {"name": "พนักงาน", "amount": amountStaff}, 
                    {"name": "ลูกค้า", "amount": amountCustomer}, 
                    {"name": "ประวัติการเข้าใช้งาน"}
                ]});
            })
        )
        .catch( err => {
            console.log(err);
        })
    }

    getData_Staff = () => {
        axios.get(`http://localhost:4000/staffaccount`)
        .then((res) => {
            let staff = [];
            for(var i = 0; i < res.data.length; i++){
                let tmp = [];
                tmp.push(`${i+1}`);
                tmp.push(res.data[i].account);
                tmp.push(res.data[i].status);
                tmp.push(res.data[i].first_name+" "+res.data[i].last_name);
                tmp.push(res.data[i].nickname);
                tmp.push(res.data[i].telephone);
                staff.push(tmp);
            }
            this.setState({staffData: staff});
            let updateMenu = [...this.state.menuData];
            let staffMenu = {...updateMenu[0]};
            staffMenu.amount = res.data.length;
            updateMenu[0]=staffMenu;
            this.setState({menuData: updateMenu});
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
                    tmp.push(res.data[i].email);
                    tmp.push(res.data[i].telephone);
                    customer.push(tmp);
                }
                this.setState({customerData: customer});
                let updateMenu = [...this.state.menuData];
                let customerMenu = {...updateMenu[1]};
                customerMenu.amount = res.data.length;
                updateMenu[1]=customerMenu;
                this.setState({menuData: updateMenu});
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
        if(name==="ลูกค้า"){
            this.getData_Customer();
        } else if (name==="ประวัติการเข้าใช้งาน"){
            this.getData_Log();
        } else {
            this.getData_Staff();
        }
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
                <AddAccountModal 
                    showModal={this.state.showModal}
                    onClose={this.showModal}
                    onSubmit={this.updateData}
                />
                <Navbar />
                <div className="global-container">
                    <Sidebar menuIndex={2} />
                    <div className="global-content">
                        <div className="global-title">S02 - จัดการบัญชีผู้ใช้</div>
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

                        <div className="global-data">
                            <div className="global-menu">
                                {this.state.menuData.map( (menu) => (
                                    <MenuButton 
                                        onClick={() => this.handleSelect(menu.name)}
                                        name={menu.name}
                                        select={this.state.menuSelected}
                                    >
                                        {menu.name}
                                        {menu.amount || menu.amount===0? 
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
                                    name="พนักงาน"
                                    refFromMenu={2}
                                    edit
                                /> 
                                : this.state.menuSelected==="ลูกค้า"?
                                    <Table 
                                        theadData={this.state.customerHeader}
                                        tbodyData={this.state.customerData}
                                        name="ลูกค้า"
                                        refFromMenu={2}
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