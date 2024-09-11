"use client";
import React from 'react';
import { useEffect, useState, useRef } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from 'chart.js';
import style from '../styles/charts.module.css';
import {Divider} from 'antd';

ChartJS.register(...registerables);

const getBarData = async () =>{
     const res = await fetch(`http://127.0.0.1:8000/api/barchart-data`);
     if (res.status==400) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
}


const BarChart = () =>{
  
  const [data, setData] = useState({labels:[], datasets:[{data:[], fill:true,backgroundColor:"rgba(75,192,192,0.2)", borderColor: "rgba(75,192,192,1)"}]});

   useEffect(()=>{

    const fetchData = async () => {
      const result = await getBarData();
      const {labels, data} = result
      setData({
          labels: labels?? [],
          datasets:[
            {
              data: data ??[],
              ...data.datasets,
            }
          ]

        });
     
    };
    fetchData().catch(console.error);
   },[])


   
   return (
    <>
    <Divider className={style.divider}>Bar Chart</Divider>
     <div id="chart" className={style.chartContainer}
            
        >

          <Bar
          className={style.chartJsContainer}
        data={data}
        options={{
           responsive: true,
    maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          }
        }}
      />
        </div>
    </>

   )

}

export default BarChart;