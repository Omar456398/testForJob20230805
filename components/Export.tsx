"use client";

import React, { useState } from "react";
import { LogDataExport } from "./types/Export";
import { LogData } from "./types/general";
import { ExportToCsv } from "export-to-csv";
import ExportSVG from "./svg/Export.svg";

export default function Export(props: { url: string }) {
  const [isExporting, setIsExporting] = useState(false);
  const exportDataGet = async (arg: string) => {
    setIsExporting(true);
    try {
      const data = await (await fetch(arg)).json();
      const dataExport = [] as LogDataExport[];
      data?.events?.forEach((item: LogData) => {
        const itemExport: LogDataExport = {
          "Actor ID": item.actor_id,
          "Actor Name": item.actor_name,
          "Actor Email": item.actor_email,
          "Action ID": item.action.id,
          "Action Object": item.action.object,
          "Action Name": item.action.name,
          Date: new Date(item.occurred_at).toISOString(),
        };
        if (item.metadata) {
          itemExport.Description = item.metadata.description;
          itemExport.Redirect = item.metadata.redirect;
          itemExport["Request ID"] = item.metadata.x_request_id;
        }
        if (itemExport["Target ID"]) {
          itemExport["Target ID"] = item.target_id;
        }
        if (itemExport["Target Name"]) {
          itemExport["Target Name"] = item.target_name;
        }
        dataExport.push(itemExport);
      });

      const exportOptions = {
        fieldSeparator: ",",
        quoteStrings: '"',
        decimalSeparator: ".",
        showLabels: true,
        showTitle: true,
        title: "My Awesome CSV",
        useTextFile: false,
        useBom: true,
        useKeysAsHeaders: true,
      };
      const csvExporter = new ExportToCsv(exportOptions);

      csvExporter.generateCsv(dataExport);
      setIsExporting(false);
      return true;
    } catch (_) {
      alert("Export Failed!");
      setIsExporting(false);
      return false;
    }
  };
  return (
    <button
      onClick={() => {
        exportDataGet(props.url);
      }}
      disabled={isExporting}
      className={`border-solid border-0 border-l px-3 py-2 bg-transparent h-full flex${
        isExporting ? " text-gray-600" : ""
      }`}
    >
      <div className={`mr-3 text-center text-white font-bold mt-1 text-xs`}>
        <ExportSVG />
      </div>
      Export
    </button>
  );
}
