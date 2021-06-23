import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import axios from 'axios'
import TextField from '@material-ui/core/TextField';
import './Login.css'

export default class main extends Component {
    state = {
        // usernameReq: "",
        // passwordReq: "",
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
            <div className="bg">
                <div className="login-container">
                    <h1 className="flex">Log In</h1>
                    <TextField
                        className="textfield"
                        placeholder="username"
                        type="text"
                        margin="normal"
                        variant="outlined"
                        onChange={(e) => {
                            this.setState({username: e.target.value});
                        }}
                    /> 
                    <TextField
                        className="textfield"
                        placeholder="password"
                        type="password"
                        margin="normal"
                        variant="outlined"
                        onChange={(e) => {
                            this.setState({password: e.target.value});
                        }}
                    /> 
                    <p className="red"> {this.state.loginStatus} </p>   
                    <button onClick={this.login}>Log In</button> 
                    {this.state.isLoggedIn ? <Redirect to="/home" />
                        :null
                    }
                </div>
            </div>
        )
    }   
}

