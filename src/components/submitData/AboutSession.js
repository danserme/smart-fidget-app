import React from "react";
import Edit from "../ui/icons/Edit";
import Tag from "../ui/Tag";
import Heartbeat from "../ui/Heartbeat";

export default function AboutSession({ notes, session , onEdit, onNotes, tot = 3 }) {
    return(
        <div>
            <header className="flex justify-between">
                <div className="flex justify-between gap-5">
                    <h1 className="text-xl flex font-bold">{session.id + "/" + tot}</h1>
                    <h3 className="text-lg font-semibold">{session.startTime} – {session.endTime}</h3>
                    <Heartbeat text={"min"} val={session.min} />
                    <Heartbeat text={"max"} val={session.max} />
                    <Heartbeat text={"avg"} val={session.avg} />
                </div>
                <div className="flex gap-2 cursor-pointer" onClick={() => {
                        onEdit(true);
                        onNotes({});
                    }}>
                    <Edit />
                    <button className="underline text-indigo-600">Edit</button>
                </div>
            </header>
            <main className="my-5">
                <div className="flex flex-wrap gap-2 py-3">
                    <div className="flex flex-wrap gap-2 py-3">
                        {notes.mood && notes.mood.map((el, i) => {
                            return(
                                <Tag tag={el} selectable={false} key={i} />
                            )
                        })}
                    </div>
                    <div className="flex flex-wrap gap-2 py-3">
                        {notes.activity && notes.activity.map((el, i) => {
                            return(
                                <Tag tag={el} selectable={false} key={i} />
                            )
                        })}
                    </div>
                </div>
                <div>
                    {notes.comment}
                </div>
            </main>
        </div>
    );
}