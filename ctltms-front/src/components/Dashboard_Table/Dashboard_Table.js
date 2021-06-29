import React from 'react';
import styled from 'styled-components';
import './Dashboard_Table.css';

const StyledThead = styled.thead`
    border-bottom: 1px solid #B3B9BD;
    & :nth-child(1) {
        background-color:  ${props => 
            (props.theme==="Green"? '#43A047'
                : props.theme==="Orange"? '#FB8C00'
                    :'#E53935')};
        color: white;
    }
    & :nth-child(2) {
        background-color: white;
        color: ${props => 
            (props.theme==="Green"? '#43A047'
                : props.theme==="Orange"? '#FB8C00'
                    :'#E53935')};
    }
`


const DashboardTable = ({theme, data}) => {
    return (
        theme==="Red"? 
            <div class="dash-custom-table-no-mr">
                <table class="table table-bordered">
                    <StyledThead theme={theme}>
                        <tr>
                            <th colspan="2" class="dash-th">{data.title}</th>
                            <th class="dash-th">{data.total}</th>
                        </tr>
                    </StyledThead>

                    <tbody>
                        {data.car.map((row) => (
                            row.class==="normal"?
                            <>
                                <tr>
                                        <td rowspan="2" class="dash-td">{row.size}</td>
                                        <td class="dash-td">{row.type[0][0]}</td>
                                        <td class="dash-td">{row.type[0][1]}</td>
                                </tr>
                                <tr>
                                        <td class="dash-td">{row.type[1][0]}</td>
                                        <td class="dash-td">{row.type[1][1]}</td>
                                </tr>
                            </>
                            : <>
                                <tr>
                                    <td colspan="2" class="dash-td">{row.size}</td>
                                    <td class="dash-td">{row.amount}</td>
                                </tr>
                            </>
                        ))}
                        
                        
                    </tbody>
                </table>
            </div>
            :
            <div class="dash-custom-table">
                <table class="table table-bordered">
                    <StyledThead theme={theme}>
                        <tr>
                            <th colspan="2" class="dash-th">{data.title}</th>
                            <th class="dash-th">{data.total}</th>
                        </tr>
                    </StyledThead>

                    <tbody>
                        {data.car.map((row) => (
                            row.class==="normal"?
                            <>
                                <tr>
                                        <td rowspan="2" class="dash-td">{row.size}</td>
                                        <td class="dash-td">{row.type[0][0]}</td>
                                        <td class="dash-td">{row.type[0][1]}</td>
                                </tr>
                                <tr>
                                        <td class="dash-td">{row.type[1][0]}</td>
                                        <td class="dash-td">{row.type[1][1]}</td>
                                </tr>
                            </>
                            : <>
                                <tr>
                                    <td colspan="2" class="dash-td">{row.size}</td>
                                    <td class="dash-td">{row.amount}</td>
                                </tr>
                            </>
                        ))}
                        
                        
                    </tbody>
                </table>
            </div>
    );
};

export default DashboardTable;

