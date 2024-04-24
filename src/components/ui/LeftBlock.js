import React from "react";
import AboutDevice from "../device/AboutDevice";
import MenuButton from "./buttons/MenuButton";

export default function LeftBlock({ onNewDataAvailable, address }) {
    return(
        <div className="w-1/3">
            <div className="w-full">
                <MenuButton text={"My Records"} link="/myrecords" selected={address === "/myrecords"} icon={"records"} />
                <MenuButton text={"Shared Access"} link="/sharedAccess" selected={address === "/sharedAccess"} icon={"shared"} />
            </div>
            <AboutDevice onNewDataAvailable={onNewDataAvailable} />
        </div>
    );
}