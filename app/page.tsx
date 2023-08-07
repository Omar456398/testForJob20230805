"use client";

import EventLogsRow from "@/components/EventLogsRow";
import LoadMore from "@/components/LoadMore";
import { useState, useEffect } from "react";
import SearchBar from "@/components/SearchBar";
import EmptyStringGray from "@/components/EmptyStringGray";
import useSWR, { mutate } from "swr";
import { LogData } from "@/components/types/general";

const dataObj: any = {};

export default function Home() {
  const loadDataGet = async (arg: string) => {
    return await (
      await fetch(
        `${arg}${
          arg.includes("past_count") ? "" : `&past_count=${dataObj.count}`
        }`
      )
    ).json();
  };
  const [currFocus, setCurrFocus] = useState("-1");
  const [search, setSearch] = useState("");
  dataObj.search = search;
  const [isAppend, setIsAppend] = useState(true);
  const [data, setData] = useState([] as LogData[]);
  dataObj.data = data;
  const [count, setCount] = useState(0);
  dataObj.count = count;
  const [isNext, setIsNext] = useState(true);
  const [isLoadingFake, setIsLoadingFake] = useState(true);
  const [startAt, setStartAt] = useState(0);
  const [isHotloadEnabled, setIsHotloadEnabled] = useState(false);
  const [isReloadPossible, setIsReloadPossible] = useState(false);
  const {
    data: dataPre,
    error,
    isLoading,
  } = useSWR(`/api/events?startat=${startAt}&q=${search}`, loadDataGet, {
    revalidateOnFocus: false,
  });

  const [hotloadInterval, setHotloadInterval] = useState(0 as any);
  let reloadFunc = async () => {
    try {
      let newData = await loadDataGet(
        `/api/events?hotload=1&q=${dataObj.search}&past_count=${dataObj.count}`
      );
      setData([...(newData?.events || []), ...dataObj.data]);
      setCount(newData.count);
    } catch (err) {
      return 0;
    }
  };
  useEffect(() => {
    clearInterval(hotloadInterval);
    const intevalObj = isHotloadEnabled ? setInterval(reloadFunc, 5000) : 0;
    setHotloadInterval(intevalObj);
    return () => clearInterval(intevalObj);
  }, [count, isHotloadEnabled]);

  useEffect(() => {
    if (dataPre) {
      setCount(dataPre.count);
      setData([...(isAppend ? data : []), ...dataPre.events]);
      setIsAppend(true);
      setIsReloadPossible(false);
      setIsNext(dataPre.isNext);
      setIsLoadingFake(false);
    }
  }, [dataPre]);
  dataObj.count = count;
  useEffect(() => {
    if (error) {
      setIsLoadingFake(false);
    }
  }, [error]);

  useEffect(() => {
    setCount(0);
    if (isHotloadEnabled) {
      clearInterval(hotloadInterval);
      setHotloadInterval(setInterval(reloadFunc, 5000));
    }
  }, [search, startAt]);

  return (
    <div className="w-full">
      <div className="instts-main-app-window rounded-2xl border border-solid border-gray-100 overflow-visible">
        <div className="bg-gray-100 rounded-t-2xl">
          <SearchBar
            onSearch={(currSearch: string) => {
              setIsAppend(false);
              setStartAt(0);
              setCount(0);
              setSearch(currSearch);
            }}
            onStartSearch={() => {
              setIsLoadingFake(true);
            }}
            isLive={isHotloadEnabled}
            setIsLive={setIsHotloadEnabled}
          />
          <div className="flex px-6 pointer-events-none-w-children">
            <div className="flex-1 font-bold py-3 text-gray-500">ACTOR</div>
            <div className="flex-1 font-bold py-3 text-gray-500">ACTION</div>
            <div className="flex-1 font-bold py-3 text-gray-500">DATE</div>
          </div>
        </div>
        {!isLoadingFake &&
          data?.map((item) => (
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

        <LoadMore
          onLoadMore={() => {
            setStartAt(data.length);
          }}
          isLoading={isLoading || isLoadingFake}
          isNext={isNext}
        />
      </div>
    </div>
  );
}
