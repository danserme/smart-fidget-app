import React from "react";
import NewRequestItem from "./NewRequestItem";
import SharedAccessItem from "./SharedAccessItem";

export default function sharedAccess() {
    return(
        <div className="w-full p-5 border-2 h-full pb-10">
            <h1 className="text-2xl font-semibold text-center mb-7">Shared Access</h1>
            <NewRequestItem />
            <SharedAccessItem />
            <SharedAccessItem fullname={"Maria Perez"} role={"therapist"} last="today" />
        </div>
    );
}