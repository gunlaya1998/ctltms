import React, { Component } from 'react'
import styled from 'styled-components';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import close from '../../images/exit-buttom@2x.png'
import './Modal-Vehicles.css';

const MenuButton = styled.button`
    font-size: 1rem;
    width: 6rem;
    color: ${props => (props.select===props.name? 'white' : "#366F47")};
    font-weight: 300;
    display: flex;
    justify-content: center;
    border: ${props => (props.select===props.name? '1px solid #366F47' : "none")};
    border-top-right-radius: 6px;
    border-top-left-radius: 6px;
    background-color:${props => (props.select===props.name? '#366F47' : "white")};
    padding: 5px 0;
    border-bottom: ${props => (props.select===props.name? null : "2px solid #366F47")};
`

export default class main extends Component {
    state = {
        menuSelected: 'own',
        optionProvince: [],
        optionCarSize: [],
        optionCarType: [],
        ownVehicleData: null,
        assoVehicleData: null,
        own_plateNo: '',
        own_plateProvince: '',
        own_date: '',
        own_model: '',
        own_size: '',
        own_type: '',
        own_tempStart: null,
        own_tempEnd: null,
        own_weight: null,
        asso_plateNo: '',
        asso_plateProvince: '',
        asso_model: '',
        asso_size: '',
        asso_type: '',
        asso_tempStart: null,
        asso_tempEnd: null,
        asso_weight: null,
        asso_owner: '',
        asso_telephone: '',
        asso_price: '',
    }

    handleSubmit = (e) => {
        if(this.state.menuSelected==='own'){
            this.setState({ ownVehicleData: {
                car_model: this.state.own_model,
                car_size: this.state.own_size,
                car_type: this.state.own_type,
                car_temp_start: this.state.own_tempStart, 
                car_temp_end: this.state.own_tempEnd, 
                plate_no: this.state.own_plateNo,
                plate_province: this.state.own_plateProvince,
                weight: this.state.own_weight,
                date_register: this.state.own_date
            }});
            fetch(`http://localhost:4000/vehicle/signup`, {
                method: "POST",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(this.state.ownVehicleData)
            })
            .then(res => {
                return res.json()
            })
            .catch(err => {
                console.log(err);
            })
        } else {
            this.setState({ assoVehicleData: {
                car_model: this.state.asso_model,
                car_size: this.state.asso_size,
                car_type: this.state.asso_type,
                car_temp_start: this.state.asso_tempStart, 
                car_temp_end: this.state.asso_tempStart, 
                plate_no : this.state.asso_plateNo,
                plate_province : this.state.asso_plateProvince,
                weight : this.state.asso_weight,
                owner : this.state.asso_owner,
                price : this.state.asso_price,
            }});
            fetch(`http://localhost:4000/vehicle/asso/assign`, {
                method: "POST",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(this.state.assoVehicleData)
            })
            .then(res => {
                return res.json();
            })
            .catch(err => {
                console.log(err);
            })
        }
        e.preventDefault()
    };

    handleChange = name => e => {
        this.setState({[name]: e.target.value});
    }

    handleSelectMenu = (e) => {
        this.setState({ menuSelected: e.target.name });
    }
    
