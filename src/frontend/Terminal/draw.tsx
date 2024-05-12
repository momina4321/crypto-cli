import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';



interface Props {
  data: any[];
  columns: string[];
  file:string
}

export const Draw: React.FC<Props> = ({ data, columns,file}) => {

    


    function toPascalCase(str: string) {
        return str
          .replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
          })
          .replace(/\s+/g, "");
      }



    return (<div>
        Drawing chart based on {file}...
        
    <ResponsiveContainer width="95%" height={250}>
      <LineChart
        width={500}
        height={700}
        data={ data }
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={toPascalCase(columns[0])} />
        <YAxis />
        <Tooltip />
        <Legend />
        {columns.map((column, index) => (
          <Line
            key={index}
            type="monotone"
            dataKey={ toPascalCase (column)}
            stroke={`#${Math.floor(Math.random()*16777215).toString(16)}`}
            dot={false}
          />
        ))}
      </LineChart>
     
    </ResponsiveContainer>
    </div>
  );
};
