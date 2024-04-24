import React from "react";
import Image from "../ui/Image";
import GhostButton from "../ui/buttons/GhostButton";
import { Navigate } from "react-router-dom";

export default function DeviceConnect({ onDeviceConnected, onConnectSerial }) {
    if (onDeviceConnected === true) {
        return <Navigate to="/myrecords" replace />;
    }
    return(
        <div className="justify-center text-center">
            <div className="w-1/3 bg-gray-200 p-20 my-20 mx-auto rounded-full">
                <Image />
            </div>
            <h3 className="text-lg font-semibold">Connecting to Smart Fidget...</h3>
            <p className="p-1 italic">make sure your device is connected to your laptop via USB.</p>
            <button className="w-1/3 mt-10 mx-auto p-2 bg-indigo-600 text-white font-semibold" onClick={() => {
                onConnectSerial();
              }}>Connect Device</button>
            <div className="mt-5 text-indigo-700">
                <GhostButton text={"Continue without Device"} link={"/myrecords"} onClick={() => onDeviceConnected(false)} />
            </div>
        </div>
    );
}