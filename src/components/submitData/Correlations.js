import React from "react";
import Question from "./Question";
import data from '../../utils/ui_data.json';
import CTAButton from "../ui/buttons/CTAButton";
import Heartbeat from "../ui/Heartbeat";

export default function Correlations({ notes, session, tot = 3, onEdit, onNotes }) {
    const questions = data.questions;

    return(
        <div>
            <main>
                <div className="flex gap-5 content-center">
                <h1 className="text-xl flex font-bold">{session.id + "/" + tot}</h1>
                    <h3 className="text-lg font-semibold">{session.startTime} – {session.endTime}</h3>
                    <Heartbeat text={"min"} val={session.min} />
                    <Heartbeat text={"max"} val={session.max} />
                    <Heartbeat text={"avg"} val={session.avg} />
                </div>
                <div>
                    {questions.map((question)=>{
                        return(<Question question={question} key={question.id} onNotes={onNotes} notes={notes} />)
                    })}
                </div>
                <div className="text-center" onClick={() => onEdit(false)} >
                    <CTAButton text={"Save"} />
                </div>
            </main>
        </div>
    )
}