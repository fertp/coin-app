import { ActionButton, Td, Th, Thead } from "@/features/public/components";
import { formatter } from "@/features/public/utils/formatter";
import { Exchange } from "@/interfaces/interfaces";
import { FC } from "react";
import { Link } from "react-router-dom";

interface Props {
  exchanges: Exchange[]
}

export const Table:FC<Props> = ({ exchanges }) => {
  return (
    <table className='w-full'>
      <colgroup>
        <col />
        <col className='min-w-fit' />
        <col />
        <col />
        <col />
        <col />
        <col />
      </colgroup>

      <Thead>
        <Th 
          align="center" 
          className='hidden md:table-cell'
        >
          Rank
        </Th>

        <Th align="left">Name</Th>

        <Th>Trading Pairs</Th>
        
        <Th className='hidden md:table-cell'>Top Pairs</Th>
        
        <Th>Volume (24Hr)</Th>
        
        <Th className='hidden md:table-cell'>Total (%)</Th>
        
        <Th 
          align="center" 
          className='hidden md:table-cell'
        >
          Status
        </Th>

        <Th className='hidden md:table-cell'>&nbsp;</Th>
      </Thead>

      <tbody>
        {
          exchanges.map(e => (
            <tr 
              key={e.exchangeId}
              className="border-b border-gray-200 hover:bg-orange-100"
            >
              <Td 
                align="center"
                className='hidden md:table-cell'
              >
                {e.rank}
              </Td>

              <Td align="left">
                <Link
                  className="inline-block hover:underline text-orange-600"
                  to={ `/exchanges/${e.exchangeId}` }
                >
                  { e.name }
                </Link>
              </Td>

              <Td>
                {e.tradingPairs}
              </Td>

              <Td className='hidden md:table-cell'>
                {'-'}
              </Td>

              <Td>
                {formatter.toCompactUSDollar({ value: Number(e.volumeUsd) })}
              </Td>

              <Td className='hidden md:table-cell'>
                {formatter.toPercentage({ value: Number(e.percentTotalVolume) })}
              </Td>

              <Td 
                align="center"
                className='hidden md:table-cell'  
              >
                {e.socket ? '🟢' : '⚪'}
              </Td>

              <Td className="hidden md:table-cell">
                {/* <span className="inline-block py-1"> */}
                  <ActionButton 
                    to={ `/exchanges/${e.exchangeId}` }
                    aria-label={`Go to ${e.name} page`}
                    className='inline-block my-1'
                  >
                    <span>Details</span>
                  </ActionButton>
                {/* </span> */}
              </Td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}
