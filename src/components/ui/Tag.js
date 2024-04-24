import React, { useState } from "react";
import cn from "../../utils/cn";

export default function Tag({ tag, selectable = true, handleTagClick }) {
    const [selected, setSelected] = useState(false);

    return(
        <div className={cn(
            selected ? "bg-indigo-400" : "bg-gray-400",
            selectable ? "cursor-pointer" : "",
            "py-1 px-3 rounded-full text-white")}
            onClick={() => {
                if(selectable) {
                    setSelected(prev => !prev)
                    handleTagClick(tag)
                }
            }}>{tag}
        </div>
    )
}