import React from 'react';
import './Table.css';

const Table = ({theadData, tbodyData}) => {
    return (
        <div class="custom-table">

            <table class="table table-striped table-bordered">
                <thead class="custom-thead">
                    <tr>
                        {theadData.map((title) => {
                            return <th class="custom-th" scope="col">{title}</th>;
                        })}
                    </tr>
                </thead>

                <tbody>
                    {tbodyData.map((rowData) => (
                        <tr>
                            {rowData.map((item) => (
                                // <td>{typeof(item)}</td>
                                typeof(item)==="object"? 
                                    <td class="custom-td">
                                        {item.map((i) => (
                                            <p class="custom-p">{i}</p>
                                        ))}
                                    </td>
                                    : <td class="custom-td">{item}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );};

export default Table;

