import React, { Component } from 'react'
import styled from 'styled-components';
import Form from 'react-bootstrap/Form';
import { Button, Col } from 'reactstrap';
import close from '../../images/exit-buttom@2x.png'
import './Modal-Accounts.css';

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
    /* border-top-right-radius: 30px; */
    background-color:${props => (props.select===props.name? '#366F47' : "white")};
    padding: 5px 0;
    border-bottom: ${props => (props.select===props.name? null : "2px solid #366F47")};
`

export default class main extends Component {
    state = {
        stateModal: true,
        menuSelected: 'customer',
        formValidate: false,
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
            'Subscriber', 
            'Contributor', 
            'Author', 
            'Editor', 
            'Administrator', 
            'Super Administrator'],
    }

    onSubmit(e) {
        e.preventDefault();

    }

    handleSubmit = (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        this.setState({ formValidate: true });

        alert('A form was submitted');

        fetch('http://localhost:4000/customeraccount', {
            method: 'POST',
            // We convert the React state to JSON and send it as the POST body
            body: JSON.stringify(this.state)
        }).then(function(response) {
            console.log(response)
            return response.json();
        });
    
        e.preventDefault()
    };

    handleSelectMenu = (e) => {
        this.setState({ menuSelected: e.target.name });
    }

    handleSelectOption = (e) => {
        this.setState({ optionBusinessLabel: e.target.optionValue });
        console.log(this.state.optionBusinessLabel);
    } 

    closeModal = () => {
        this.setState({ stateModal: false });
    }
    
    render(){
        return (
            this.state.stateModal? 
                <div className="modalAccount-backdrop">
                    <div className="modalAccount-paper">
                        <img    
                            src={close}
                            alt="closeButton" 
                            width="8px" 
                            className="modalAccount-closeButton"
                            onClick={this.closeModal}
                        />
                        <div className="modalAccount-title">เพิ่มบัญชีผู้ใช้</div>
                        <div className="modalAccount-content">
                            <div className="modalAccount-inline">
                                <MenuButton 
                                    onClick={this.handleSelectMenu}
                                    name="customer"
                                    select={this.state.menuSelected}>
                                    ลูกค้า
                                </MenuButton>
                                <MenuButton 
                                    onClick={this.handleSelectMenu}
                                    name="staff"
                                    select={this.state.menuSelected}>
                                    พนักงาน
                                </MenuButton>
                            </div>

{/*----------------------------- Customer Registration Form -----------------------------*/}
                            {this.state.menuSelected==="customer"? 
                                <Form noValidate validated={this.state.formValidate} onSubmit={this.handleSubmit}>
                                    <div className="modalAccount-row mb-20">
                                        <Form.Group controlId="formFirstName" className="mr-50">
                                            <Form.Label>ชื่อจริง</Form.Label>
                                            <Form.Control placeholder="ชื่อจริง" required />
                                            <Form.Control.Feedback />
                                        </Form.Group>
                                    
                                        <Form.Group controlId="formLastName">
                                            <Form.Label>นามสกุล</Form.Label>
                                            <Form.Control placeholder="นามสกุล" required />
                                            <Form.Control.Feedback />
                                        </Form.Group>
                                    </div>

                                    <div className="modalAccount-row">
                                        <Form.Group controlId="formCompany" className="mr-50">
                                            <Form.Label>บริษัท</Form.Label>
                                            <Form.Control placeholder="บริษัท" required />
                                            <Form.Control.Feedback />
                                        </Form.Group>
                                    
                                        <Form.Group controlId="formBusiness">
                                            <Form.Label>ประเภทธุรกิจ</Form.Label>
                                            <Form.Control as="select" required>
                                                {this.state.optionBusiness.map((data) => 
                                                    <>
                                                        <option className="form-optionCategory" disabled> 
                                                            {data.type} 
                                                        </option>

                                                        {data.option.map((item) =>
                                                            <option className="form-option" value={item}>
                                                                {item}
                                                            </option>
                                                        )}
                                                        {/* <optgroup class="divider"></optgroup> */}
                                                        <option disabled className="separator"></option>
                                                    </>
                                                )}
                                            </Form.Control>
                                            <Form.Control.Feedback />
                                        </Form.Group> 
                                    </div>

                                    <div className="modalAccount-row mb-20">
                                        <Form.Group controlId="formEmail" className="mr-50">
                                            <Form.Label>อีเมล</Form.Label>
                                            <Form.Control placeholder="อีเมล"/>
                                        </Form.Group>

                                        <Form.Group controlId="formTelephone">
                                            <Form.Label>เบอร์โทรศัพท์</Form.Label>
                                            <Form.Control placeholder="เบอร์โทรศัพท์" required />
                                            <Form.Control.Feedback />
                                        </Form.Group>
                                    </div>

                                    <div className="modalAccount-row mb-20">
                                        <Form.Group controlId="formAccount" className="mr-50">
                                            <Form.Label>ชื่อบัญชีผู้ใช้งาน</Form.Label>
                                            <Form.Control placeholder="ชื่อบัญชีผู้ใช้งาน" required />
                                            <Form.Control.Feedback />
                                        </Form.Group>

                                        <Form.Group controlId="formPassword">
                                            <Form.Label>รหัสผ่าน (Default)</Form.Label>
                                            <Form.Control type="password" placeholder="12345" readOnly/>
                                        </Form.Group>
                                    </div>

                                    <div className="modalAccount-rowCenter">
                                        <Button type="submit" className="btn-submit">
                                            บันทึก
                                        </Button>
                                    </div>
                                </Form> 

// ----------------------------- Staff Registration Form -----------------------------
                                : <Form noValidate validated={this.state.formValidate} onSubmit={this.handleSubmit}>
                                    <div className="modalAccount-row mb-20">
                                        <Form.Group controlId="formFirstName" className="mr-50">
                                            <Form.Label>ชื่อจริง</Form.Label>
                                            <Form.Control placeholder="ชื่อจริง" required />
                                            <Form.Control.Feedback />
                                        </Form.Group>
                                    
                                        <Form.Group controlId="formLastName">
                                            <Form.Label>นามสกุล</Form.Label>
                                            <Form.Control placeholder="นามสกุล" required />
                                            <Form.Control.Feedback />
                                        </Form.Group>
                                    </div>

                                    <div className="modalAccount-row">
                                        <Form.Group controlId="formNickname" className="mr-50">
                                            <Form.Label>ชื่อเล่น</Form.Label>
                                            <Form.Control placeholder="ชื่อเล่น" required />
                                            <Form.Control.Feedback />
                                        </Form.Group>

                                        <Form.Group controlId="formTelephone">
                                            <Form.Label>เบอร์โทรศัพท์</Form.Label>
                                            <Form.Control placeholder="เบอร์โทรศัพท์" required />
                                            <Form.Control.Feedback />
                                        </Form.Group>
                                    </div>

                                    <div className="modalAccount-row mb-20">
                                        <Form.Group controlId="formAccount" className="mr-50">
                                            <Form.Label>ชื่อบัญชีผู้ใช้งาน</Form.Label>
                                            <Form.Control placeholder="ชื่อบัญชีผู้ใช้งาน" required />
                                            <Form.Control.Feedback />
                                        </Form.Group>

                                        <Form.Group controlId="formRoles">
                                            <Form.Label>ตำแหน่ง (Roles)</Form.Label>
                                                <Form.Control as="select" required>
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
                                        <Form.Group as={Col} controlId="formPassword">
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
                </div>
                : null
        )
    }   
} 