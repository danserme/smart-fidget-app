import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import LoggedItem from "./LoggedItem";
import DayInfo from "../ui/DayInfo";

export default function Record({ sessions, date, details }) {
    const [selectDate, setDateValue] = useState(dayjs());

    useEffect(() => {
        setDateValue(date);
    }, [selectDate, date]);

    if (sessions.length > 0) {
        return(
            <div>
                <DayInfo date={details.date} avg={details.avg} min={details.min} max={details.max} duration={details.totDuration} main={details.main} />
                {sessions && sessions.map((session, index) => {
                    return(<LoggedItem session={session} key={index} />)
                })}
            </div>
        );
    } else {
        return(
            <div>
                <h1 className="font-semibold text-lg">Date {selectDate.toDate().toDateString()}</h1>
                <p>Unfortunately, there are no sessions recorded for that day..</p>
            </div>
        );
    }
}