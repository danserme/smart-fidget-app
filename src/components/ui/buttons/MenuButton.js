import React from "react";
import { Link } from "react-router-dom";
import cn from "../../../utils/cn"
import Records from "../icons/Records";
import Shared from "../icons/Shared";

export default function MenuButton({ text, link, selected, icon }) {
    return(
        <Link to={link} >
            <div className={cn(
                selected ? "bg-indigo-600 text-white border border-indigo-600" : "bg-white text-indigo-600 border border-indigo-600",
                "w-full flex gap-2 mt-3 mx-auto py-2 font-semibold justify-center"
                )}>
                <div>
                    {icon === "records" && <Records />}
                    {icon === "shared" && <Shared />}
                </div>
                <div >{text}</div>
            </div>
        </Link>
    )
}