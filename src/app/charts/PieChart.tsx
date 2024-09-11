"use client";
import React from 'react';
import { useEffect, useState, useRef } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from 'chart.js';
import style from '../styles/charts.module.css';
import {Divider} from 'antd';

ChartJS.register(...registerables);

const getPieData = async () =>{
     const res = await fetch(`http://127.0.0.1:8000/api/piechart-data`);
     if (res.status==400) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
}


const PieChart = () =>{
  
  const [data, setData] = useState({labels:[], datasets:[{data:[], fill:true,backgroundColor:["rgba(75,192,192,0.2)", "rgba(75,192,75,0.2)", "rgba(75,75,192,0.2)"], borderColor: "rgba(75,192,192,1)"}]});

   useEffect(()=>{

    const fetchData = async () => {
      const result = await getPieData();
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
    <Divider className={style.divider}>Pie Chart</Divider>
     <div id="chart" className={`${style.chartContainer}`}
            
        >

          <Pie
          className={style.chartJsContainer}
        data={data}
        options={{
          responsive: true,
    maintainAspectRatio: false,
          plugins: {
            
            legend: {
              display: true,
              position:'top',
              align:'center',
            }
          }
        }}
      />
        </div>
    </>

   )

}

export default PieChart;