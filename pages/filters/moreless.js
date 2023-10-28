import React, { useState } from "react";

export default function MoreLess({ params }) {
  const [expanded, setExpanded] = useState(false);
  const value = params?.value;

  const content =
    expanded || typeof value !== "string" ? value : value.slice(0, 120);

  const showMoreLessLink = value?.length > 120;

  return (
    <div className="bkoodak text-base font-medium">
      {content}
      <br />
      {/* &nbsp;&nbsp; */}
      {showMoreLessLink && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-blue-800 hover:text-red-500 text-lg"
        >
          {expanded ? "کمتر" : "بیشتر"}
        </button>
      )}
    </div>
  );
}
