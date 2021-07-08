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
        menuData:   [{"menu_id": 1, "name": "ทั้งหมด", "amount": null}, 
                    {"menu_id": 2, "name": "พร้อมใช้งาน", "amount": null}, 
                    {"menu_id": 3, "name": "กำลังซ่อม", "amount": null},
                    {"menu_id": 4, "name": "เสีย", "amount": null},
                    {"menu_id": 5, "name": "รถร่วม", "amount": null}],
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
            let amount_avail = 0;
            let amount_fixing = 0;
            let amount_oos = 0;
            for(var i = 0; i < res.data.length; i++){
                let tmp = {};
                tmp['no'] = `${i+1}`;
                tmp['plate_no'] = res.data[i].plate_no;
                tmp['plate_province'] = res.data[i].plate_province;
                tmp['car_brand'] = res.data[i].car_brand;
                tmp['car_model'] = res.data[i].car_model;
                tmp['car_size'] = res.data[i].car_size;
                if(tmp['car_size']==='หัวลากมีปั่นไฟพร้อมหาง' | tmp['car_size']==='หัวลากพร้อมหาง'){
                    tmp['car_type'] = '-';
                } else {
                    tmp['car_type'] = res.data[i].car_type;
                }
                tmp['car_temp_start'] = res.data[i].car_temp_start
                tmp['car_temp_end'] = res.data[i].car_temp_end;
                tmp['weight'] = res.data[i].weight;
                tmp['status_work'] = res.data[i].status_work;
                if(res.data[i].status_car === "พร้อมใช้งาน"){
                    amount_avail+=1;
                } else if(res.data[i].status_car === "กำลังซ่อม"){
                    amount_fixing+=1;
                } else {
                    amount_oos+=1;
                }
                tmp['status_car'] = res.data[i].status_car;
                tmp['date_register'] = res.data[i].date_register;
                dataList.push(tmp);
            }
            this.setState({totalData: dataList});
            this.setState({menuData: [{"menu_id": 1, "name": "ทั้งหมด", "amount": amount_avail+amount_fixing+amount_oos}, 
                {"menu_id": 2, "name": "พร้อมใช้งาน", "amount": amount_avail}, 
                {"menu_id": 3, "name": "กำลังซ่อม", "amount": amount_fixing},
                {"menu_id": 4, "name": "เสีย", "amount": amount_oos},
                {"menu_id": 5, "name": "รถร่วม", "amount": '...'}]});
        });
    }

    getData_avail = () => {
        let data = this.state.totalData;
        let dataList = [];
        let no = 1;
        for(const dict of data.entries()){
            if(dict[1]['status_car']==="พร้อมใช้งาน"){
                let tmp = [];
                tmp.push(no);
                tmp.push(dict[1]['plate_no']);
                tmp.push(dict[1]['plate_province']);
                tmp.push(dict[1]['car_size']);
                if(dict[1]['car_size']==='หัวลากมีปั่นไฟพร้อมหาง' | dict[1]['car_size']==='หัวลากพร้อมหาง'){
                    tmp.push('-');
                } else {
                    tmp.push(dict[1]['car_type']);
                }
                tmp.push(dict[1]['car_temp_start']+' - '+dict[1]['car_temp_end']);
                tmp.push(dict[1]['weight']);
                tmp.push(dict[1]['status_work']);
                dataList.push(tmp);
                no += 1;
            }
        }
        this.setState({availData: dataList});
    };

    getData_fixing = () => {
        let data = this.state.totalData;
        let dataList = [];
        let no = 1;
        for(const dict of data.entries()){
            if(dict[1]['status_car']==="กำลังซ่อม"){
                let tmp = [];
                tmp.push(no);
                tmp.push(dict[1]['plate_no']);
                tmp.push(dict[1]['plate_province']);
                tmp.push(dict[1]['car_size']);
                if(dict[1]['car_size']==='หัวลากมีปั่นไฟพร้อมหาง' | dict[1]['car_size']==='หัวลากพร้อมหาง'){
                    tmp.push('-');
                } else {
                    tmp.push(dict[1]['car_type']);
                }
                tmp.push(dict[1]['car_temp_start']+' - '+dict[1]['car_temp_end']);
                tmp.push(dict[1]['weight']);
                tmp.push(dict[1]['status_work']);
                dataList.push(tmp);
                no += 1;
            }
        }
        this.setState({fixingData: dataList});
    };

    getData_oos = () => {
        let data = this.state.totalData;
        let dataList = [];
        let no = 1;
        for(const dict of data.entries()){
            if(dict[1]['status_car']==="เสีย"){
                let tmp = [];
                tmp.push(no);
                tmp.push(dict[1]['plate_no']);
                tmp.push(dict[1]['plate_province']);
                tmp.push(dict[1]['car_size']);
                if(dict[1]['car_size']==='หัวลากมีปั่นไฟพร้อมหาง' | dict[1]['car_size']==='หัวลากพร้อมหาง'){
                    tmp.push('-');
                } else {
                    tmp.push(dict[1]['car_type']);
                }
            tmp.push(dict[1]['car_temp_start']+' - '+dict[1]['car_temp_end']);
                tmp.push(dict[1]['weight']);
                tmp.push(dict[1]['status_work']);
                dataList.push(tmp);
                no += 1;
            }
        }
        this.setState({oosData: dataList});
    };

    getData_Asso = () => {
        axios.get(`http://localhost:4000/vehicleAsso`)
            .then((res) => {
                let dataList = [];
                let amount_asso = 0;
                for(var i = 0; i < res.data.length; i++){
                    let tmp = [];
                    tmp.push(`${i+1}`);
                    tmp.push(res.data[i].car_size);
                    if(res.data[i].car_size==='หัวลากมีปั่นไฟพร้อมหาง' || res.data[i].car_size==='หัวลากพร้อมหาง'){
                        tmp.push('-');
                    } else {
                        tmp.push(res.data[i].car_type);
                    }
                    tmp.push(res.data[i].car_temp_start + ' - '+ res.data[i].car_temp_end);
                    tmp.push(res.data[i].weight);
                    tmp.push(res.data[i].plate_no);
                    tmp.push(res.data[i].owner);
                    tmp.push('0836985214');
                    tmp.push(res.data[i].price);
                    dataList.push(tmp);
                    amount_asso += 1;
                }
                this.setState({assoData: dataList});
                let updateMenu = [...this.state.menuData];
                let asso = {...updateMenu[4]};
                asso.amount = amount_asso;
                updateMenu[4]=asso;
                this.setState({menuData: updateMenu});
            });
        }

    handleSelect = (id) => {
        this.setState({menuSelected: id});
        if (id===2){
            this.getData_avail();
        }
        else if (id===3){
            this.getData_fixing();
        }
        else if (id===4){
            this.getData_oos();
        }
        else if (id===5){
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
                                        <div className="global-amount-box">
                                            {menu.amount}
                                        </div>
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
                                                    edit
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