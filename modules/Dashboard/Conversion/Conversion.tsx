'use client';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import {Line} from 'react-chartjs-2';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
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
    <Line
      options={config}
      data={{
        labels: data.map((item) => item.date),
        datasets: [
          {
            label: 'Конверсия (%)',
            data: data.map((item) => item.value),
            borderColor: '#4880ff',
            backgroundColor: '#8baaf080',
            borderWidth: 2
            // borderRadius: 15,
            // borderSkipped: false
          }
        ]
      }}
    />
  );
};
