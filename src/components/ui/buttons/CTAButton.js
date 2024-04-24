import React from "react";

export default function CTAButton({ text }) {
    return(
        <div className="font-normal">
            <button className="w-1/3 mx-auto p-2 bg-indigo-600 text-white font-semibold">{text}</button>
        </div>
    )
}