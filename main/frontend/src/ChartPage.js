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

const data = [
    {
      name :"분노", emotion:30
    },
    {
      name :"경멸", emotion:0
      },
    {
      name :"불쾌", emotion:0
    },
    {
      name :"공포", emotion:0
    },
    {
      name :"행복", emotion:0
    },
    {
      name :"슬픔", emotion:50
    },
    {
      name :"중립", emotion:10
    },
    {
      name :"놀람", emotion:10
    },
];
const Chart = (props) => {

  return (
    <>
    
     <div style={{ width: 320, height: 300 }}>
    <ResponsiveContainer>
    <BarChart
    width = {300}
    height = {250}
		data={data}
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
