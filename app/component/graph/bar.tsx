import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from "recharts";



interface BarData {
  name: string[];
  value: number;
}

interface DynamicBarChartProps {
  data: BarData[];
  theme:String;
  color:string[];
}

const DynamicBarChart: React.FC<DynamicBarChartProps> = ({ data ,theme,color}) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const getBorderColor =(size:number):string|undefined=>{
    switch(theme){
      case "0001":
        return "transparent";
      case "0002":
        return `${size}px solid black`
    }
  }
  
  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const total = data.reduce((sum, entry) => sum + entry.value, 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const index = data.findIndex(
        (item) => item.name === payload[0].payload.name
      );
      const barColor = color[index % color.length];
      const value = payload[0].value;
      const name = payload[0].payload.name;
      const percentage = ((value / total) * 100).toFixed(1);

      return (
        <div
          style={{
            filter: "drop-shadow(0px 6px 0px rgb(0, 0, 0))",
          border:getBorderColor(3)}}
          className="bg-white p-6 rounded-[25px] w-[150px]"
        >
          <div className="flex items-center gap-x-[7px]">
            <div
              className="min-w-[8px] min-h-[8px] rounded-full"
              style={{ backgroundColor: barColor }}
            ></div>
            <p className="font-medium">{ }</p>
          </div>
          <p className="text-gray-600">Value: {value}</p>
          <p className="text-gray-600">{percentage}%</p>
        </div>
      );
    }
    return null;
  };

  // แก้ไข renderLegend ใหม่
  const renderLegend = () => {
    return (
      <ul className="flex flex-wrap justify-center w-[90%] mx-auto gap-4 mt-4">
        {data.map((entry, index) => (
          <li key={`legend-${index}`} className={`flex items-center gap-2 `}>
            <div
              className={`w-3 h-3 rounded-full `}
              style={{ backgroundColor: color[index % color.length] , border:getBorderColor(2)}}
            />
            <span className="text-[10px] sm:text-sm text-black">
              {entry.name}: {entry.value.toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    );
  };

  const multiplier = isSmallScreen ? 50 : 60;
  const dynamicHeight = Math.max(400, multiplier * data.length);

  return (
    <div className="w-full mx-auto" style={{ height: dynamicHeight }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{
            top: 20,
            right: isSmallScreen ? 20 : 60,
            left: isSmallScreen ? 20 : 60,
            bottom: 5,
          }}
        >
          <CartesianGrid />
          <XAxis type="number" />
          <YAxis
            dataKey="name"
            type="category"
            width={100}
            tick={{
              fill: "white",
              fontSize: "12px", // Adjust font size
              fontWeight: "medium", // Optional: Make the text bold
            }}
            tickFormatter={(value) =>
              value.length > 7 ? `${value.substring(0, 7)}...` : value
            }
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "rgba(255, 255, 255, 0.1)" }}
          />
          <Legend className="mx-auto" content={renderLegend} />
          <Bar dataKey="value" animationDuration={0}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={color[index % color.length]}
                stroke="white"
                strokeWidth={1}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DynamicBarChart;
