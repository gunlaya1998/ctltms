import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { TextField, InputAdornment } from '@material-ui/core';
import './Login.css';
import support from '../../images/06-online-support-100.png';
import phone from '../../images/09-telephone.png';
import close from '../../images/exit-buttom@2x.png'
import truck from '../../images/05-truck.png';
import errorIcon from '../../images/icon-error@2x.png';

const StyledTextfield = styled(TextField)`
    width: 15vw;
    && .MuiFormLabel-root {
        color: #5c5c5c;
        font-family: 'Kanit';
        font-size: 14px;
        font-weight: 300;
    }
    && .MuiInput-underline:before {
        border-bottom: ${props => (props.loginstatus===""? '1px solid rgba(118, 118, 118, 0.6)':'2px solid #FF0000')};
    }
`

export default class main extends Component {
    state = {
        username: "",
        password: "",
        loginstatus: "",
        isLoggedIn : false,
        stateModal: false,
        role: "",
    }

    login = () => {
        axios.get(`http://localhost:4000/account`, {
            params: {
                username: this.state.username,
                password: this.state.password
            }
        }).then((response) => {
            if(response.data.message === "" || response.data.message === undefined){
                this.setState({isLoggedIn: response.data[0].isLoggedIn});
            } else {
                this.setState({loginstatus: response.data.message});
            }
        });
    }

    openModal = () => {
        this.setState({stateModal: true});
    }

    closeModal = () => {
        this.setState({stateModal: false});
    }
    
    render(){
        return (
            <div className="background">
                {/* Forgot Password Modal */}
                {this.state.stateModal?
                    <div className="modal-backdrop">
                        <div className="modal-paper">
                            <img 
                                src={close} 
                                alt="closeButton" 
                                width="3%" 
                                className="modal-closeButton"
                                onClick={this.closeModal}
                            />
                            <img src={support} alt="support" width="30%" />
                            <div className="modal-title">หากคุณลืมรหัสผ่าน</div>
                            <div className="modal-text">กรุณาติดต่อฝ่ายบริการลูกค้า</div>
                            <div className="modal-inline">
                                <img src={phone} alt="phone" width="15%" />
                                <div className="modal-text">0-2945-4951</div>
                            </div>
                        </div>
                    </div>
                    :null
                }

                <div className="content-container">
                    <div className="data-container">
                        <div className="textImg-container">
                            <img src={truck} width="90%" alt="truck"/>
                        </div>
                        <div className="textImg-container">
                            <div className="login-title">เข้าสู่ระบบ</div>

                            {this.state.loginstatus===""? 
                                <>
                                    <StyledTextfield
                                        id="standard-basic" 
                                        label="ชื่อบัญชีผู้ใช้งาน" 
                                        className="textfield-indent"
                                        loginstatus={this.state.loginstatus}
                                        onChange={(e) => {
                                            this.setState({username: e.target.value});
                                        }}
                                    />
                                    <StyledTextfield 
                                        id="standard-password-input"
                                        label="รหัสผ่าน" 
                                        type="password"
                                        loginstatus={this.state.loginstatus}
                                        onChange={(e) => {
                                            this.setState({password: e.target.value});
                                        }}
                                    />
                                </>

                                : 
                                <>
                                    <StyledTextfield
                                        id="standard-basic" 
                                        label="ชื่อบัญชีผู้ใช้งาน" 
                                        className="textfield-indent"
                                        loginstatus={this.state.loginstatus}
                                        onChange={(e) => {
                                            this.setState({username: e.target.value});
                                        }}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <img src={errorIcon} alt="error_input" width="50%" />
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                    <StyledTextfield 
                                        id="standard-password-input"
                                        label="รหัสผ่าน" 
                                        type="password"
                                        loginstatus={this.state.loginstatus}
                                        onChange={(e) => {
                                            this.setState({password: e.target.value});
                                        }}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <img src={errorIcon} alt="error_input" width="50%" />
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </>
                            }

                            <p className="error-message">{this.state.loginstatus}</p>
                            <p className="forgotPassword" onClick={this.openModal}>ลืมรหัสผ่าน</p>

                            <button onClick={this.login} className="login-button">เข้าสู่ระบบ</button> 

                            {this.state.isLoggedIn ? <Redirect to="/home" />
                                :null
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }   
}

