import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import './Sidebar.css'

const MenuItem = styled(Link)`
    font-size: 0.875rem;
    font-weight: 300;
    color: #212529;
    padding-bottom: 6px;
    text-decoration: none;
`

const MenuSelected = styled(Link)`
    font-size: 0.875rem;
    font-weight: 500;
    color: #366F47;
    padding-bottom: 6px;
    text-decoration: none;
`

export default class main extends Component {
    state = {
        staffMenu: ['S01 - ภาพรวมระบบ', 'S02 - จัดการบัญชีผู้ใช้', 'S03 - จัดการข้อมูลรถขนส่ง', 'S04 - จัดการข้อมูลพนักงาน',
                    'S05 - จัดการการจองรถ', 'S06 - จัดการ Order', 'S07 - รายงาน', 'S08 - บริการหลังการขาย'],
        customerMenu: ['C01 - การจองรถ', 'C02 - สถานะ Order', 'C03 - จัดการข้อมูลผู้เข้าใช้งาน', 'C04 - จัดการข้อมูลสถานที่รับส่งสินค้า'],
        pages: ['/home', '/account', '/vehicles', '/staff', '/booking', '/order', '/report', '/service']
    }

    render(){
        return (
            <div className="sidebarStyle d-flex flex-column flex-shrink-0 p-3 bg-light float-left" >                
                <div className="menuHeader">ระบบควบคุม</div>
                <ul className="menuItems nav nav-pills flex-column">
                    {this.state.staffMenu.map( (menu, index) => {
                        return (index+1)===this.props.menuIndex? 
                                    <MenuSelected   
                                        to={this.state.pages[index]}                                         key={index+1} 
                                        className="item nav-item">
                                            {menu}
                                    </MenuSelected>
                                    : <MenuItem 
                                        to={this.state.pages[index]}
                                        key={index+1} 
                                        className="item nav-item">
                                            {menu}
                                    </MenuItem>
                        }
                    )}
                </ul>
                <div className="menuHeader-2">ระบบสำหรับลูกค้า</div>
                <ul className="menuItems nav nav-pills flex-column">
                    {/* {this.state.customerMenu.map( (menu, index) => {
                        return (index+9)===this.props.menuIndex? 
                                    <MenuSelected
                                        
                                        key={index+9} 
                                        className="item nav-item">
                                            {menu}
                                    </MenuSelected>
                                    : <MenuItem 

                                        key={index+9} 
                                        className="item nav-item">
                                            {menu}
                                    </MenuItem>
                        }
                    )} */}
                </ul>
            </div>
        )
    }   
}