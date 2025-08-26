import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Earth from "@/images/earth-americas (1) 1.png";
import Angle from "@/images/angle-small-right (1) 2.png";
import { v4 as uuidv4 } from "uuid";
import { useTranslation } from "react-i18next";

const langArr = [
  { id: uuidv4(), lang: "uz", label: "O'zbek" },
  { id: uuidv4(), lang: "ru", label: "Русский" },
  { id: uuidv4(), lang: "en", label: "English" },
];

function LanguagesBtn() {
  const { i18n } = useTranslation();
  const [selectedLang, setSelectedLang] = useState<string>("uz");
  const [open, setOpen] = useState(false);

  // При первом рендере загружаем язык из localStorage или берем из i18n
  useEffect(() => {
    const savedLang = localStorage.getItem("app-lang");
    if (savedLang && langArr.some(l => l.lang === savedLang)) {
      setSelectedLang(savedLang);
      i18n.changeLanguage(savedLang);
    } else {
      setSelectedLang(i18n.language || "uz");
    }
  }, [i18n]);

  const handleLangChange = (lang: string) => {
    setSelectedLang(lang);
    i18n.changeLanguage(lang);
    localStorage.setItem("app-lang", lang);
  };

  return (
    <DropdownMenu onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="cursor-pointer bg-white text-[#D93D40] border border-[#D93D40] md:text-black md:border-none shadow-none rounded-xl focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          <img src={Earth} alt="globe" className="w-5 !hidden md:!block" />
          <span className="capitalize">{selectedLang}</span>
          <img
            src={Angle}
            alt="chevron"
            className={`w-6 transition-transform duration-300 ${open ? "-rotate-90" : "rotate-0"}`}
          />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-white rounded-lg border-none">
        <DropdownMenuSeparator />
        {langArr.map(i => (
          <DropdownMenuCheckboxItem
            key={i.id}
            className="text-[#111] hover:bg-[#f2f2f6]"
            checked={selectedLang === i.lang}
            onClick={() => handleLangChange(i.lang)}
          >
            {i.label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LanguagesBtn;
