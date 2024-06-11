import React from 'react';
import {Pie} from 'react-chartjs-2';
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {Empty} from 'antd';
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({data}) => {
  if (!data?.length) {
    return <Empty description='Нет данных' />;
  }
  // Подготовка данных для графика
  const chartData = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        data: data?.length ? data.map((item) => item.value) : [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(255, 159, 64, 0.7)'
          // Добавьте еще цвета, если ваши данных больше
        ],
        borderWidth: 1
      }
    ]
  };

  return <Pie data={chartData} />;
};

export default PieChart;
