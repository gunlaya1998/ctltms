import React, { Component } from 'react'
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import close from '../../images/exit-buttom@2x.png';
import styled from 'styled-components';
import './StyleModal.css';

const StatusButton = styled.button`
    font-size: 1rem;
    width: 6.5rem;
    padding: 5px 0;
    /* color: ${props => (props.statusSelected==="avail"? 'white' : "#000000")}; */
    font-weight: 300;
    display: flex;
    justify-content: center;
    border-radius: 6px;
    border: 1px solid ${props => (
        props.statusSelected!=="avail" && props.value==="avail"? "#7EBF86" : 
            props.statusSelected!=="fix" && props.value==="fix"? "#FFD452" :
                props.statusSelected!=="oos" && props.value==="oos"? "#FF5050"
                    : "white")};
    background-color:${props => (
        props.statusSelected==="avail" && props.statusSelected===props.value? "#7EBF86" : 
            props.statusSelected==="fix" && props.statusSelected===props.value? "#FFD452" :
                props.statusSelected==="oos" && props.statusSelected===props.value? "#FF5050"
                : "white")};
`

export default class main extends Component {
    constructor(props){
        super(props)
        this.state = {
            statusSelected: 'avail',
            optionProvince: [],
            optionCarSize: [],
            optionCarType: ['แห้ง', 'ห้องเย็น'],
            ownVehicleData: null,
            assoVehicleData: null,
            own_plateNo: '',
            own_plateProvince: 'กรุงเทพมหานคร',
            own_date: '',
            own_model: '',
            own_size: '4 ล้อ',
            own_type: 'แห้ง',
            own_tempStart: null,
            own_tempEnd: null,
            own_weight: null,
            asso_plateNo: '',
            asso_plateProvince: 'กรุงเทพมหานคร',
            asso_model: '',
            asso_size: '4 ล้อ',
            asso_type: 'แห้ง',
            asso_tempStart: null,
            asso_tempEnd: null,
            asso_weight: null,
            asso_owner: '',
            asso_telephone: '',
            asso_price: '',
        }
    }

    // API options
    option_provinceAPI = axios.get("http://localhost:4000/options/province");
    option_carSizeAPI = axios.get("http://localhost:4000/options/carSize");

    // // API data from db (ref by row no.)
    // vehicleOwnAPI = axios.get("http://localhost:4000/vehicle");
    // vehicleAssoAPI = axios.get("http://localhost:4000/vehicle/asso");

    componentDidMount(){
        axios
        .all([this.option_provinceAPI, this.option_carSizeAPI])
        .then(
            axios.spread((...responses) => {
                const resProvince = responses[0];
                const resCarSize = responses[1];

                // province section
                let province = [];
                for(var i = 0; i < resProvince.data.length; i++){
                    province.push(resProvince.data[i].PROVINCE_NAME);
                }
                this.setState({ optionProvince: province });

                // carSize section
                let carSize = [];
                for(var j = 0; j < resCarSize.data.length; j++){
                    carSize.push(resCarSize.data[j].size_name);
                }
                this.setState({ optionCarSize: carSize });
            })
        )
        .catch( err => {
            console.log(err);
        })
    }

    handleSubmit = (e) => {
        // // const form = e.currentTarget;
        // // if (form.checkValidity() === false) {
        // //     e.preventDefault();
        // //     e.stopPropagation();
        // // }
        // // this.setState({ formValidate: true });

        // if(this.state.menuSelected==='customer'){
        //     this.setState({ customerData: {
        //         first_name: this.state.customer_firstName,
        //         last_name: this.state.customer_lastName,
        //         company: this.state.customer_company,
        //         Business: this.state.customer_business,
        //         email: this.state.customer_email,
        //         telephone: this.state.customer_telephone,
        //         account: this.state.customer_account,
        //     }});
        //     fetch(`http://localhost:4000/customeraccount/signup`, {
        //         method: "POST",
        //         headers: {
        //             Accept: 'application/json',
        //             "Content-Type": 'application/json'
        //         },
        //         body: JSON.stringify(this.state.customerData)
        //     })
        //     .then(res => {
        //         return res.json()
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     })
        // } else {
        //     this.setState({ staffData: {
        //         first_name: this.state.staff_firstName,
        //         last_name: this.state.staff_lastName,
        //         nickName: this.state.staff_nickName,
        //         telephone: this.state.staff_telephone,
        //         account: this.state.staff_account,
        //         role: this.state.staff_role
        //     }});
        //     fetch(`http://localhost:4000/staffaccount/signupStaff`, {
        //         method: "POST",
        //         headers: {
        //             Accept: 'application/json',
        //             "Content-Type": 'application/json'
        //         },
        //         body: JSON.stringify(this.state.staffData)
        //     })
        //     .then(res => {
        //         return res.json();
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     })
        // }
        // // form.reset();
        // // ReactDOM.findDOMNode(this.form).reset();
        // e.preventDefault()
    };

    handleChange = name => e => {
        this.setState({[name]: e.target.value});
    }

    handleSelectStatus = (e) => {
        this.setState({ statusSelected: e.target.value });
    }
    
    render(){
        if (!this.props.showEditVehicleModal.showEditVehicle) {
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
                    <div className="modalAccount-title">แก้ไขข้อมูล - {this.props.vehicleType}</div>
{/*----------------------------- Customer Registration Form -----------------------------*/}
                    {this.props.vehicleType==="รถบริษัท"? 
                        <Form noValidate validated={this.state.formValidate} onSubmit={this.handleSubmit}>
                            <div className="modalEdit-CenterRow mb-20">
                                <StatusButton 
                                    type="button" 
                                    className="mr-10"
                                    value="avail" 
                                    statusSelected={this.state.statusSelected}
                                    onClick={this.handleSelectStatus}>
                                    พร้อมใช้งาน
                                </StatusButton>
                                <StatusButton 
                                    type="button" 
                                    value="fix"
                                    className="mr-10" 
                                    statusSelected={this.state.statusSelected}
                                    onClick={this.handleSelectStatus}>
                                    ระหว่างซ่อม
                                </StatusButton>
                                <StatusButton 
                                    type="button" 
                                    value="oos"
                                    statusSelected={this.state.statusSelected}
                                    onClick={this.handleSelectStatus}>
                                    เสีย
                                </StatusButton>
                            </div>

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
                                                {this.state.optionProvince.map((province) => 
                                                    <option>{province}</option>
                                                )}
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
                                                {this.state.optionCarSize.map((size) => 
                                                    <option>{size}</option>
                                                )}
                                            </Form.Control>
                                        </Form.Group>
                                    
                                        <Form.Group controlId="ownFormType">
                                            <Form.Label>ประเภทรถ</Form.Label>
                                            <Form.Control 
                                                as="select"
                                                onChange={this.handleChange('own_type')}
                                                required
                                            >
                                                {this.state.optionCarType.map((type) => 
                                                    <option>{type}</option>
                                                )}
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
                    :   <Form noValidate onSubmit={this.handleSubmit}>
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
                                    {this.state.optionProvince.map((province) => 
                                        <option>{province}</option>
                                    )}
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
                                    {this.state.optionCarSize.map((size) => 
                                        <option>{size}</option>
                                    )}
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
                                    {this.state.optionCarType.map((type) => 
                                        <option>{type}</option>
                                    )}
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
        )
    }   
} 