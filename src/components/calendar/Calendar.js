import React, { useState } from "react";
import DayPicker from "./DayPicker";
import LoggedItem from "./LoggedItem";

export default function Calendar() {
    const [selectDate, setDateValue] = useState('');

  return (
    <div className="w-full p-5 border">
      <h1 className="text-2xl font-semibold text-center mb-7">My Records</h1>
      <div className="flex w-full h-fit mx-auto divide-x-2 gap-10 h-screen item-center">
        <DayPicker onDateChange={setDateValue} />
        <div className="pl-5 overflow-scroll">
          {/* make a component of history */}
          <h1 className="font-bold">{selectDate}</h1>
          {/* make a component for logged item */}
          <LoggedItem />
          <LoggedItem />
        </div>
      </div>
    </div>
  );
}