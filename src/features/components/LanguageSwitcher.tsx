import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@mui/material";
import { useQueryClient } from "react-query";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  // let queryClient = useQueryClient();

  const [isArabic, setIsArabic] = useState(false);

  useEffect(() => {
    setIsArabic(i18n.language.startsWith("ar"));
  }, [i18n.language]);

  const handleChange = (event: any) => {
    const newLanguage = isArabic ? "en" : "ar";
    i18n.changeLanguage(newLanguage).then(() => {
      // queryClient.invalidateQueries();
    });
  };

  return (
    <Button
      variant="outlined"
      style={{
        color: "black",
        borderColor: "black",
        margin: "1em",
      }}
      onClick={handleChange}
    >
      {!isArabic ? "عربي" : "English"}
    </Button>
  );
};

export default LanguageSwitcher;
