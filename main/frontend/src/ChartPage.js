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
      name :"분노", emotion:0.3
    },
    {
      name :"경멸", emotion:0.0
      },
    {
      name :"불쾌", emotion:0.0
    },
    {
      name :"공포", emotion:0.0
    },
    {
      name :"행복", emotion:0.0
    },
    {
      name :"슬픔", emotion:0.5
    },
    {
      name :"중립", emotion:0.1
    },
    {
      name :"놀람", emotion:0.1
    },
];
const Chart = (props) => {

  return (
    <>
     <br></br>
     <div style={{ width: 400, height: 300 }}>
    <ResponsiveContainer>
    <BarChart
    width = {300}
    height = {250}
		data={data}
		margin={{
			top: 20, right: 20, bottom: 20, left: 20,
		}}
	>
		<CartesianGrid strokeDasharray="5 5" />
		<XAxis dataKey="name" />
		<YAxis />
		<Tooltip />
		<Legend />
		<Bar barSize={5} dataKey="emotion" fill="#8884d8" />
	  </BarChart>
    </ResponsiveContainer>
    </div>
    </>
  );
}

export default Chart;
