import React from "react";
import { ResponsiveContainer, PieChart, Pie,Cell } from "recharts";
import { Panel } from "react-bootstrap";


    


const PIgraph = (props) => {
  const emotions = props.data;
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042','#f03434','#9a12b3','#81cfe0','#f0ff00'];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({
        cx, cy, midAngle, innerRadius, outerRadius, percent, index,
    }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
        let name = '';
        if(emotions[index].emotion==0.0){
            name = ''
        }
        else{
            name = emotions[index].name;
        }
        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {name}
            </text>
        );
    };
  return(
    <ResponsiveContainer width="100%" height={250}>
                <PieChart height={250}>
                    <Pie
                        data={emotions}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="emotion"
                    >
                        {
                            emotions.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                        }
                    </Pie>
                </PieChart>
        </ResponsiveContainer>
  )
}
export default PIgraph;