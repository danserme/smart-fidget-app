import React, { useState } from "react";
import DayPicker from "./DayPicker";
import dayjs from "dayjs";
import { ethers } from "ethers";
import SmartFidget from "../../contracts/SmartFidget.sol/SmartFidget.json";
import { smartFidgetAddress } from "../../utils/addr";
import Record from "./Record";

export default function Calendar() {
  const [selectDate, setDateValue] = useState(dayjs());
  const [sessions, setSessions] = useState([]);
  const [details, setDetails] = useState({});

  const handleDateChange = async (newDate, hasData, sessionCount, detailed) => {
    setDateValue(newDate);
    setDetails(detailed);
    if (hasData) {
      if (typeof window.ethereum !== "undefined") {
        let provider;
        if (window.ethereum == null) {
            console.log("MetaMask not installed; using read-only defaults");
            provider = ethers.getDefaultProvider();
        } else {
            provider = new ethers.BrowserProvider(window.ethereum);
        }
        const contract = new ethers.Contract(smartFidgetAddress, SmartFidget.abi, provider);
        try {
            const promises = [];
            let date = newDate.format('D.M.YY');
            for (let i = 0; i < sessionCount; i++) {
                const promise = contract.getSession(i, date).then(result => {
                  return {
                    avg: Number(result[0]),
                    min: Number(result[1]),
                    max: Number(result[2]),
                    id: Number(result[3]),
                    duration: Number(result[4]),
                    main: result[5],
                    startTime: result[6],
                    endTime: result[7],
                    tags: result[8],
                    comment: result[9]
                  };
                });
                promises.push(promise);
            }
            const data = await Promise.all(promises); // Wait for all promises to resolve
            setSessions(data);
        } catch (err) {
            console.log("Error: ", err);
            alert(
                "Switch your MetaMask network to Polygon zkEVM Testnet and refresh this page!"
            );
        }
      }
    } else {
      setSessions([]);
    }
  };

  return (
    <div className="w-full p-5 border">
      <h1 className="text-2xl font-semibold text-center mb-7">My Records</h1>
      <div className="flex w-full mx-auto divide-x-2 gap-10 item-center">
        <DayPicker onDateChange={handleDateChange} />
        <div className="w-full pl-10 pr-5 overflow-scroll">
          <Record sessions={sessions} date={selectDate} details={details} />
        </div>
      </div>
    </div>
  );
}