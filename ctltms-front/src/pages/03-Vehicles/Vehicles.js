import React, { Component } from 'react'
import axios from 'axios';
import styled from 'styled-components';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar'
import Table from '../../components/Table/Table';
import SearchBar from '../../components/SearchBar/SearchBar';
import '../../components/Global_style.css'
import './Vehicles.css'

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
        menuData:   [{"name": "ทั้งหมด", "amount": 85}, 
                    {"name": "พร้อมใช้งาน", "amount": 60}, 
                    {"name": "กำลังซ่อม", "amount": 6},
                    {"name": "เสีย", "amount": 3},
                    {"name": "รถร่วม", "amount": 16},],
        menuSelected: "ทั้งหมด",
        totalHeader: ['ที่', 'หมายเลขทะเบียน', 'หมวดจังหวัด', 'ขนาดรถ', 'ประเภทรถ', 'อุณหภูมิ ( ํc)', 'น้ำหนัก (ตัน)', 'สถานะการปฏิบัติงาน', 'สภาพรถ', 'แก้ไข'],
        totalData: [],
        customerHeader: ['ที่', 'ชื่อบัญชีผู้ใช้', 'สถานะบัญชี', 'ชื่อ-สกุล', 'ร้าน / บริษัท', 'ประเภทธุรกิจ', 'เบอร์โทรศัพท์', 'แก้ไข'],
        customerData: [],
        logHeader: ['ที่', 'Timestamp', 'ชื่อบัญชีผู้ใช้', 'Role', 'ชื่อ-สกุล', 'ร้าน / บริษัท', 'เบอร์โทรศัพท์'],
        logData: [],
    }

    componentDidMount() {
        axios.get(`http://localhost:4000/vehicle`)
        .then((res) => {
            let dataList = [];
            for(var i = 0; i < res.data.length; i++){
                let tmp = [];
                tmp.push(`${i+1}`);
                tmp.push(res.data[i].plate_no);
                tmp.push(res.data[i].plate_province);
                tmp.push(res.data[i].car_size);
                tmp.push(res.data[i].car_type);
                tmp.push(res.data[i].car_temp_start+ "-" +res.data[i].car_temp_end);
                tmp.push(res.data[i].weight);
                tmp.push(res.data[i].status_work);
                tmp.push(res.data[i].status_car);
                dataList.push(tmp);
            }
            this.setState({totalData: dataList});
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
                <Navbar />
                <div className="global-container">
                    <Sidebar menuIndex={3} />
                    <div className="global-content">
                        <div className="global-title">S03 - จัดการข้อมูลรถขนส่ง</div>
                        <SearchBar />
                        <div class="global-data">
                            <div className="global-menu">
                                {this.state.menuData.map( (menu) => (
                                    <MenuButton 
                                        onClick={() => this.handleSelect(menu.name)}
                                        name={menu.name}
                                        select={this.state.menuSelected}
                                    >
                                        {menu.name}
                                        {menu.amount? 
                                            <div class="global-amount-box">{menu.amount}</div>
                                            : null
                                        }
                                    </MenuButton>
                                ))}
                            </div>
{/* Content Start Here */}
                            {this.state.menuSelected==="ทั้งหมด"? 
                                <Table 
                                    theadData={this.state.totalHeader}
                                    tbodyData={this.state.totalData}
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