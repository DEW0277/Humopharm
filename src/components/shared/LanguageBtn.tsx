import { useState } from "react";
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
import { langArr } from "@/constants";

function LanguagesBtn() {
  const [selectedLang, setSelectedLang] = useState("uz");
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="cursor-pointer bg-white text-[#D93D40] border border-[#D93D40] md:text-black md:border-none shadow-none rounded-xl focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          <img src={Earth} alt="globe" className="w-5 !hidden md:!block" />
          <span className="lang-current capitalize">{selectedLang}</span>
          <img
            src={Angle}
            alt="chevron"
            className={`w-6 transition-transform duration-300 ${open ? "-rotate-90" : "rotate-0"
              }`}
          />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-white rounded-lg border-none">
        <DropdownMenuSeparator />
        {langArr.map((i) => (
          <DropdownMenuCheckboxItem
            key={i.id}
            className="text-[#111] hover:bg-[#f2f2f6]"
            checked={selectedLang === i.lang}
            onClick={() => setSelectedLang(i.lang)}
          >
            {i.lang}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LanguagesBtn;
