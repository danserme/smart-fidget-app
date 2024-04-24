import React from "react";
import Battery from "../ui/icons/Battery";
import OnNewData from "./OnNewData";

export default function AboutDevice({ onNewDataAvailable }) {
    return(
        <div className="w-full mt-5 border-2 h-fit">
            <div className="p-5">
                <h1 className="text-lg font-semibold">My Device</h1>
                <p className="text-xs text-gray-500">last used on 24.04.2024</p>
            </div>
            <div className="p-5 pt-0 text-sm">
                <div className="flex gap-2 pb-2"><Battery /><p className="self-center">50%</p></div>
                {onNewDataAvailable && <OnNewData />}
            </div>
        </div>
    );
}