import React, { Component } from 'react'
import axios from 'axios';
import styled from 'styled-components';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar'
import VehicleTable from '../../components/Vehicle_Table/Vehicle_Table'
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
    opacity: ${props => (props.select===props.id? "1" : "0.4")};
    border-bottom: ${props => (props.select===props.id? "3px solid #366F47" : null)};
`

export default class main extends Component {
    state = {
        menuData:   [{"menu_id": 1, "name": "ทั้งหมด", "amount": 85}, 
                    {"menu_id": 2, "name": "พร้อมใช้งาน", "amount": 60}, 
                    {"menu_id": 3, "name": "กำลังซ่อม", "amount": 6},
                    {"menu_id": 4, "name": "เสีย", "amount": 3},
                    {"menu_id": 5, "name": "รถร่วม", "amount": 16},],
        menuSelected: 1,
        totalHeader: ['ที่', 'หมายเลขทะเบียน', 'หมวดจังหวัด', 'ขนาดรถ', 'ประเภทรถ', 'อุณหภูมิ ( ํc)', 'น้ำหนัก (ตัน)', 'สถานะการปฏิบัติงาน', 'สภาพรถ', 'แก้ไข'],
        totalData: [],
        statusHeader: ['ที่', 'หมายเลขทะเบียน', 'หมวดจังหวัด', 'ขนาดรถ', 'ประเภทรถ', 'อุณหภูมิ ( ํc)', 'น้ำหนัก (ตัน)', 'สถานะการปฏิบัติงาน', 'แก้ไข'],
        availData: [],
        fixingData: [],
        oosData: [],
        assoHeader: ['ที่', 'ขนาดรถ', 'ประเภทรถ', 'อุณหภูมิ ( ํc)', 'น้ำหนัก (ตัน)', 'หมายเลขทะเบียน', 'บริษัท/เจ้าของรถ', 'เบอร์โทรศัพท์', 'เรทราคา/ชั่งโมง', 'แก้ไข'],
        assoData: [],
    }

    componentDidMount() {
        axios.get(`http://localhost:4000/vehicle`)
        .then((res) => {
            let dataList = [];
            for(var i = 0; i < res.data.length; i++){
                let tmp = {};
                tmp['no'] = `${i+1}`;
                tmp['plate_no'] = res.data[i].plate_no;
                tmp['plate_province'] = res.data[i].plate_province;
                tmp['car_brand'] = res.data[i].car_brand;
                tmp['car_model'] = res.data[i].car_model;
                tmp['car_size'] = res.data[i].car_size;
                tmp['car_type'] = res.data[i].car_type;
                tmp['car_temp_start'] = res.data[i].car_temp_start
                tmp['car_temp_end'] = res.data[i].car_temp_end;
                tmp['weight'] = res.data[i].weight;
                tmp['status_work'] = res.data[i].status_work;
                tmp['status_car'] = res.data[i].status_car;
                tmp['date_register'] = res.data[i].date_register;
                dataList.push(tmp);
            }
            this.setState({totalData: dataList});
        });
    }

    getData_Asso = () => {
        axios.get(`http://localhost:4000/customeraccount`)
            .then((res) => {
                let dataList = [];
                for(var i = 0; i < res.data.length; i++){
                    let tmp = {};
                    tmp['no'] = `${i+1}`;
                    tmp['plate_no'] = res.data[i].plate_no;
                    tmp['plate_province'] = res.data[i].plate_province;
                    tmp['car_brand'] = res.data[i].car_brand;
                    tmp['car_model'] = res.data[i].car_model;
                    tmp['car_size'] = res.data[i].car_size;
                    tmp['car_type'] = res.data[i].car_type;
                    tmp['car_temp_start'] = res.data[i].car_temp_start
                    tmp['car_temp_end'] = res.data[i].car_temp_end;
                    tmp['weight'] = res.data[i].weight;
                    tmp['owner'] = res.data[i].owner;
                    tmp['price'] = res.data[i].price;
                    dataList.push(tmp);
                }
                this.setState({customerData: dataList});
            });
        }

    handleSelect = (id) => {
        this.setState({menuSelected: id});
        if (id===5){
            this.getData_Asso();
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
                        <div className="global-data">
                            <div className="global-menu">
                                {this.state.menuData.map( (menu) => (
                                    <MenuButton 
                                        onClick={() => this.handleSelect(menu.menu_id)}
                                        id={menu.menu_id}
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
                            {this.state.menuSelected===1? 
                                <VehicleTable 
                                    theadData={this.state.totalHeader}
                                    tbodyData={this.state.totalData}
                                    edit
                                /> 
                                : this.state.menuSelected===2?
                                    <Table 
                                        theadData={this.state.statusHeader}
                                        tbodyData={this.state.availData}
                                        edit
                                    /> 
                                    : this.state.menuSelected===3?
                                        <Table 
                                            theadData={this.state.statusHeader}
                                            tbodyData={this.state.fixingData}
                                            edit
                                        /> 
                                        : this.state.menuSelected===4?
                                            <Table 
                                                theadData={this.state.statusHeader}
                                                tbodyData={this.state.oosData}
                                                edit
                                            /> 
                                            :   <Table 
                                                    theadData={this.state.assoHeader}
                                                    tbodyData={this.state.assoData}
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