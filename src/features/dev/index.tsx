"use client";

import { useTranslation } from "react-i18next";
import DevSC from "./sc";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { useEffect } from "react";

const Dev = () => {
  const { t, i18n } = useTranslation();

  return (
    <DevSC.Container>
      <div>
        <LanguageSwitcher />
      </div>
      <div>
        <p>{t("Greet")}</p>
      </div>
    </DevSC.Container>
  );
};

export default Dev;
