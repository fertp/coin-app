import { FC } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { AssetHistory } from "@/interfaces/interfaces";

interface Props {
  history?: AssetHistory[]
}


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
)

export const Chart:FC<Props> = ({ history=[] }) => {

  const labels = history.map(({ time }) => {
    const date = new Date(time).getHours()
    return date > 12 ? `${date - 12}PM` : `${date}AM`
  });

  const data = {
    labels,
    datasets: [
      {
        fill: false,
        label: '',
        data: history.map(({ priceUsd }) => parseFloat(priceUsd)),
        borderColor: 'rgb(249 115 22)', // orange-500
        backgroundColor: 'rgba(253 186 116)', // orange-300
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
    },
  };

  return (
    <div className="mt-8 md:mt-12">
      <Line options={options} data={data} height={196}/>
    </div>
  )
}
