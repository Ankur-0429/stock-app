import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ComposedChart,
  ResponsiveContainer,
  Bar,
  Cell
} from "recharts";

const formatNumber = (value: number) => {
    
}
const processData = (data) => {
    let array = []
    for (let i = 0; i < data.length; i++) {
        let lejson = {
            date: data[i].date.substring(0, 10),
            close: data[i].close,
            volume: data[i].volume,
            // If the price goes down, volume bar is  red, else it's green
            volcolor: data[i].close > data[i].open ? "#00FF00" : "#FF0000"
        }
        array.push(lejson)
    }
    return array.reverse()
}

const DataPoint2 = ({ data, theme }: any) => {
  data = processData(data)
  
  let colorIndex = 0
  const darkGreen = '#009D00'
  const lightGreen = '#66FF00'
  const red = '#FF0000'
  const ruby = '#E0115F'
  // const lime = '#11E092'
  // If we ever want to add more colors we can easily expand this
  const colorpairs = [[lightGreen, darkGreen], [ruby, red], [red, red]]

  // Choose a color pair based on the index and switch between themes easily
  const themeColor = colorpairs[colorIndex][theme ? 1 : 0]
  return (
    <ComposedChart
      width={1900}
      height={800}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}>
      <CartesianGrid strokeDasharray="3 3" vertical={false}/>
      <XAxis dataKey="date"/>
      <YAxis width={80} yAxisId="left"  padding={{ bottom: 70 }} domain={['auto', 'auto']}/>
      <YAxis width={80} yAxisId="right"  padding={{ top: 600 }} orientation="right" domain={['auto', 'auto']}/>
     
      <Tooltip />
      <Legend />
      <Bar 
        type="monotone" 
        dataKey="volume" 
        stroke="#82ca9d"
        yAxisId="right"
        fill="#82ca9d"
      >
          {
              data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={data[index].volcolor} stroke={data[index].volcolor} />
            ))
          }
      </Bar>
      <Line
        type="monotone"
        dataKey="close"
        stroke={themeColor}
        yAxisId="left"
        activeDot={{ r: 4 }}
        strokeWidth={2}
        dot={false}
      />

    </ComposedChart>
  );
}

export default DataPoint2