import React from "react";
import GhostButton from "./buttons/GhostButton";

export default function Footer() {
    return(
        <div className="mx-auto my-10 text-center text-indigo-600 bottom-0">
            <GhostButton text={'About App'} />
        </div>
    );
}