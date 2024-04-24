import React from "react";
import { Link } from "react-router-dom";

export default function GhostButton({ text, link = "/" }) {
    return(
        <div className="font-normal">
            <Link to={link}>
                <button className="underline">{text}</button>
            </Link>
        </div>
    )
}