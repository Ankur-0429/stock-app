import React from 'react';
import { Line } from "react-chartjs-2"



const DataPoint = ({data}:any) => {
    
    let labelArr = []
    let labelD = []
    for (let i = 0; i < data.length; i++) {
        labelArr.push(data[i].date)
        labelD.push(data[i].open)
    }

    const graph = {
        
        labels: labelArr,
        
        datasets: [
          {
            label: data[0].symbol,
            fill: false,
            lineTension: 0,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: labelD
          }
        ]
      }
    
    return (
        <Line
            data={graph}
        />
    )
}

export default DataPoint