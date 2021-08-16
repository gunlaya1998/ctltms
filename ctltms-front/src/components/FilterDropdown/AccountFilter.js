import React, { Component } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './Filter.css';

export default class main extends Component {
    constructor(props){
        super(props)
        this.state = {
            selectedStatus: 'ทั้งหมด',
            statusAccount: ['ทั้งหมด', 'ใช้งานอยู่', 'ระงับการใช้งาน']
        }
    }

    handleSelect = (e) => {
        this.setState({ selectedStatus: e.target.value });
    }

    render(){
        if (!this.props.showFilter) {
            return null;
        }
        return (
            <div className="filter-column">
                <div className="filter-rowflexEnd">
                    <div className="filter-triangle"></div>
                </div>
                
                <div className="filter-container">
                    <Form noValidate onSubmit={this.handleSubmit}>
                        <Form.Group controlId="status">
                            <Form.Label>สถานะบัญชี</Form.Label>
                            <Form.Control 
                                as="select" 
                                className="filter-formWidth"
                                onChange={this.handleSelect}
                                required>
                                {this.state.statusAccount.map((data) => 
                                    <option className="form-option" value={data}>
                                        {data}
                                    </option>
                                )}
                            </Form.Control>
                        </Form.Group>                    
                    </Form> 
                    <div className="rowCenter">
                        <Button 
                            type="submit" 
                            className="filter-btn" 
                            onClick={this.handleSubmit}>
                            กรอง
                        </Button>
                    </div>
                </div>
            </div>
        )
    }   
} 