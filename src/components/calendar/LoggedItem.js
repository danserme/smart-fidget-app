import React from "react";
import Heartbeat from "../ui/Heartbeat";
import GhostButton from "../ui/buttons/GhostButtonSmall";
import Tag from "../ui/Tag";

const placeholder = {
    startTime: "23:54:02",
    endTime: "23:59:27",
    min: 67,
    max: 109,
    avg: 98,
    id: 1,
    main: "cw",
    duration: 15,
    comment: "I was in metro and there were way too many...",
    tags: "Focused;Anxious;Metro;Many people"
}

export default function LoggedItem({ session = placeholder }) {
    const tags = session.tags ? session.tags.split(";") : "";

    return(
        <div className="py-3 px-5 border-2 my-3">
            <div className="flex justify-between">
                <div className="flex gap-5">
                    <h1 className="font-bold">{session.startTime} - {session.endTime}</h1>
                    <p>({session.duration} min)</p>
                </div>
                <Heartbeat text={"avg"} val={session.avg} />
            </div>
            <div className="flex w-full justify-between my-3">
                <div className="flex flex-wrap items-center text-nowrap gap-3 text-xs">
                    {tags && tags.map((tag, index) => {
                        return(
                            <Tag selectable={false} tag={tag} key={index} />
                        );
                    })}
                </div>
            </div>
            <p>{session.comment}</p>
            <div className="w-full text-right">
                <GhostButton text={"more"} />
            </div>
        </div>
    );
}