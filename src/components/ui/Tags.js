import React, { useEffect, useState } from "react";
import GhostButton from "./buttons/GhostButton";
import Tag from './Tag';

export default function Tags({ notes, short, onNotes, tags, addOther = true, selectable = true }) {
    const [arr, setArr] = useState([]);

    useEffect(() => {
        const local = notes
        local[short] = arr
        onNotes(local);
    }, [arr, notes, onNotes, short]);

    const handleTagClick = (value) => {
        setArr(currentArr => {
            if (currentArr.includes(value)) {
                return currentArr.filter(item => item !== value);
            } else {
                return [...currentArr, value];
            }
        });
    }

    return(
        <div className="flex flex-wrap items-center text-nowrap gap-3">
            {tags.map((tag, index) => {
                return(
                    <Tag tag={tag} selectable={selectable} onNotes={onNotes} short={short} key={index} handleTagClick={handleTagClick} />
                )
            })}
            <div className="text-indigo-700">
                {addOther && <GhostButton text={'Add other +'} />}
            </div>
        </div>
    )
}