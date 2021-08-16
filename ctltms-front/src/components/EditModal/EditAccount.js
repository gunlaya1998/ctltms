import React, { Component } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import close from '../../images/exit-buttom@2x.png'
import './StyleModal.css';

export default class main extends Component {
    constructor(props){
        super(props)
        this.state = {
            // stateModal: this.props.showModal,
            // show: false,
            optionBusinessLabel:'เลือกประเภทธุรกิจ',
            optionBusiness:[ 
                {
                    'type':'เกษตรและอุตสาหกรรมอาหาร', 
                    'option':['ธุรกิจการเกษตร', 'อาหารและเครื่องดื่ม']
                },
                {
                    'type':'สินค้าอุปโภคบริโภค', 
                    'option':['แฟชั่น', 'ของใช้ในครัวเรือนและสำนักงาน', 'ของใช้ส่วนตัวและเวชภัณฑ์']
                },
                {
                    'type':'สินค้าอุตสาหกรรม', 
                    'option':['ยานยนต์', 'วัสดุอุตสาหกรรมและเครื่องจักร', 'บรรจุภัณฑ์', 'กระดาษและวัสดุการพิมพ์', 'ปิโตรเคมีและเคมีภัณฑ์', 'เหล็ก และ ผลิตภัณฑ์โลหะ']
                },
                {
                    'type':'อสังหาริมทรัพย์และก่อสร้าง', 
                    'option':['วัสดุก่อสร้าง', 'บริการรับเหมาก่อสร้าง']
                },
                {
                    'type':'ทรัพยากร', 
                    'option':['พลังงานและสาธารณูปโภค', 'เหมืองแร่']
                },
                {
                    'type':'บริการ', 
                    'option':['พาณิชย์ (ห้าง, ร้าน)', 'การแพทย์', 'สื่อและสิ่งพิมพ์', 'บริการเฉพาะกิจ', 'การท่องเที่ยวและสันทนาการ', 'ขนส่งและโลจิสติกส์']
                },
                {
                    'type':'เทคโนโลยี', 
                    'option':['ชิ้นส่วนอิเล็กทรอนิกส์', 'เทคโนโลยีสารสนเทศและการสื่อสาร']
                }
            ],
            optionRoles:[
                'Regular Staff', 
                'Editor', 
                'Administrator', 
                'Super Administrator'],
            customer_firstname: '',
            customer_lastname: '',
            customer_company: '',
            customer_business: '',
            customer_email: '',
            customer_telephone: '',
            customer_account: '',
            staff_account: '',
            staff_firstname: '',
            staff_lastname: '',
            staff_nickname: '',
            staff_telephone: '',
            staff_role: ''
        }
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
    
    render(){
        if (!this.props.showEditAccountModal.showEditAccount) {
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
                    <div className="modalAccount-title">แก้ไขบัญชีผู้ใช้ - {this.props.accountType} </div>
                    
{/*----------------------------- Customer Registration Form -----------------------------*/}
                    {this.props.accountType==="ลูกค้า"? 
                        <Form noValidate validated={this.state.formValidate} onSubmit={this.handleSubmit}>
                            <div className="modalAccount-row mb-20">
                                <Form.Group controlId="customerFormFirstName" className="mr-50">
                                    <Form.Label>ชื่อจริง</Form.Label>
                                    <Form.Control 
                                        value={this.state.customer_firstname}
                                        // placeholder={customer_firstname} 
                                        onChange={this.handleChange('customer_firstname')}
                                        required />
                                </Form.Group>
                            
                                <Form.Group controlId="customerFormLastName">
                                    <Form.Label>นามสกุล</Form.Label>
                                    <Form.Control 
                                        // placeholder={customer_lastname}
                                        onChange={this.handleChange('customer_lastName')}
                                        // disabled
                                        required />
                                </Form.Group>
                            </div>

                            <div className="modalAccount-row">
                                <Form.Group controlId="customerFormCompany" className="mr-50">
                                    <Form.Label>บริษัท</Form.Label>
                                    <Form.Control 
                                        // placeholder={customer_company}
                                        onChange={this.handleChange('customer_company')}
                                        required />
                                </Form.Group>
                            
                                <Form.Group controlId="customerFormBusiness">
                                    <Form.Label>ประเภทธุรกิจ</Form.Label>
                                    <Form.Control 
                                        as="select"
                                        onChange={this.handleChange('customer_business')}
                                        // disabled
                                        required
                                    >
                                        {this.state.optionBusiness.map((data) => 
                                            <>
                                                <option className="form-optionCategory" disabled> 
                                                    {data.type} 
                                                </option>

                                                {data.option.map((item) =>
                                                    <option 
                                                        className="form-option" 
                                                        value={item}
                                                    >
                                                        {item}
                                                    </option>
                                                )}
                                                <option disabled className="separator"></option>
                                            </>
                                        )}
                                    </Form.Control>
                                </Form.Group> 
                            </div>

                            <div className="modalAccount-row mb-20">
                                <Form.Group controlId="customerFormEmail" className="mr-50">
                                    <Form.Label>อีเมล</Form.Label>
                                    <Form.Control 
                                        // placeholder={customer_email}
                                        onChange={this.handleChange('customer_email')}/>
                                </Form.Group>

                                <Form.Group controlId="customerFormTelephone">
                                    <Form.Label>เบอร์โทรศัพท์</Form.Label>
                                    <Form.Control 
                                        // placeholder={customer_telephone}
                                        onChange={this.handleChange('customer_telephone')}
                                        required />
                                </Form.Group>
                            </div>

                            <div className="modalAccount-row mb-20">
                                <Form.Group controlId="customerFormAccount" className="mr-50">
                                    <Form.Label>ชื่อบัญชีผู้ใช้งาน</Form.Label>
                                    <Form.Control 
                                        // placeholder={customer_account}
                                        onChange={this.handleChange('customer_account')}
                                        required />
                                </Form.Group>

                                <Form.Group controlId="customerFormPassword">
                                    <Form.Label>รหัสผ่าน (Default)</Form.Label>
                                    <Form.Control type="password" placeholder="12345" readOnly/>
                                </Form.Group>
                            </div>

                            <div className="modalAccount-rowCenter">
                                <Button type="reset" className="btn-submit" onClick={this.handleSubmit}>
                                    บันทึก
                                </Button>
                            </div>
                        </Form> 

// ----------------------------- Staff Registration Form -----------------------------
                        : <Form noValidate validated={this.state.formValidate} onSubmit={this.handleSubmit}>
                            <div className="modalAccount-row mb-20">
                                <Form.Group controlId="staffFormFirstName" className="mr-50">
                                    <Form.Label>ชื่อจริง</Form.Label>
                                    <Form.Control 
                                        // placeholder={staff_firstname}
                                        onChange={this.handleChange('staff_firstName')}
                                        required />
                                    <Form.Control.Feedback />
                                </Form.Group>
                            
                                <Form.Group controlId="staffFormLastName">
                                    <Form.Label>นามสกุล</Form.Label>
                                    <Form.Control 
                                        // placeholder={staff_lastname}
                                        onChange={this.handleChange('staff_lastName')}
                                        required />
                                    <Form.Control.Feedback />
                                </Form.Group>
                            </div>

                            <div className="modalAccount-row">
                                <Form.Group controlId="staffFormNickname" className="mr-50">
                                    <Form.Label>ชื่อเล่น</Form.Label>
                                    <Form.Control 
                                        // placeholder={staff_nickname}
                                        onChange={this.handleChange('staff_nickName')}
                                        required />
                                    <Form.Control.Feedback />
                                </Form.Group>

                                <Form.Group controlId="staffFormTelephone">
                                    <Form.Label>เบอร์โทรศัพท์</Form.Label>
                                    <Form.Control 
                                        // placeholder={staff_telephone}
                                        onChange={this.handleChange('staff_telephone')}
                                        required />
                                    <Form.Control.Feedback />
                                </Form.Group>
                            </div>

                            <div className="modalAccount-row mb-20">
                                <Form.Group controlId="staffFormAccount" className="mr-50">
                                    <Form.Label>ชื่อบัญชีผู้ใช้งาน</Form.Label>
                                    <Form.Control 
                                        // placeholder={staff_account}
                                        onChange={this.handleChange('staff_account')}
                                        required />
                                    <Form.Control.Feedback />
                                </Form.Group>

                                <Form.Group controlId="staffFormRoles">
                                    <Form.Label>ตำแหน่ง (Roles)</Form.Label>
                                        <Form.Control 
                                            as="select" 
                                            onChange={this.handleChange('staff_role')}
                                            required>
                                            {this.state.optionRoles.map((data) => 
                                                <option className="form-option" value={data}>
                                                    {data}
                                                </option>
                                            )}
                                        </Form.Control>
                                        <Form.Control.Feedback />
                                </Form.Group> 
                            </div>

                            <div className="modalAccount-row mb-20">
                                <Form.Group controlId="staffFormPassword">
                                    <Form.Label>รหัสผ่าน (Default)</Form.Label>
                                    <Form.Control type="password" placeholder="staff98765" readOnly />
                                </Form.Group>
                            </div>

                            <div className="modalAccount-rowCenter">
                                <Button type="submit" className="btn-submit">
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