import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import './Login.css';
import truck from '../../images/05-truck.png';

const StyledTextfield = styled(TextField)`
    width: 15vw;
    /* margin-bottom: 25px; */
    && .MuiFormControl-root {
        margin: 10px 0 5px 0;;
    }
    && .MuiFormLabel-root {
        color: #5c5c5c;
        font-family: 'Kanit';
        font-size: 14px;
        font-weight: 300;
    }
`

export default class main extends Component {
    state = {
        username: "",
        password: "",
        loginStatus: "",
        isLoggedIn : false,
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
                this.setState({loginStatus: response.data.message});
            }
        });
    }
    
    render(){
        return (
            <div className="background">
                <div className="content-container">
                    <div className="data-container">
                        <div className="textImg-container">
                            <img src={truck} width="90%" />
                        </div>
                        <div className="textImg-container">
                            <div className="login-title">เข้าสู่ระบบ</div>
                            <StyledTextfield 
                                id="standard-basic" 
                                label="ชื่อบัญชีผู้ใช้งาน" 
                                onChange={(e) => {
                                    this.setState({username: e.target.value});
                                }}
                            />
                            <StyledTextfield 
                                id="standard-basic" 
                                label="รหัสผ่าน" 
                                onChange={(e) => {
                                    this.setState({password: e.target.value});
                                }}
                            />

                            <p className="error-message"> {this.state.loginStatus} </p>
                            <p className="forgotPassword">ลืมรหัสผ่าน</p>
                            
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

