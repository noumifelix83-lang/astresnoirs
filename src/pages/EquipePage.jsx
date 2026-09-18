import React, { useEffect } from "react";
import { equipe } from "../data/equipe.js";
import { useReveal } from "../hooks/useReveal.js";

function MemberCard({ member }) {
  const [ref, cls] = useReveal();
  return (
    <div ref={ref} className={"team-card " + cls}>
      <div className="team-photo" style={{ backgroundImage: `url(${member.photo})` }} />
      <div className="team-info">
        <h3>{member.name}</h3>
        {member.roles.map((r, i) => (
          <p className="team-role" key={i}>
            {r}
          </p>
        ))}
      </div>
    </div>
  );
}

export default function EquipePage() {
  const [headRef, headClass] = useReveal();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="actualites-page section-pad">
      <div className="wrap">
        <div ref={headRef} className={"section-head " + headClass}>
          <span className="eyebrow">L'équipe</span>
          <h1>Les visages des Éditions Astres Noirs.</h1>
          <p className="lede">
            Une maison, c'est avant tout une équipe. Cette page s'enrichira au fil des présentations de chaque
            membre.
          </p>
        </div>
        <div className="team-grid">
          {equipe.map((m) => (
            <MemberCard member={m} key={m.id} />
          ))}
        </div>
      </div>
    </main>
  );
}
