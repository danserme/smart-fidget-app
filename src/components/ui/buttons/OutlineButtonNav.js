import React from "react";
import { Link } from "react-router-dom";

export default function OutlineButtonNav({ text, link }) {
    return(
        <div className="font-normal">
            <Link to={link} >
                <button className="w-1/3 mt-3 mx-auto p-2 text-indigo-600 font-semibold border border-indigo-600">{text}</button>
            </Link>
        </div>
    )
}