import React, { useContext, useEffect, useState } from "react";
import { generateDate, months } from "../../utils/calendar";
import dayjs from "dayjs";
import cn from "../../utils/cn";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { DataContext } from "../../DataContext";

export default function DayPicker({ onDateChange }) {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);

  //to see today's data entry even after submisson of data to blockchain
  const [run, setRun] = useState(true);
  const dataSessions = useContext(DataContext);

  useEffect(() => {
    const dates = dataSessions ? generateDate(today.month(), today.year(), dataSessions) : [];
    let selectedDay;
    dates.forEach(day => {
            if (day.date.toDate().toDateString() === today.toDate().toDateString() && day.date.toDate().toDateString() === selectDate.toDate().toDateString()) {
                selectedDay = day;
            }
        }
    );
    if (run && selectedDay.hasData) {
        onDateChange(selectedDay.date, selectedDay.hasData, selectedDay.sessionCount, selectedDay.detailed);
        setRun(false);
    }
  }, [selectDate, onDateChange, today, run, dataSessions]);

  return (
    <div className="w-1/2 h-96">
        <div className="flex justify-between">
            <h1 className="font-semibold">{months[today.month()]}, {today.year()}</h1>
            <div className="flex items-center gap-5">
            <GrFormPrevious className="w-5 h-5 cursor-pointer" onClick={() => {
                setToday(today.month(today.month() - 1))
            }} />
            <h1 className="cursor-pointer" onClick={() => {
                setToday(currentDate);
                setSelectDate(currentDate);
            }} >Today</h1>
            <GrFormNext className="w-5 h-5 cursor-pointer" onClick={() => {
                setToday(today.month(today.month() + 1))
            }} />
            </div>
        </div>
        <div className="w-full grid grid-cols-7 text-gray-600">
            {days.map((day, index) => {
            return <h1 key={index} className="h-14 grid place-content-center text-sm">{day}</h1>
            })}
        </div>
        <div className="w-full grid grid-cols-7">
            {dataSessions && generateDate(today.month(), today.year(), dataSessions).map(({ date, currentMonth, today, hasData, sessionCount, detailed }, index) => {
            return (
                <div  key={index} className="h-14 border-t grid place-content-center text-sm ">
                    <div className={cn(
                        hasData ? "bg-indigo-100" : "",
                        "rounded-full hover:bg-indigo-500 hover:text-white transition-all cursor-pointer"
                    )}>
                    <h1 className={cn(
                        currentMonth ? "" : "text-gray-400",
                        today ? "border border-indigo-700" : "",
                        hasData && selectDate.toDate().toDateString() === date.toDate().toDateString() ? "bg-indigo-600 border border-indigo-700 text-white font-semibold" : "",
                        selectDate.toDate().toDateString() === date.toDate().toDateString() ? "bg-indigo-600 border border-indigo-700 text-white font-semibold" : "",
                        "h-10 w-10 grid place-content-center rounded-full hover:bg-indigo-500 hover:text-white transition-all cursor-pointer"
                    )}
                    onClick={() => {
                        setSelectDate(date);
                        setRun(false);
                        onDateChange(date, hasData, sessionCount, detailed);
                    }}
                    >{date.date()}</h1>
                    </div>
                </div>
            );
            })}
        </div>
    </div>
  );
}