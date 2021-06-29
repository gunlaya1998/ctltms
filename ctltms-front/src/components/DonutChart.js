import React from 'react';
import Chart from "react-google-charts";

const Table = ({size, data, colors}) => {
    return (
        <div style={{marginBottom: "1rem"}}>
            <Chart
                width={size}
                height={size}
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={data}
                options={{
                    pieHole: 0.4,
                    legend: {
                        position: "bottom",
                        alignment: "center",
                        textStyle: {
                            color: "233238",
                            fontSize: 13, 
                            fontName: "Kanit"
                        }
                    },
                    chartArea: { left: 15, top: 15, right: 0, bottom: 35 },
                    slices: colors,
                }}
                rootProps={{ 'data-testid': '3' }}
            />   
        </div>
    );
};

export default Table;

