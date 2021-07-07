import React from 'react';
import styled from 'styled-components';
import EditIcon from '../../images/edit.png'
import './Table.css';

const StatusIcon = styled.div`
    height: 15px;
    width: 15px;
    background-color: ${props => (
        props.status==="avail"? "#43A047" 
        : props.status==="fixing"? "#FB8C00"
            : "#E53935")};
    border-radius: 50%;
    /* display: inline-block; */
`


const Table = ({theadData, tbodyData, edit}) => {
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
                            {rowData.map((item) => (
                                typeof(item)==="object"? 
                                    <td className="custom-td">
                                        {item.map((i) => (
                                            <p className="custom-p">{i}</p>
                                        ))}
                                    </td>
                                    : <td className="custom-td">{item}</td>
                            ))}
                            {edit?
                                <td className="custom-td">
                                    <img type="button" src={EditIcon} alt="edit" width="15px" />
                                </td>
                                :null
                            }
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );};

export default Table;

