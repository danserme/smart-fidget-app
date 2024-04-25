import React from "react";
import Heartbeat from "../ui/Heartbeat";

export default function Summary({ date, len, avg, min, max, duration}) {
    return(
        <div>
            <div className="w-full flex justify-between">
                <b className="font-semibold text-lg">Date {date}</b>
                <Heartbeat text={"avg"} val={avg} />
            </div>
            <div className="w-full flex justify-between">
                <p>You fidgeted {len} times</p>
                <Heartbeat text={"min"} val={min} />
            </div>
            <div className="w-full flex justify-between">
                <p>Total duration of {duration} min</p>
                <Heartbeat text={"max"} val={max} />
            </div>
        </div>
    );
}