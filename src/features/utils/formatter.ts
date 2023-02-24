export const formatter = {

  toUSDollar: ({ value }:{ value: number }) => {
    return Intl
      .NumberFormat('en-Us', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })
      .format( value )
  },

  toCompactUSDollar: ({ value }:{ value: number }) => {
    return Intl
      .NumberFormat('en-Us', {
        style: 'currency',
        currency: 'USD',
        notation: 'compact',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })
      .format( value )
      .toLowerCase()
  },

  toPercentage: ({ value }:{ value: number }) => {
    return Intl
      .NumberFormat('en-US', {
        style: 'percent',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })
      .format( value / 100 );
  }

}