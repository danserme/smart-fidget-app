import React, { useEffect, useState} from "react";
import AboutSession from "./AboutSession";
import Correlations from "./Correlations";
import { ethers } from "ethers";
import requestAccount from "../../utils/requestAccount";
import { smartFidgetAddress } from "../../utils/addr";
import SmartFidget from "../../contracts/SmartFidget.sol/SmartFidget.json";

const placeholder = {
    startTime: "23:54:02",
    endTime: "23:59:27",
    min: 67,
    max: 109,
    avg: 98,
    id: 1,
    main: "cw",
    duration: 15,
    p: 10,
    cw: 20,
    ccw: 0
}

export default function Session({ session = placeholder, tot, date, run, onSetOverlayText }) {
    const [edit, setEdit] = useState(false);
    const [notes, setNotes] = useState({});
    const [isSent, setIsSent] = useState(false);

    useEffect(() => {
        if(run && !isSent) {
            const send = async () => {
                if (typeof window.ethereum !== "undefined") {
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
                    // console.log("Connected account:", await signer.getAddress());
                    onSetOverlayText("Now you are uploading the data about each session on Blockchain.");
                    let tags = "";
                    if(notes.mood) {
                        notes.mood.forEach(el => {
                            if(!tags) {
                                tags = el;
                            } else {
                                tags= tags + ";" + el;
                            }
                        });
                    }
                    if(notes.activity) {
                        notes.activity.forEach(el => {
                            if(!tags) {
                                tags = el;
                            } else {
                                tags= tags + ";" + el;
                            }
                        });
                    }
                    const values = {
                        p: session.p,
                        cw: session.cw,
                        ccw: session.ccw
                    }
                    let main;
                    let largestValue = 0;
                    for (let key in values) {
                        if (values[key] > largestValue) {
                            largestValue = values[key];
                            main = key;
                        }
                    }
                    const comment = notes.comment ? notes.comment : "";
                    const duration = Math.floor(session.duration / 1000);
                    const contract = new ethers.Contract(smartFidgetAddress, SmartFidget.abi, signer);
                    const transaction = await contract.addSession(
                        session.avg,
                        session.min,
                        session.max,
                        session.id,
                        duration,
                        main,
                        date,
                        session.startTime,
                        session.endTime,
                        tags,
                        comment
                    );
                    onSetOverlayText("Waiting for the data to be written on blockchain.");
                    await transaction.wait();
                }
            }
            send();
            setIsSent(true);
        }
    }, [run, isSent, notes.mood, notes.activity, date, notes.comment, session.avg, session.duration, session.endTime, session.id, session.main, session.max, session.min, session.startTime, session.p, session.cw, session.ccw, onSetOverlayText]);

    return(
        <div>
            <div className="w-11/12 border mx-auto my-5 p-5">
                {!edit && <AboutSession onEdit={setEdit} session={session} key={session} notes={notes} onNotes={setNotes} tot={tot} />}
                {edit && <Correlations onEdit={setEdit} session={session} key={session} notes={notes} onNotes={setNotes} tot={tot} />}
            </div>
        </div>
    );
}