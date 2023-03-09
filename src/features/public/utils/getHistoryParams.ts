
export type historyTime = '1d' | '1w' | '1m' | '6m' | '1y'

type intervalMap = {
  [key in historyTime]: string;
}

type timeMap = {
  [key in historyTime]: number;
}

export const getHistoryParams = (time: historyTime ) => {

  const intervalsMap: intervalMap = {
    '1d': 'h1',
    '1w': 'h12',
    '1m': 'd1',
    '6m': 'd1',
    '1y': 'm1'
  }

  const timeMap: timeMap = {
    '1d': 1,
    '1w': 7,
    '1m': 30,
    '6m': 180,
    '1y': 365
  };
  
  const now = new Date()
  const end = now.getTime()
  now.setDate(now.getDate() - timeMap[time])
  const start = now.getTime()
  // const start = now.setDate(now.getDate() - timeMap[time])
  
  return {
    interval: intervalsMap[time],
    start: start,
    end: end
  }
}