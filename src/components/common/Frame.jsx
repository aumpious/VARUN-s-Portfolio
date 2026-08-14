import React from "react";

/* ---------------- Frame: the signature element ----------------
   A hairline-bordered panel with small corner tick marks and an
   optional index label, echoing engineering-drawing annotation. */
export default function Frame({ index, label, children, className = "", as: Tag = "div", ...rest }) {
  return (
    <Tag className={`frame ${className}`} {...rest}>
      {(index || label) && (
        <div className="frame__tag">
          {index && <span className="frame__index">{index}</span>}
          {label && <span className="frame__label">{label}</span>}
        </div>
      )}
      {children}
    </Tag>
  );
}
