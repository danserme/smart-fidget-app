import React, { useState } from "react";
import SharedAccessItem from "./SharedAccessItem";

export default function NewRequestItem({ fullname = "Mario Ricco", role = "doctor", price="0.03 ETH", newRequest, onAction }) {
    const [accepted, setAcceppted] = useState(false);

    if(newRequest && !accepted) {
        return (
            <div className="flex flex-wrap content-end justify-between my-5 bg-rose-300 border-2 border-rose-600 text-rose-600 py-3 px-5">
                <div>
                    <h3 className="text-xl font-semibold">New Request</h3>
                    <div className="mt-3 flex gap-5">
                        <h5 className="text-lg font-semibold">{fullname}</h5>
                        <p className="self-center italic">{role}</p>
                    </div>
                    <p>their proposal for the access to your data is {price}</p>
                </div>
                <div className="flex gap-10 h-fit flex-wrap self-end">
                    <button className="bg-white border border-rose-600 px-10 py-1" onClick={() => {
                        onAction(false);
                    }}>Decline</button>
                    <button className="bg-rose-600 text-white py-1 px-10" onClick={() => {
                        onAction(false);
                        setAcceppted(true);
                    }}>Accept</button>
                </div>
            </div>
        );
    } else if(!newRequest && accepted) {
        return(
            <SharedAccessItem fullname={fullname} role={role} last="today" price={price} />
        );
    }
}