    render(){
        if (!this.props.showModal) {
            return null;
        }
        return (
            <div className="modalAccount-backdrop">
                <div className="modalAccount-paper">
                    <img    
                        src={close}
                        alt="closeButton" 
                        width="8px" 
                        className="modalAccount-closeButton"
                        onClick={this.props.onClose}
                    />
                    <div className="modalAccount-title">เพิ่มข้อมูลรถขนส่ง</div>
                    <div className="modalAccount-content">
                        <div className="modalAccount-inline">
                            <MenuButton 
                                onClick={this.handleSelectMenu}
                                name="own"
                                select={this.state.menuSelected}>
                                รถบริษัท
                            </MenuButton>
                            <MenuButton 
                                onClick={this.handleSelectMenu}
                                name="asso"
                                select={this.state.menuSelected}>
                                รถร่วม
                            </MenuButton>
                        </div>
{/*----------------------------- Own Vehicle Form -----------------------------*/}
                        {this.state.menuSelected==="own"? 
                            <Form noValidate onSubmit={this.handleSubmit}>
                                <div className="modalAccount-row mb-20">
                                    <Form.Group controlId="ownFormPlateNo" className="mr-50">
                                        <Form.Label>เลขทะเบียนรถ</Form.Label>
                                        <Form.Control 
                                            placeholder="กก0000" 
                                            onChange={this.handleChange('own_plateNo')}
                                            required />
                                        {/* <Form.Control.Feedback /> */}
                                    </Form.Group>
                                
                                    <Form.Group controlId="ownFormPlateProvince">
                                        <Form.Label>หมวดจังหวัด</Form.Label>
                                        <Form.Control 
                                            as="select"
                                            onChange={this.handleChange('own_plateProvince')}
                                            required
                                        >
                                            <option>k</option>
                                        </Form.Control>
                                    </Form.Group>
                                </div>

                                <div className="modalAccount-row mb-20">
                                    <Form.Group controlId="ownFormDate" className="mr-50">
                                        <Form.Label>วันที่ซื้อ</Form.Label>
                                        <Form.Control 
                                            placeholder="วว/ดด/ปปปป (พ.ศ.)" 
                                            onChange={this.handleChange('own_date')}
                                            required />
                                        {/* <Form.Control.Feedback /> */}
                                    </Form.Group>
                                
                                    <Form.Group controlId="ownFormModel">
                                        <Form.Label>รถรุ่น</Form.Label>
                                        <Form.Control 
                                            placeholder="ยี่ห้อ รุ่น ปี" 
                                            onChange={this.handleChange('own_model')}
                                            required />
                                    </Form.Group>
                                </div>

                                <div className="modalAccount-row mb-20">
                                    <Form.Group controlId="ownFormSize" className="mr-50">
                                        <Form.Label>ขนาดรถ</Form.Label>
                                        <Form.Control 
                                            as="select"
                                            onChange={this.handleChange('own_size')}
                                            required
                                        >
                                            <option>k</option>
                                        </Form.Control>
                                    </Form.Group>
                                
                                    <Form.Group controlId="ownFormType">
                                        <Form.Label>ประเภทรถ</Form.Label>
                                        <Form.Control 
                                            as="select"
                                            onChange={this.handleChange('own_type')}
                                            required
                                        >
                                            <option>k</option>
                                        </Form.Control>
                                    </Form.Group>
                                </div>

                                <div className="modalAccount-row mb-20">
                                    <Form.Group controlId="ownFormTemperature" className="mr-50">
                                        <Form.Label>ช่วงอุณหภูมิขนส่ง ( °C )</Form.Label>
                                        <div className="modalVehicle-row">
                                            <div>เริ่มต้น</div>
                                            <Form.Control 
                                                placeholder="°C" 
                                                className="modalVehicle-tempField"
                                                onChange={this.handleChange('own_tempStart')}
                                                required />
                                            <div>ถึง</div>
                                            <Form.Control 
                                                placeholder="°C" 
                                                className="modalVehicle-tempField"
                                                onChange={this.handleChange('own_tempEnd')}
                                                required />
                                            {/* <Form.Control.Feedback /> */}
                                        </div>
                                    </Form.Group>
                                
                                    <Form.Group controlId="ownFormWeight">
                                        <Form.Label>น้ำหนักที่รับได้ (ตัน)</Form.Label>
                                        <Form.Control 
                                            placeholder="หน่วย: ตัน" 
                                            onChange={this.handleChange('own_weight')}
                                            required />
                                    </Form.Group>
                                </div>

                                <div className="modalAccount-rowCenter">
                                    <Button type="reset" className="btn-submit" onClick={this.handleSubmit}>
                                        บันทึก
                                    </Button>
                                </div>
                            </Form> 

// ----------------------------- Associate Vehicle Form -----------------------------
                            : <Form noValidate onSubmit={this.handleSubmit}>
                                <div className="modalAccount-row mb-20">
                                    <Form.Group controlId="assoFormPlateNo" className="mr-50">
                                        <Form.Label>เลขทะเบียนรถ</Form.Label>
                                        <Form.Control 
                                            placeholder="กก0000" 
                                            onChange={this.handleChange('asso_plateNo')}
                                            required />
                                        {/* <Form.Control.Feedback /> */}
                                    </Form.Group>
                                
                                    <Form.Group controlId="assoFormPlateProvince">
                                        <Form.Label>หมวดจังหวัด</Form.Label>
                                        <Form.Control 
                                            as="select"
                                            onChange={this.handleChange('asso_plateProvince')}
                                            required
                                        >
                                            <option>k</option>
                                        </Form.Control>
                                    </Form.Group>
                                </div>

                                <div className="modalAccount-row mb-20">
                                    <Form.Group controlId="assoFormModel" className="mr-50">
                                        <Form.Label>รถรุ่น</Form.Label>
                                        <Form.Control 
                                            placeholder="ยี่ห้อ รุ่น ปี" 
                                            onChange={this.handleChange('asso_model')}
                                            required />
                                        {/* <Form.Control.Feedback /> */}
                                    </Form.Group>

                                    <Form.Group controlId="assoFormSize">
                                        <Form.Label>ขนาดรถ</Form.Label>
                                        <Form.Control 
                                            as="select"
                                            onChange={this.handleChange('asso_size')}
                                            required
                                        >
                                            <option>k</option>
                                        </Form.Control>
                                    </Form.Group>

                                </div>

                                <div className="modalAccount-row mb-20">
                                    <Form.Group controlId="assoFormType" className="mr-50">
                                        <Form.Label>ประเภทรถ</Form.Label>
                                        <Form.Control 
                                            as="select"
                                            onChange={this.handleChange('asso_type')}
                                            required
                                        >
                                            <option>k</option>
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId="assoFormTemperature">
                                        <Form.Label>ช่วงอุณหภูมิขนส่ง ( °C )</Form.Label>
                                        <div className="modalVehicle-row">
                                            <div>เริ่มต้น</div>
                                            <Form.Control 
                                                placeholder="°C" 
                                                className="modalVehicle-tempField"
                                                onChange={this.handleChange('asso_tempStart')}
                                                required />
                                            <div>ถึง</div>
                                            <Form.Control 
                                                placeholder="°C" 
                                                className="modalVehicle-tempField"
                                                onChange={this.handleChange('asso_tempEnd')}
                                                required />
                                            {/* <Form.Control.Feedback /> */}
                                        </div>
                                    </Form.Group>
                                </div>

                                <div className="modalAccount-row mb-20">
                                    <Form.Group controlId="assoFormWeight" className="mr-50">
                                        <Form.Label>น้ำหนักที่รับได้ (ตัน)</Form.Label>
                                        <Form.Control 
                                            placeholder="หน่วย: ตัน" 
                                            onChange={this.handleChange('asso_weight')}
                                            required />
                                    </Form.Group>

                                    <Form.Group controlId="assoFormPrice">
                                        <Form.Label>เรทราคาเช่า (ต่อชั่วโมง)</Form.Label>
                                        <Form.Control 
                                            placeholder="บาท / ชั่วโมง" 
                                            onChange={this.handleChange('asso_price')}
                                            required />
                                    </Form.Group>
                                </div>

                                <div className="modalAccount-row mb-20">
                                    <Form.Group controlId="assoFormOwner" className="mr-50">
                                        <Form.Label>เจ้าของรถ</Form.Label>
                                        <Form.Control 
                                            placeholder="ชื่อ / ร้าน / บริษัท" 
                                            onChange={this.handleChange('asso_owner')}
                                            required />
                                    </Form.Group>

                                    <Form.Group controlId="assoFormTelephone">
                                        <Form.Label>เบอร์โทรศัพท์</Form.Label>
                                        <Form.Control 
                                            // placeholder="" 
                                            onChange={this.handleChange('asso_telephone')}
                                            required />
                                    </Form.Group>
                                </div>


                                <div className="modalAccount-rowCenter">
                                    <Button type="reset" className="btn-submit" onClick={this.handleSubmit}>
                                        บันทึก
                                    </Button>
                                </div>
                            </Form> 

                        }
                    </div>
                </div>
            </div>
        )
    }   
} 