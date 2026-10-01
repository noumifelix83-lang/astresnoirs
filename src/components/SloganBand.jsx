import React from "react";
import { useLang } from "../i18n/LanguageContext.jsx";

export default function SloganBand() {
  const { t } = useLang();
  return (
    <div className="slogan-band">
      <p>
        {t("sloganBand.word")} <em>{t("sloganBand.em")}</em>
      </p>
    </div>
  );
}
