import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CTAButton from "../ui/buttons/CTAButton";
import Session from "./Session";
import Summary from "./Summary";
import SmartFidget from "../../contracts/SmartFidget.sol/SmartFidget.json";
import { ethers } from "ethers";
import requestAccount from "../../utils/requestAccount";
import { smartFidgetAddress } from "../../utils/addr";
import Overlay from "../ui/Overlay";
import delay from "../../utils/delay";

export default function NewData({ passed, onDisconnectDevice, onSetNewDataAvailable }) {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isSent, setSent] = useState(false);
    const [isMainSent, setMainSent] = useState(false);
    const [run, setRun] = useState(false);
    const [overlayText, setOverlayText] = useState("!");

    useEffect(() => {
        if(!run && isMainSent) {
            setRun(true);
        }
    }, [isMainSent, run]);

    let avgHB;
    let minHB;
    let maxHB;
    let main;
    let values = {
        p: 0,
        ccw : 0,
        cw: 0
    };
    let duration = 1;
    let sessionCount;
    let date;

    const sessions = ["1", "2", "3"];
    let list;
    let combinedData;
    if (passed && !isSent) {
        list = passed.slice(3);
        combinedData = JSON.parse(list).data;
        console.log(combinedData);
        sessionCount = combinedData.length;
        date = combinedData[0].date;
        getValues(combinedData);
    } else {
        duration = 16;
        sessionCount = 3;
        avgHB = 88;
        minHB = 67;
        maxHB = 109;
        main = "p";
        sessionCount = 3;
        duration = 16;
        date = "8.4.24";
    }

    function getValues(arr) {
        minHB = arr[0].min;
        maxHB = arr[0].max;
        combinedData.forEach(item => {
            values.ccw += item.ccw;
            values.cw += item.cw;
            values.p += item.p;
            duration+=item.duration;
            if(item.min < minHB) {
                minHB = item.min;
            }
            if (item.max > maxHB) {
                maxHB = item.max;
            }
        });
        avgHB = Math.floor((minHB + maxHB) / 2);
        duration /= 3600; //multiply 3600 by 60 later
        duration = Math.floor(duration);

        let largestValue = 0;
        for (let key in values) {
            if (values[key] > largestValue) {
                largestValue = values[key];
                main = key;
            }
        }
    }

    async function handleUploadClick() {
        if (typeof window.ethereum !== "undefined") {
            setIsLoading(true);
            setOverlayText("Follow the instructions on MetaMask!");
            await delay(1000);
            await requestAccount();
            let signer = null;
            let provider;
            if (window.ethereum == null) {
                console.log("MetaMask not installed; using read-only defaults");
                provider = ethers.getDefaultProvider();
            } else {
                provider = new ethers.BrowserProvider(window.ethereum);
                signer = await provider.getSigner();
            }
            console.log("Connected account:", await signer.getAddress());
            const contract = new ethers.Contract(smartFidgetAddress, SmartFidget.abi, signer);
            setOverlayText("Now you are uploading the general data about your day.");
            const transactionRecord = await contract.addRecord(avgHB, minHB, maxHB, sessionCount, duration, main, date);
            setMainSent(true);
            await transactionRecord.wait();
            setSent(true);
        }
        onDisconnectDevice();
        onSetNewDataAvailable(false);
        setOverlayText("Your data was successfully recorded!");
        await delay(2000);
        navigate('/myrecords');
    };
    
    
    return(
        <div className="w-full border">
            <div>{isLoading && <Overlay text={overlayText} />}</div>
            <Summary len={sessionCount}
                date={date}
                avg={avgHB}
                max={maxHB}
                min={minHB}
                duration={duration} />
            <div>
                {
                    passed && !isSent && combinedData.map((session, index) => {
                        return(
                            <Session date={date} session={session} tot={sessionCount} key={index} run={run} onSetOverlayText={setOverlayText} />
                        )
                    })
                }
            </div>
            <div>
                {
                    !passed && !isSent && sessions.map((session, index) => {
                        return(
                            <Session date={date} key={index} tot={sessions.length} run={run} onSetOverlayText={setOverlayText} />
                        )
                    })
                }
            </div>
            <div className="border-t text-center p-5" onClick={() => handleUploadClick()}>
                <CTAButton text="Upload" />
            </div>
        </div>
    )
}