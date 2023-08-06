"use client";

import EventLogsRow from "@/components/EventLogsRow";
import LoadMore from "@/components/LoadMore";
import { useState, useEffect } from "react";
import SearchBar from "@/components/SearchBar";
import EmptyStringGray from "@/components/EmptyStringGray";
import useSWR, {mutate} from "swr";
import { LogData } from "@/components/types/general";

const loadDataGet = async (arg: string) => {
  return await (await fetch(arg)).json();
}

export default function Home() {
  const [currFocus, setCurrFocus] = useState("-1");
  const [search, setSearch] = useState("");
  const [isAppend, setIsAppend] = useState(true);
  const [data, setData] = useState([] as LogData[])
  const [count, setCount] = useState(0)
  const [isNext, setIsNext] = useState(true)
  const [isLoadingFake, setIsLoadingFake] = useState(true)
  const [page, setPage] = useState(0)
  const [isReloadPossible, setIsReloadPossible] = useState(false)
  const { data: dataPre, error, isLoading } = useSWR(`/api/events?page=${page}&q=${search}&past_count=${count}`, loadDataGet);

  useEffect(() => {
    if(dataPre) {
      setData([...(isAppend ? data: []), ...dataPre.events])
      if(count) {
        setCount(dataPre.count)
      }
      setIsReloadPossible(false)
      setIsNext(dataPre.isNext)
      setIsAppend(true)
      setIsLoadingFake(false)
    }
  }, [dataPre])

  useEffect(() => {
    if(error) {
      setIsLoadingFake(false)
    }
  }, [error])

  
  useEffect(() => {
    if(!isReloadPossible || !count) {
      setIsReloadPossible(true)
    } else {
      mutate(``)
    }
    return ()=>{
      if(isReloadPossible) {
        setIsReloadPossible(false)
      }
    }
  }, [search, page, count, isReloadPossible])
  
  return (
    <div className="w-full">
      <div className="instts-main-app-window rounded-2xl border border-solid border-gray-100 overflow-visible">
        <div className="bg-gray-100 rounded-t-2xl">
          <SearchBar onSearch={(currSearch: string) => {
            setIsAppend(false)
            setPage(0)
            setSearch(currSearch)
          }} onStartSearch={() => {
            setIsLoadingFake(true)
          }} />
          <div className="flex px-6 pointer-events-none-w-children">
            <div className="flex-1 font-bold py-3 text-gray-500">ACTOR</div>
            <div className="flex-1 font-bold py-3 text-gray-500">ACTION</div>
            <div className="flex-1 font-bold py-3 text-gray-500">DATE</div>
          </div>
        </div>
        {!isLoadingFake && data?.map((item) => (
          <EventLogsRow
            key={item.id}
            onClick={setCurrFocus}
            data={item}
            currFocus={currFocus}
          />
        ))}
        {isLoading || isLoadingFake
          ? [...new Array(3)].map((item, idx) => (
              <div key={idx} className="px-6 py-4">
                <EmptyStringGray length={8} />
                &nbsp;&nbsp;&nbsp;
                <EmptyStringGray length={40} />
              </div>
            ))
          : null}
        <LoadMore onLoadMore={() => {
          setPage(page + 1)
        }} isLoading={isLoading || isLoadingFake} isNext={isNext}/>
      </div>
    </div>
  );
}
