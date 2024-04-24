import React from "react";
import data from "../../utils/ui_data.json";
import GhostButton from "./buttons/GhostButton";
import Close from "./icons/Close";

export default function Popup({ reason }) {
    const popup = data.popups[`${reason}`];

    return(
        <div className="w-full p-2 flex justify-between bg-amber-200 border-2 border-amber-400 text-amber-700 font-semibold">
            <h4>{popup.text}</h4>
            <div className="flex gap-4">
                <div>{popup.buttons.map((el,index)=>{
                    return(<GhostButton text={el.text} link={el.link} key={index} />)
                })}</div>
                <Close />
            </div>
        </div>
    )
}