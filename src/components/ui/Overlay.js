import React from "react";

export default function Overlay({ text }) {
    return(
        <div className="fixed top-0 left-0 z-10 h-screen w-screen bg-slate-400/60 backdrop-blur-sm flex">
            <div className="w-1/2 p-10 m-auto bg-white text-center border">
                <p>{text}</p>
            </div>
        </div>
    );
}