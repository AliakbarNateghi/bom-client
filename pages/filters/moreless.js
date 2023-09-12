import React, { useState } from "react";

export default function MoreLess({ params, field }) {
  const [expanded, setExpanded] = useState(false);
  const value = params?.value;

  const content =
    expanded || typeof value !== "string" ? value : value.slice(0, 200);

  const showMoreLessLink = value?.length > 200;

  return (
    <div className="bkoodak text-base font-medium">
      {content}
      &nbsp;
      {showMoreLessLink && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-blue-500 hover:text-red-500 text-lg"
        >
          {expanded ? "کمتر" : "بیشتر"}
        </button>
      )}
    </div>
  );
}
