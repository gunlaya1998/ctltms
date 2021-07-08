import React from 'react';
import styled from 'styled-components';
import EditIcon from '../../images/edit.png'
import './Vehicle_Table.css';

const StatusIcon = styled.div`
    height: 15px;
    width: 15px;
    background-color: ${props => (
        props.status==="พร้อมใช้งาน"? "#43A047" 
        : props.status==="กำลังซ่อม"? "#FFD452"
            : "#E53935")};
    border-radius: 50%;
    display: inline-block;
`


const Table = ({theadData, tbodyData}) => {
    return (
        <div className="custom-table">
            <table className="table table-striped table-bordered responsive">
                <thead className="custom-thead">
                    <tr>
                        {theadData.map((title) => {
                            return <th className="custom-th" scope="col">{title}</th>;
                        })}
                    </tr>
                </thead>

                <tbody>
                    {tbodyData.map((rowData) => (
                        <tr>
                            <td key={rowData.no} className="custom-td">
                                {rowData.no}
                            </td>
                            <td key="plate_no" className="custom-td">
                                {rowData.plate_no}
                            </td>
                            <td key="plate_province" className="custom-td">
                                {rowData.plate_province}
                            </td>
                            <td key="car_size" className="custom-td">
                                {rowData.car_size}
                            </td>
                            <td key="car_type" className="custom-td">
                                {rowData.car_type}
                            </td>
                            <td key="temperature" className="custom-td">
                                {rowData.car_temp_start} - {rowData.car_temp_end}
                            </td>
                            <td key="weight" className="custom-td">
                                {rowData.weight}
                            </td>
                            <td key="status_work" className="custom-td">
                                {rowData.status_work}
                            </td>
                            <td key="status_car" className="custom-td">
                                <StatusIcon status={rowData.status_car} />
                            </td>
                            <td key="edit" className="custom-td">
                                <img type="button" src={EditIcon} alt="edit" width="15px" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );};

export default Table;