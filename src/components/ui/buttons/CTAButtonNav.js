import React from "react";
import { Link } from "react-router-dom";

export default function CTAButton({ text, link }) {
    return(
        <div className="font-normal">
            <Link to={link} >
                <button className="w-1/3 mx-auto p-2 bg-indigo-600 text-white font-semibold">{text}</button>
            </Link>
        </div>
    )
}