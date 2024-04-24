import React from "react";
import Heart from "./icons/Heart";

export default function Heartbeat({ text, val }) {
    return(
        <div className="flex gap-1">
            <Heart />
            {val && <div>{val}</div>}
            <p>{text} BPM</p>
        </div>
    );
}