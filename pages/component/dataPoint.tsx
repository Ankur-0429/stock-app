import React from 'react';
import { Line } from "react-chartjs-2"


const grabArr = (data) => {
  let labelArr = []
  let labelD = []
  for (let i = 0; i < data.length; i++) {
    labelArr.push(data[i].date.substring(0,10))
    labelD.push(data[i].open)
  }
  return [labelArr.reverse(), labelD.reverse()]
}


const DataPoint = ({ data }: any) => {


  let temp = grabArr(data)
  const labelArr = temp[0]
  const labelD = temp[1]
  let color = 'green'
  
  if (labelD[0] > labelD[labelD.length-1]) {
    color = 'red'
  }

  let LabelSymbol = ''
  if (data.length == 0){
    LabelSymbol = 'N/A'
  }
  else {
    LabelSymbol = data[0].symbol
  }
  const graph = {

    labels: labelArr,

    datasets: [
      {
        label: LabelSymbol,
        fill: false,
        lineTension: 0,
        backgroundColor: color,
        borderColor: color,
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: color,
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: color,
        pointHoverBorderColor: color,
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 1000,
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