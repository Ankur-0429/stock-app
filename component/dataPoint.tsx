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


const DataPoint = ({ data, theme }: any) => {

  let temp = grabArr(data)
  const labelArr = temp[0]
  const labelD = temp[1]
  let color:boolean = true
  
  if (labelD[0] > labelD[labelD.length-1]) {
    color = false
  }

  let LabelSymbol = ''
  if (data.length == 0){
    LabelSymbol = 'N/A'
  }
  else {
    LabelSymbol = data[0].symbol
  }

  const darkGreen = '#009D00'
  const lightGreen = '#66FF00'
  const green = theme ? darkGreen : lightGreen
  const red = '#FF0000'

  const graph = {

    data: {  
      labels: labelArr,
  
      datasets: [
        {
          label: LabelSymbol,
          fill: false,
          lineTension: 0,
          backgroundColor: color ? green:red,
          borderColor: color ? green:red ,
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: color ? green:red ,
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: color ? green:red ,
          pointHoverBorderColor: color ? green:red ,
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 1000,
          data: labelD
        }
      ]
    },
    options: {
      scales: {
        x: {
          grid: {
            display: false
          }
        },
        y: {
          grid: {
            color: !theme ? '#696969': '#E6E6FA'
          }
        }
      }
    }
  }

  return (
    <Line
      data={graph.data}
      options={graph.options}
    />
  )
}

export default DataPoint