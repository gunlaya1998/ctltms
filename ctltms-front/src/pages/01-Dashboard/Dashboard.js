import React, { Component } from 'react';
// import axios from 'axios';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar'
import Table from '../../components/Table/Table';
import DashboardTable from '../../components/Dashboard_Table/Dashboard_Table';
import '../../components/Global_style.css'
import './Dashboard.css'

export default class main extends Component {
  state = {
    theadData:  ['ที่', 'ชื่อ-สกุล', 'ชื่อเล่น', 'เบอร์โทรศัพท์', 'สถานะการปฏิบัติงาน', 'หมายเลข Order', 'ลูกค้า'],
    tbodyData:  [["1", "johny y.", "john","0812345678", "working", "cp1523", "CP"], 
                ["2", "alexa p.", "nile","0912345678", "pending", "sk5424", "Sukishi"],
                ["3", "jenny h.", "jay","0212345678", "working", "jh2563", "Black Canyon"],
                ["1", "johny y.", "john","0812345678", "working", "cp1523", "CP"], 
                ["2", "alexa p.", "nile","0912345678", "pending", "sk5424", "Sukishi"],
                ["3", "jenny h.", "jay","0212345678", "working", "jh2563", "Black Canyon"]],
    dashAvail:  {
                  'title': 'รถพร้อมใช้งาน', 
                  'total': 64,
                  'car' :   [{'class': 'normal', 'size': '4 ล้อ', 'type': [['แห้ง', 18], ['ห้องเย็น', 12]]},
                            {'class': 'normal', 'size': '6 ล้อ', 'type': [['แห้ง', 16], ['ห้องเย็น', 11]]},
                            {'class': 'normal', 'size': '10 ล้อ', 'type': [['แห้ง', 4], ['ห้องเย็น', 3]]},
                            {'class': 'special', 'size':'หัวลากพร้อมหาง', 'amount': 1},
                            {'class': 'special', 'size':'หัวลากปั่นไฟพร้อมหาง','amount': 1}]
                },
    dashFix:  {
                  'title': 'รถอยู่ระหว่างซ่อม', 
                  'total': 5,
                  'car' :   [{'class': 'normal', 'size': '4 ล้อ', 'type': [['แห้ง', '-'], ['ห้องเย็น', 1]]},
                            {'class': 'normal', 'size': '6 ล้อ', 'type': [['แห้ง', 1], ['ห้องเย็น', 2]]},
                            {'class': 'normal', 'size': '10 ล้อ', 'type': [['แห้ง', 1], ['ห้องเย็น', '-']]},
                            {'class': 'special', 'size':'หัวลากพร้อมหาง', 'amount': '-'},
                            {'class': 'special', 'size':'หัวลากปั่นไฟพร้อมหาง','amount': '-'}]
                },
    dashOOF:  {
      'title': 'รถเสีย', 
      'total': 2,
      'car' :   [{'class': 'normal', 'size': '4 ล้อ', 'type': [['แห้ง', '-'], ['ห้องเย็น', 1]]},
                {'class': 'normal', 'size': '6 ล้อ', 'type': [['แห้ง', '-'], ['ห้องเย็น', 1]]},
                {'class': 'normal', 'size': '10 ล้อ', 'type': [['แห้ง', '-'], ['ห้องเย็น', '-']]},
                {'class': 'special', 'size':'หัวลากพร้อมหาง', 'amount': '-'},
                {'class': 'special', 'size':'หัวลากปั่นไฟพร้อมหาง','amount': '-'}]
    }
  }

  render(){
    return (
      <div>
        <Navbar />
          <div className="global-container">
            <Sidebar menuIndex={1} />
            <div className="global-content">
              <div className="global-title">S01 - ภาพรวมระบบ</div>
{/* Content Start Here */}
              <div class="global-row">
                <DashboardTable theme="Green" data={this.state.dashAvail} />
                <DashboardTable theme="Orange" data={this.state.dashFix} />
                <DashboardTable theme="Red" data={this.state.dashOOF} />
              </div>

              <div class="global-row">

                <div class="dash-container mr-15">
                  <div class="dash-title">พนักงานขับรถ</div>
                  <Table theadData={this.state.theadData} tbodyData={this.state.tbodyData} />
                </div>

                <div class="dash-container">
                  <div class="dash-title">Order</div>
                  <Table theadData={this.state.theadData} tbodyData={this.state.tbodyData} />
                </div>

              </div>
{/* Content End Here */}
            </div>
          </div>
      </div>
    )
  }   
}