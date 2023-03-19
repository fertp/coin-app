import { FC, useContext, useEffect, useRef } from "react";
import { useSearchData } from "../hooks/useSearchData";
import { SearchContext } from "../context/searchContext";
import { ResultItem } from "./ResultItem";
import { useHandleKeys } from "../hooks/useHandleKeys";

export const SearchResults:FC = () => {

  const { query } = useContext(SearchContext)

  const indexesListRef = useRef<({ index: number; to: string; name: string; } | undefined)[]>([]);

  const { assets, exchanges, isLoading } = useSearchData(query);

  let index = 0;
  const assetsResults = assets?.map(a => ({ index: index++, to: `/coins/${a.id}`, name: a.name }))
  const exchangesResults = exchanges?.map(e => ({ index: index++, to: `/exchanges/${e.exchangeId}`, name: e.name }))

  indexesListRef.current = [ assetsResults, exchangesResults ].flat();

  useHandleKeys(indexesListRef);

  return (
    <div className="absolute top-full left-0 mt-1 w-full bg-white border shadow shadow-[rgba(0,0,0,0.25)]">
      { 
        ( assets && assets?.length > 0 ) && 
        <div>
          <b className="px-2 py-2 text-orange-500">Assets:</b> 

          {assetsResults?.map(a => 
            <ResultItem key={a.name} {...a}>{a.name}</ResultItem>
          )}
        </div>
      }

      <hr />
      
      { 
        ( exchanges && exchanges?.length > 0 ) && 
        <div>
          <b className="px-2 py-2 text-orange-500">Exchanges:</b> 

          {exchangesResults?.map(e => 
            <ResultItem key={e.name} {...e}>{e.name}</ResultItem>
          )}
        </div>
      }
    </div>
  )
}
