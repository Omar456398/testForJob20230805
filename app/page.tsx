"use client";

import EventLogsRow from "@/components/EventLogsRow";
import LoadMore from "@/components/LoadMore";
import { useState } from "react";
import SearchBar from "@/components/SearchBar";

let data = [
  {
    id: "evt_15B56WILKW5K1",
    object: "event",
    actor_id: "user_3VG74289PUA2",
    actor_name: "Ali Salah",
    actor_email: "ali@instatus.com",
    group: "instatus.com",
    action: {
      id: "evt_action_PGTD81NCAOQ2",
      object: "event_action",
      name: "user.login_succeeded",
    },
    target_id: "user_DOKVD1U3L030",
    target_name: "ali@instatus.com",
    location: "105.40.62.95",
    occurred_at: new Date("2022-01-05T14:31:13.607Z"),
    metadata: {
      redirect: "/setup",
      description: "User login succeeded.",
      x_request_id: "req_W1Y13QOHMI5H",
    },
  },
  {
    id: "evt_15B56WILKW5K2",
    object: "event",
    actor_id: "user_3VG74289PUA2",
    actor_name: "Ali Salah",
    actor_email: "ali@instatus.com",
    group: "instatus.com",
    action: {
      id: "evt_action_PGTD81NCAOQ2",
      object: "event_action",
      name: "user.login_succeeded",
    },
    target_id: "user_DOKVD1U3L030",
    target_name: "ali@instatus.com",
    location: "105.40.62.95",
    occurred_at: new Date("2022-01-05T14:31:13.607Z"),
    metadata: {
      redirect: "/setup",
      description: "User login succeeded.",
      x_request_id: "req_W1Y13QOHMI5H",
    },
  },
  {
    id: "evt_15B56WILKW5K3",
    object: "event",
    actor_id: "user_3VG74289PUA2",
    actor_name: "Ali Salah",
    actor_email: "ali@instatus.com",
    group: "instatus.com",
    action: {
      id: "evt_action_PGTD81NCAOQ2",
      object: "event_action",
      name: "user.login_succeeded",
    },
    target_id: "user_DOKVD1U3L030",
    target_name: "ali@instatus.com",
    location: "105.40.62.95",
    occurred_at: new Date("2022-01-05T14:31:13.607Z"),
    metadata: {
      redirect: "/setup",
      description: "User login succeeded.",
      x_request_id: "req_W1Y13QOHMI5H",
    },
  },
];
export default function Home() {
  const [currFocus, setCurrFocus] = useState("-1");
  return (
    <div className="w-full">
      <div className="instts-main-app-window rounded-2xl border border-solid border-gray-100 overflow-visible">
        <div className="bg-gray-100 rounded-t-2xl">
          <SearchBar onSearch={() => {}} />
          <div className="flex px-6 pointer-events-none-w-children">
            <div className="flex-1 font-bold py-3 text-gray-500">ACTOR</div>
            <div className="flex-1 font-bold py-3 text-gray-500">ACTION</div>
            <div className="flex-1 font-bold py-3 text-gray-500">DATE</div>
          </div>
        </div>
        {data.map((item) => (
          <EventLogsRow
            key={item.id}
            onClick={setCurrFocus}
            data={item}
            currFocus={currFocus}
          />
        ))}
        <LoadMore onLoadMore={() => {}} />
      </div>
    </div>
  );
}
