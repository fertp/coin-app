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
import { useAppSelector } from "@/app/hooks";
import { useGetAssetHistoryQuery } from "@/services/api";
import { getTimeLabel, reduceIntervals } from "../utils/timeRange";

interface Props {
  id: string
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

export const Chart:FC<Props> = ({ id }) => {

  const { timeRange } = useAppSelector(state => state.asset)
  
  const { data: historyData } = useGetAssetHistoryQuery({ id, timeRange })

  const history = reduceIntervals({ intervals: historyData?.data, timeRange })

  const labels = history.map(({ time }) => getTimeLabel({ time, timeRange }))

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
