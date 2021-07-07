import React from 'react';
import EditIcon from '../../images/edit.png'
import './Table.css';

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

