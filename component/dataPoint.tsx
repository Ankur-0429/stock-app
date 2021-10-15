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

import { useEffect, useState } from 'react';
import { Bar, Line } from "react-chartjs-2"
import buttonStyle from '../styles/yearButton.module.css';
import styles from '../styles/NavContainer.module.css';


export function fetcher(symbol, period, setData) {
  fetch(process.env.NEXT_PUBLIC_URL + period + "/query?symbol=" + symbol)
    .then((res) => res.json())
    .then((data) => setData(data))
}

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

const DataPoint = ({symbol, theme}) => {
  const [data, setData] = useState([])

  useEffect(() => { fetcher(symbol, 20, setData) }, [symbol])
  

  const buttonPadding = "100px"
  const years = [20, 10, 5, 3, 1]

  let temp = grabArr(data)
  const labelArr = temp[0]
  const labelD = temp[1]
  const labelV = temp[2]

  let colorIndex = 0

  if (labelD[0] > labelD[labelD.length - 1]) {
    colorIndex = 1
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
          label: 'Stock Value',
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
          pointRadius: 0.1,
          pointHitRadius: 5,
          data: labelD
        }
      ]
    },
    options: {
      maintainAspectRatio: false,
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
          ticks: {
            display: true,
          },
          grid: {
            color: theme ? '#909090' : '#696969'
          }
        }
      }
    }
  }
  const graph2 = {
    data: {
      labels: labelArr,

      datasets: [
        {
          label: 'volume',
          data: labelV,
          borderColor: red,
          backgroundColor: red,
        }
      ]
    },
    options: {
      scaleShowLabels: false,
      maintainAspectRatio: false,
      scales: {
        x: {
          ticks: {
            display: false,
          },
          grid: {
            display: false,
          }
        },
        y: {
          ticks: {
            display: false,
            scaleShowLabels: false,
          },
          grid: {
            display: false,
            color: theme ? '#909090' : '#696969'
          }
        }
      }
    }

  }

  return (<>
    <div style={{ height: "70vh" }}>
      <Line
        data={graph.data}
        options={graph.options}
      />
    </div>
    <div style={{ height: "20vh", paddingLeft: '26px' }}>
      <Bar
        data={graph2.data}
        options={graph2.options}
      />
    </div>
    {/* Creates a set of buttons that set the range of the graph */}
    <div className={styles.container} style={{ paddingLeft: `${buttonPadding}`, paddingRight: `${buttonPadding}`, fontSize: "large" }}>
      {years.map((range) => {
        return <button
          className={buttonStyle.yearButton}
          style={{ color: themeColor }}
          key={range}
          onClick={() => fetcher(symbol, range, setData)}>
          {range}Y
        </button>
      })}
    </div>
  </>)
}

export default DataPoint