import React, { useEffect, useState} from "react";
import AboutSession from "./AboutSession";
import Correlations from "./Correlations";
import { ethers } from "ethers";
import requestAccount from "../../utils/requestAccount";
import { smartFidgetAddress } from "../../utils/addr";
import SmartFidget from "../../contracts/SmartFidget.sol/SmartFidget.json";

export default function Session({ session, tot, date }) {
    const [edit, setEdit] = useState(false);
    const [notes, setNotes] = useState({});

    // useEffect(() => {
    //     // console.log(sendSessions)
    //     if(sendSessions) {
    //         console.log("SEND SESSIONS")
    //         const send = async () => {
    //             await sendSession();
    //         }
    //         send();
    //     }
    // });
    
    async function sendSession() {
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
            console.log("Connected account:", await signer.getAddress());
            const tags = [];
            if(notes.mood) {
                notes.mood.forEach(el => {
                    tags.push(el);
                });
            }
            if(notes.activity) {
                notes.activity.forEach(el => {
                    tags.push(el);
                });
            }
            const contract = new ethers.Contract(smartFidgetAddress, SmartFidget.abi, signer);
            const transaction = await contract.addSession(
                session.main,
                session.avg,
                session.min,
                session.max,
                session.id,
                session.duration,
                date,
                session.startTime,
                session.endTime,
                tags,
                notes.comment
            );
            await transaction.wait();
        }
    }
    return(
        <div>
            <div className="w-11/12 border mx-auto my-5 p-5">
                {!edit && <AboutSession onEdit={setEdit} session={session} key={session} notes={notes} onNotes={setNotes} tot={tot} />}
                {edit && <Correlations onEdit={setEdit} session={session} key={session} notes={notes} onNotes={setNotes} />}
            </div>
        </div>
    );
}