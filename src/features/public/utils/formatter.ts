export const formatter = {

  toUSDollar: ({ value, fractions=2 }:{ value: number, fractions?: number }) => {
    return Intl
      .NumberFormat('en-Us', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: fractions,
        maximumFractionDigits: fractions
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
  },

  toNumber: ({ value }:{ value: number }) => {
    return Intl
      .NumberFormat('en-Us')
      .format( value )
  },

  toCustomDate: ({ date }:{ date: Date }) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const day = date.getDate()
    const month = months[date.getMonth()]
    const year = date.getFullYear()
    return `${day} ${month} ${year}`
  }

}