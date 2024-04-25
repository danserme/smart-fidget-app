import React, { useState } from "react";
import DayPicker from "./DayPicker";
import LoggedItem from "./LoggedItem";
import DayInfo from "../ui/DayInfo";
import dayjs from "dayjs";
import { ethers } from "ethers";
import SmartFidget from "../../contracts/SmartFidget.sol/SmartFidget.json";
import { smartFidgetAddress } from "../../utils/addr";

export default function Calendar() {
  const [selectDate, setDateValue] = useState(dayjs());
  const [sessions, setSessions] = useState([]);

  const handleDateChange = async (newDate, hasData, sessionCount) => {
    setDateValue(newDate);
    if (hasData) {
      console.log("has data check", newDate.format('D.M.YY'));
      console.log("session count", sessionCount);
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
            console.log(promises);
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
      <div className="flex w-full h-fit mx-auto divide-x-2 gap-10 h-screen item-center">
        <DayPicker onDateChange={handleDateChange} />
        <div className="pl-5 overflow-scroll">
          <DayInfo date={selectDate.toDate().toDateString()} />
          <h1 className="font-bold">{selectDate.toDate().toDateString()}</h1>
          {sessions && sessions.map((session, index) => {
            return(<LoggedItem session={session} key={index} />)
          })}
        </div>
      </div>
    </div>
  );
}