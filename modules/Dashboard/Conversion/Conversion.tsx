'use client';
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from 'chart.js';
import {Bar} from 'react-chartjs-2';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const Conversion = ({data}) => {
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
        labels: data.map((item) => item.date),
        datasets: [
          {
            label: 'Конверсия (%)',
            data: data.map((item) => item.value.slice(0, -1)),
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
