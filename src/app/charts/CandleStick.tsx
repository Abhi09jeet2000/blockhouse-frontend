"use client";
import React from 'react';
import { useEffect, useState, useRef } from "react";
import { createChart } from 'lightweight-charts';
import style from '../styles/charts.module.css';
import {Divider} from 'antd';
const getCandleStickData = async () =>{
     const res = await fetch(`http://127.0.0.1:8000/api/candlestick-data`);
     if (res.status==400) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
}



const CandleStick = () =>{
  
  const [data, setData] = useState([]);
  const chartContainerRef = useRef(null);

   useEffect(()=>{

    const fetchData = async () => {
      const result = await getCandleStickData();
      setData(result.data);
     
    };
    fetchData().catch(console.error);
   },[])

   useEffect(()=>{
    if(data.length>0){
       const chart  =  createChart(document.getElementById('candlestick')!);
      const candlestickSeries = chart.addCandlestickSeries({
         upColor: '#26a69a', downColor: '#ef5350', borderVisible: false,
        wickUpColor: '#26a69a', wickDownColor: '#ef5350',
      });



   candlestickSeries.setData([...data])

   chart.timeScale().fitContent();

    const handleResize = () => {
                chart.applyOptions({ width: chartContainerRef?.current?.clientWidth });
            };

   window.addEventListener('resize', handleResize);
            return () => {
                window.removeEventListener('resize', handleResize);

                chart.remove();
            };
    }
   },[data])
   
   return (
    <>
    
      <Divider className={style.divider}>CandleStick Chart</Divider>
     <div id="candlestick" className={style.chartContainer}
            ref={chartContainerRef}
        ></div>
    </>

   )

}

export default CandleStick;