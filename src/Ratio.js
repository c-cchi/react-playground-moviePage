import React from "react"

const Ratio = ({ ratio }) => {
    return (
        <div>
            <div class="h-3 w-full bg-[#e0e0de] rounded-lg mt-5">
                <div
                    class="h-3 bg-[#ebaf4c] rounded-lg mt-5"
                    style={{ width: `${ratio}%` }}
                ></div>
            </div>
        </div>
    )
}

export default Ratio
