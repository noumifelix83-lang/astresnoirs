import React from "react";
import { useReveal } from "../hooks/useReveal.js";
import CollectionCard from "./CollectionCard.jsx";
import { useLang } from "../i18n/LanguageContext.jsx";

export default function Collections() {
  const [headRef, headClass] = useReveal();
  const { t } = useLang();

  const COLLECTIONS = [
    {
      role: t("collections.sapiens.role"),
      name: "Sapiens",
      desc: t("collections.sapiens.desc"),
      glyph: (
        <>
          <circle cx="20" cy="20" r="8" />
          <path d="M20 2v6M20 32v6M2 20h6M32 20h6M7 7l4.2 4.2M28.8 28.8L33 33M33 7l-4.2 4.2M11.2 28.8L7 33" />
        </>
      ),
    },
    {
      role: t("collections.calebasse.role"),
      name: "Calebasse",
      desc: t("collections.calebasse.desc"),
      glyph: (
        <>
          <path d="M8 18c0-8 5-13 12-13s12 5 12 13-6 16-12 16S8 26 8 18Z" />
          <path d="M12 15c4 3 12 3 16 0" />
        </>
      ),
    },
    {
      role: t("collections.reveAfrique.role"),
      name: "Rêve d'Afrique",
      desc: t("collections.reveAfrique.desc"),
      glyph: (
        <>
          <path d="M4 30h32" />
          <circle cx="20" cy="16" r="7" />
          <path d="M4 30c4-6 9-9 16-9s12 3 16 9" />
        </>
      ),
    },
    {
      role: t("collections.jeunesse.role"),
      name: "Jeunesse",
      desc: t("collections.jeunesse.desc"),
      glyph: <path d="M20 4l3.6 8.2L32 14l-6 6 1.6 10.4L20 26l-7.6 4.4L14 20l-6-6 8.4-1.8L20 4Z" />,
    },
  ];

  return (
    <section className="collections section-pad" id="collections">
      <div className="wrap">
        <div ref={headRef} className={"section-head " + headClass}>
          <span className="eyebrow">{t("collections.eyebrow")}</span>
          <h2>{t("collections.title")}</h2>
          <p className="lede">{t("collections.lede")}</p>
        </div>
      </div>
      <div className="wrap">
        <div className="coll-grid">
          {COLLECTIONS.map((c) => (
            <CollectionCard collection={c} key={c.name} />
          ))}
        </div>
      </div>
    </section>
  );
}
