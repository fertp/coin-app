import { FC } from "react";
import { timeRanges } from "../utils/timeRange";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Button } from "@/features/public/components";
import { setTimeRange } from "@/features/public/slices/assetSlice"; 
import { useGetAssetHistoryQuery } from "@/services/api";
import { ClipLoader, ScaleLoader } from "react-spinners";

interface Props {
  id: string
}

export const IntervalButtons:FC<Props> = ({ id }) => {

  const { timeRange } = useAppSelector(state => state.asset)

  const dispatch = useAppDispatch()

  const { isFetching } = useGetAssetHistoryQuery({ id, timeRange })

  return (
    <div className="mt-4 flex gap-2">
      {timeRanges.map(item => (
        <Button 
          key={item}
          handleClick={() => dispatch(setTimeRange(item))}
          selected={ timeRange === item }
          className="relative"
        >
          <>
            {
              (timeRange === item && isFetching) && 
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-6">
                <ClipLoader color="#ffffff" size={24} />
              </div>
            }
            <span className={`${(timeRange === item && isFetching) && 'text-orange-500'}`}>{item}</span>
          </>
        </Button>
      ))}
    </div>
  )
}