import React from "react";
import { Link } from "react-router-dom";
import ArrowLeft from "../ui/icons/ArrowLeft";
import Heartbeat from "../ui/Heartbeat";

export default function Summary({ date, len, avg, min, max, duration}) {
    return(
        <header className="mx-auto px-2 pt-5 border-b pb-10">
            <div>
                <Link to="/myrecords">
                    <ArrowLeft />
                </Link>
                <h1 className="text-2xl text-center font-bold mb-3">New Record</h1>
            </div>
            <div className="w-1/2 mx-auto">
            <div className="w-full flex justify-between">
                    <p>Date {date}</p>
                    <Heartbeat text={"avg"} val={avg} />
                </div>
                <div className="w-full flex justify-between">
                    <p>You fidgeted {len} times</p>
                    <Heartbeat text={"min"} val={min} />
                </div>
                <div className="w-full flex justify-between">
                    <p>Total duration of {duration} sec</p>
                    <Heartbeat text={"max"} val={max} />
                </div>
                {/* <div className="w-full flex justify-between">
                    <p>You mostly used rotations</p>
                    <div className="flex gap-2"><Heart />avg BPM</div>
                </div> */}
            </div>
        </header>
);
}