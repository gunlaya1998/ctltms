import React, { Component } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar'
import './Dashboard.css'

export default class main extends Component {
    render(){
        return (
          <div>
            <Navbar />
              <div className="row">
                <Sidebar menuIndex={1} />
                <div className="content">
                  <div className="title">S01 - ภาพรวมระบบ</div>
{/* Content Start Here */}
                  <div className="row">
                    <table class="table table-bordered table-striped">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">First</th>
                          <th scope="col">Last</th>
                          <th scope="col">Handle</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">1</th>
                          <td>Mark</td>
                          <td>Otto</td>
                          <td>@mdo</td>
                        </tr>
                        <tr>
                          <th scope="row">2</th>
                          <td>Jacob</td>
                          <td>Thornton</td>
                          <td>@fat</td>
                        </tr>
                        <tr>
                          <th scope="row">3</th>
                          <td>Larry</td>
                          <td>the Bird</td>
                          <td>@twitter</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
{/* Content End Here */}
                </div>
              </div>
          </div>
        )
    }   
}