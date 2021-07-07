import React from 'react';
import styled from 'styled-components';
import './Dashboard_Table.css';

const MarginOption = styled.div`
    width: 100vw;
    border: 1px solid #B3B9BD;
    border-radius: 6px;
    overflow:hidden;
    font-family: 'Kanit';
    margin-right: ${props => (props.theme==="Red"? '0' : '0.9375rem')};
`

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
        <MarginOption theme={theme}>
            <table key={theme} className="table table-bordered">
                <StyledThead theme={theme}>
                    <tr>
                        <th key={data.title} colSpan="2" className="dash-th">{data.title}</th>
                        <th key="data.total" className="dash-th">{data.total}</th>
                    </tr>
                </StyledThead>

                <tbody>
                {data.car.map((row, index) => (
                        row.class==="normal"?
                        <>
                            <tr>
                                <td key={row.size} rowSpan="2" className="dash-td">{row.size}</td>
                                <td key={index+'00'} className="dash-td">{row.type[0][0]}</td>
                                <td key={index+'01'} className="dash-td">{row.type[0][1]}</td>
                            </tr>
                            <tr>
                                <td key={index+'10'} className="dash-td">{row.type[1][0]}</td>
                                <td key={index+'11'} className="dash-td">{row.type[1][1]}</td>
                            </tr>
                        </>
                        : <>
                            <tr>
                                <td key={row.size+row.class} colSpan="2" className="dash-td">{row.size}</td>
                                <td key={index} className="dash-td">{row.amount}</td>
                            </tr>
                        </>
                    ))}
                </tbody>
            </table>
        </MarginOption>
    );
};

export default DashboardTable;

