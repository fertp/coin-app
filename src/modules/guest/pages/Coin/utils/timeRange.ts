import { type AssetHistory } from '@/types'

export type timeRange = '1d' | '1w' | '1m' | '6m' | '1y'

type intervalMap = {
  [key in timeRange]: string
}

type daysMap = {
  [key in timeRange]: number
}

export const timeRanges: timeRange[] = ['1d', '1w', '1m', '6m', '1y']

export const getHistoryParams = (time: timeRange): { interval: string; start: string; end: string } => {
  const intervalsMap: intervalMap = {
    '1d': 'h1',
    '1w': 'h12',
    '1m': 'd1',
    '6m': 'd1',
    '1y': 'd1'
  }

  const daysMap: daysMap = {
    '1d': 1,
    '1w': 7,
    '1m': 30,
    '6m': 180,
    '1y': 365
  }

  const now = new Date()
  const end = now.getTime()
  // now.setDate(now.getDate() - timeMap[time])
  // const start = now.getTime()
  const start = now.setDate(now.getDate() - daysMap[time])

  return {
    interval: intervalsMap[time],
    start: String(start),
    end: String(end)
  }
}

export const reduceIntervals = ({
  intervals,
  timeRange
}: {
  intervals?: AssetHistory[]
  timeRange: timeRange
}): AssetHistory[] => {
  const auxArr = intervals?.slice().reverse() ?? []

  if (['6m', '1y'].includes(timeRange)) {
    return auxArr.filter((__, idx) => idx === 0 || (idx + 1) % 7 === 0).reverse()
  }

  return auxArr.reverse()
}

export const getTimeLabel = ({ time, timeRange }: { time: number; timeRange: timeRange }): string => {
  const date = new Date(time)

  if (timeRange === '1d') {
    const hour = date.getHours()
    return hour > 12 ? `${hour - 12}PM` : `${hour}AM`
  }

  if (timeRange === '1w') {
    const day = date.getDay()
    const hour = `${date.getHours() > 12 ? `${date.getHours() - 12}PM` : `${date.getHours()}AM`}`
    return `${daysOfWeek[day]} ${hour}`
  }

  if (['1m', '6m', '1y'].includes(timeRange)) {
    const month = date.getMonth()
    const day = date.getDate()
    return `${monthsOfYear[month]} ${day}`
  }

  return '-'
}

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const monthsOfYear = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
