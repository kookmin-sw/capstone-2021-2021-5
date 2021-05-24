import React, { useState } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
  Container, 
  Row, 
  Col 
} from 'reactstrap';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import axios from "axios";


const Chart = (props) => {

  return (
    <>
    
     <div style={{ width: 320, height: 300 }}>
    <ResponsiveContainer>
    <BarChart
    width = {300}
    height = {250}
		data={props.data}
    id="bar"
	>
		<CartesianGrid strokeDasharray="5 5" vertical={false} />
		<XAxis dataKey="name" id="light_txt"/>
		<YAxis hide/>›
		<Tooltip formatter={(value) => value+'%'}/>
		<Bar barSize={5} dataKey="emotion" fill="#f1828d" />
	  </BarChart>
    </ResponsiveContainer>
    </div>
    </>
  );
}

export default Chart;
