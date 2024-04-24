import React, { useEffect, useState } from "react";

export default function Comment({ notes, comment, onNotes, short }) {
    const [value, setValue] = useState('');

    useEffect(() => {
        const local = notes;
        local[short] = value;
        onNotes(local);
    }, [value, notes, short, onNotes]);

    return(
        <div>
            <textarea className="border p-1  w-full" placeholder={comment} onChange={(e) => setValue(e.target.value)}></textarea>
        </div>
    )
}