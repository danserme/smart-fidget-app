import React, { useState } from "react";
import data from "../../utils/ui_data.json";
import GhostButton from "./buttons/GhostButton";
import Close from "./icons/Close";

export default function Popup({ reason }) {
    const popup = data.popups[`${reason}`];
    const [isClose, setClose] = useState(false);
    
    if(isClose) {
        return null;
    }
    return(
        <div className="w-full p-2 flex justify-between bg-amber-200 border-2 border-amber-400 text-amber-700 font-semibold">
            <h4>{popup.text}</h4>
            <div className="flex gap-4">
                <div className="flex gap-4">{popup.buttons.map((el,index)=>{
                    return(<GhostButton text={el.text} link={el.link} key={index} />)
                })}</div>
                <div>
                    <Close onSetClose={setClose} />
                </div>
            </div>
        </div>
    );
}