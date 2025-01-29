"use client";

import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

interface PieData {
  name: string;
  value: number;
}

interface DynamicPieChartProps {
  data: PieData[];
}

const DynamicPieChart: React.FC<DynamicPieChartProps> = ({ data }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const COLORS = [
    "rgb(224, 83, 125)",
    "rgb(77, 120, 231)",
    "rgb(106, 165, 218)",
    "rgb(28, 215, 147)",
    "rgb(254, 216, 60)",
    "rgb(255, 147, 86)",
    "rgb(228, 228, 228)",
    "rgb(58, 44, 77)",
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884D8",
    "#82CA9D",
    "#F06292",
    "#BA68C8",
    "#4DD0E1",
    "#DCE775",
  ];
  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);
  const getColor = (index: number): string => COLORS[index % COLORS.length];

  const total = data.reduce((sum, entry) => sum + entry.value, 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const color = payload[0].payload.fill || getColor(payload[0].index);
      const percentage = ((payload[0].value / total) * 100).toFixed(1);
      return (
        <div
          style={{
            filter: "drop-shadow(2px 3.5px 0px #000000)",
          }}
          className="bg-white p-6 rounded-[25px] w-[150px] border-[3px] border-black"
        >
          <div className="flex items-center gap-x-[7px]">
            <div
              className="min-w-[8px] min-h-[8px] rounded-full"
              style={{ backgroundColor: color }}
            ></div>
            <p className="font-medium">{payload[0].name}</p>
          </div>
          <p className="text-gray-600">Value: {payload[0].value}</p>
          <p className="text-gray-600">{percentage}%</p>
        </div>
      );
    }
    return null;
  };

  const renderLegend = (props: any) => {
    const { payload } = props;

    return (
      <ul className="flex flex-wrap justify-center w-[90%] mx-auto gap-4 mt-4">
        {payload.map((entry: any, index: number) => {
          const color = entry.color || "#000000"; 
          const percentage = ((entry.payload.value / total) * 100).toFixed(1);
          return (
            <li key={`legend-${index}`} className="flex items-center gap-2">
              <div
                className="w-3 h-3 border-2 border-black rounded-full"
                style={{ backgroundColor: color }}
              />
              <span className="text-[12px] sm:text-sm text-white">
                {entry.value} ({percentage}%)
              </span>
            </li>
          );
        })}
      </ul>
    );
  };
  const multiplier = isSmallScreen ? 30 : 25; // ใช้ 20 สำหรับ sm และ 30 สำหรับหน้าจอขนาดใหญ่
  const dynamicHeight = Math.max(400, multiplier * data.length);
  return (
    <div className="w-full mx-auto" style={{ height: dynamicHeight }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            labelLine={false}
            animationDuration={0}
            data={data}
            cx="50%"
            cy="50%"
            outerRadius="80%"
            fill="#8884d8"
            dataKey="value"
            label={
              true
                ? undefined
                : ({
                    cx,
                    cy,
                    midAngle,
                    innerRadius,
                    outerRadius,
                    value,
                  }: any) => {
                    const RADIAN = Math.PI / 180;
                    const radius =
                      innerRadius + (outerRadius - innerRadius) * 0.5;
                    const x = cx + radius * Math.cos(-midAngle * RADIAN);
                    const y = cy + radius * Math.sin(-midAngle * RADIAN);
                    const percentage = ((value / total) * 100).toFixed(1);

                    return (
                      <text
                        x={x}
                        y={y}
                        fill="white"
                        textAnchor="middle"
                        dominantBaseline="central"
                        className="text-xs"
                      >
                        {percentage}%
                      </text>
                    );
                  }
            }
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={getColor(index)}
                stroke="white"
                strokeWidth={1}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend content={renderLegend} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DynamicPieChart;
