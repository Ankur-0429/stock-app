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
  for (let i = 0; i < data.length; i++) {
    labelArr.push(data[i].date.substring(0, 10))
    labelD.push(data[i].open)
  }
  return [labelArr.reverse(), labelD.reverse()]
}

/**
 * 
 * @param data the cleaned data given by grabArr
 * @param theme a boolean that deterimines if theme is dark mode or light mode and selects the colors
 * @returns the cleaned data and the options for Chart.js
 */
const DataPoint = ({ data, theme }: any) => {
  let temp = grabArr(data)
  const labelArr = temp[0]
  const labelD = temp[1]
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
  const lime = '#11E092'

  // If we ever want to add more colors we can easily expand this
  const colorpairs = [[lightGreen, darkGreen], [ruby, red], [red, red]]

  // Choose a color pair based on the index and switch between themes easily
  const themeColor = colorpairs[colorIndex][theme ? 1 : 0]
  const graph = {
    data: {
      labels: labelArr,

      datasets: [
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
          pointBorderColor: themeColor,
          pointBackgroundColor: themeColor,
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: themeColor,
          pointHoverBorderColor: themeColor,
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
            color: !theme ? '#696969' : '#E6E6FA'
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