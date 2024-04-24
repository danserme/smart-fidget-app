import React from "react";
import ImagePlaceholder from "./icons/ImagePlaceholder";
import Popup from "./Popup";

export default function Header({ deviceConnected, newDataAvailable, newRequest }) {
    return(
        <header className="flex justify-start content-center px-10 gap-10 mt-5 mb-10">
            <div className="w-1/3 bg-gray-200 my-auto py-4 rounded-full">
                <ImagePlaceholder />
            </div>
            <div className="w-full self-center">
                {!deviceConnected && <Popup reason={"preview"} />}
                {newDataAvailable && <Popup reason={"newData"} />}
                {newRequest && <Popup reason={"newReq"} />}
            </div>
        </header>
    );
}