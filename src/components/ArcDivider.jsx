import React from "react";

export default function ArcDivider({ flip = false }) {
  const d = flip ? "M0 60 Q 590 0 1180 60" : "M0 4 Q 590 64 1180 4";
  return (
    <div className="arc-divider" aria-hidden="true">
      <svg viewBox="0 0 1180 64" preserveAspectRatio="none">
        <path d={d} fill="none" stroke="var(--line)" strokeWidth="1" />
      </svg>
    </div>
  );
}
