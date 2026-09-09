import React from "react";
import { useReveal } from "../hooks/useReveal.js";

export default function CollectionCard({ collection }) {
  const [ref, cls] = useReveal();
  return (
    <article className={"coll-card " + cls} ref={ref}>
      <svg className="coll-glyph" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6">
        {collection.glyph}
      </svg>
      <div>
        <span className="role">{collection.role}</span>
        <h3>{collection.name}</h3>
      </div>
      <p>{collection.desc}</p>
    </article>
  );
}
