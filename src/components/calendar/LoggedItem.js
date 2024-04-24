import React from "react";
import Tag from "../ui/Tag";
import Heartbeat from "../ui/Heartbeat";
import GhostButton from "../ui/buttons/GhostButtonSmall";

export default function LoggedItem({ min = 56, max = 98, avg = 77, }) {
    return(
        <div className="py-3 px-5 border-2 my-3">
            <div className="flex font-bold justify-between">
                <h1>11.00 - 11.20</h1>
                <Heartbeat text={"avg"} val={avg} />
            </div>
            <div className="flex w-full justify-between my-3">
                <div className="flex flex-wrap items-center text-nowrap gap-3 text-xs">
                    <Tag tag={"Focused"} selectable={false} />
                    <Tag tag={"Anxious"} selectable={false} />
                    <Tag tag={"Metro"} selectable={false} />
                    <Tag tag={"Many people"} selectable={false} />
                </div>
                {/* <div className="text-sm">
                    <Heartbeat text={"max"} val={max} />
                    <Heartbeat text={"min"} val={min} />
                </div> */}
            </div>
            <p>I was in metro and there were way too many...</p>
            <div className="w-full text-right">
                <GhostButton text={"more"} />
            </div>
        </div>
    );
}