/**
 *  # dataPoint.tsx
 *  The purpose of this file is to define a function to take in data, and a theme, to display using Chart.js
 *  
 *  ## Authors
 *  - Main Author: Ankur Ahir
 *  - Co Author: Albert Lee
 * 
 *  
 * 
 *
 * 
 */

import React from 'react';
import { Line } from "react-chartjs-2"

/**
 * 
 * @param data the raw data sent by the backend
 * @returns data sorted by closing price and date
 * 
 */
const grabArr = (data) => {
  let labelArr = []
  let labelD = []
  let labelV = []
  for (let i = 0; i < data.length; i++) {
    labelArr.push(data[i].date.substring(0, 10))
    labelD.push(data[i].open)
    labelV.push(data[i].volume)
  }
  return [labelArr.reverse(), labelD.reverse(), labelV.reverse()]
}

/**
 * 
 * @param data the cleaned data given by grabArr
 * @param theme a boolean that deterimines if theme is dark mode or light mode and selects the colors
 * @returns the cleaned data and the options for Chart.js
 */
const DataPoint = ({ data, theme, log }: any) => {
  let temp = grabArr(data)
  const labelArr = temp[0]
  const labelD = temp[1]
  const labelV = temp[2]

  const percentChange = Math.round(((labelD[labelD.length - 1] - labelD[0]) / labelD[labelD.length - 1]) * 100)
  let ifNaN = isNaN(percentChange)
  let ifPositive = percentChange > 0
  let positive = ifPositive ? '+' : ''
  let colorIndex = 0

  if (labelD[0] > labelD[labelD.length - 1]) {
    colorIndex = 1
  }

  let labelSymbol = ''
  if (data.length == 0) {
    labelSymbol = 'N/A'
  }
  else {
    labelSymbol = data[0].symbol
  }
  // Here we can define the colors we want to display
  const darkGreen = '#009D00'
  const lightGreen = '#66FF00'
  const red = '#FF0000'
  const ruby = '#E0115F'
  // const lime = '#11E092'
  // If we ever want to add more colors we can easily expand this
  const colorpairs = [[lightGreen, darkGreen], [ruby, red], [red, red]]

  // Choose a color pair based on the index and switch between themes easily
  const themeColor = colorpairs[colorIndex][theme ? 1 : 0]
  const graph = {
    data: {
      labels: labelArr,

      datasets: [
        {
          label: "Volume",
          data: labelV,
          borderColor: red,
          backgroundColor: red,
          type: 'bar',
          order: 2,
          yAxisID: 'volume',
        },
        {
          label: labelSymbol,
          fill: false,
          lineTension: 0.1,
          backgroundColor: themeColor,
          borderColor: themeColor,
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          borderWidth: 2,
          pointBorderColor: themeColor,
          pointBackgroundColor: themeColor,
          pointBorderWidth: 1,
          pointHoverRadius: 2,
          pointHoverBackgroundColor: themeColor,
          pointHoverBorderColor: themeColor,
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 1000,
          data: labelD,
          order: 1,
          yAxisID: 'y',
        }
        
      ]
    },
    options: {
      interaction: {
        axis: 'x'
      },
      plugins: {
        title: {
          display: true,
          text: "stonks",
        },
      },
      scales: {
        x: {
          ticks: {
            display: false,
          },
          grid: {
            display: false
          }
        },

        y: {
          type: "linear",
          grid: {
            color: !theme ? '#696969' : '#E6E6FA'
          },
          stacked: false,
          min: Math.min(...labelD) - 10 * Math.min(...labelD),
          max: Math.max(...labelD),
        },

        volume: {
          type: "linear",
          display: true,
          position: 'right',
          min: Math.min(...labelV),
          max: Math.max(...labelV)*10,

        }
      }
    }
  }

  return (
    <div style={{ height: "70vh" }}>
      <Line
        data={graph.data}
        options={graph.options}
      />
    </div>
  )
}

export default DataPoint