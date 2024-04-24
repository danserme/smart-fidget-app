import React from "react";

export default function GhostButton({ text }) {
    return(
        <div className="font-normal text-s">
            <button className="underline text-indigo-600">{text}</button>
        </div>
    )
}