import React from "react";
import Bell from "../ui/icons/Bell";
import OutlineButtonNav from '../ui/buttons/OutlineButtonNav';


export default function AboutDevice() {
    return(
        <div>
            <div className="flex gap-2"><Bell /><p className="self-center">New data available</p></div>
            <OutlineButtonNav text={"Upload"} link={"/addData"} />
        </div>
    );
}