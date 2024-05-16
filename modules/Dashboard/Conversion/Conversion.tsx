'use client';
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from 'chart.js';
import {Bar} from 'react-chartjs-2';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const Conversion = () => {
  const config = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    }
  };
  return (
    <Bar
      options={config}
      data={{
        labels: ['10.05', '11.05', '12.05', '13.05', '14.05', '15.05', '16.05'],
        datasets: [
          {
            label: 'Конверсия',
            data: [2, 6, 5, 3, 4, 5, 1],
            borderColor: '#4880ff',
            backgroundColor: '#8baaf080',
            borderWidth: 2,
            borderRadius: 15,
            borderSkipped: false
          }
        ]
      }}
    />
  );
};
