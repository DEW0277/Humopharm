import { navigationLinks } from "@/constants";
import LanguagesBtn from "./LanguageBtn";

function DesktopNav() {
  return (
    <nav className="hidden md:flex bg-[#d93c40] mb-5 text-white rounded-[22px] w-full max-w-[1320px] mx-auto p-3 sm:p-4 flex-col sm:flex-row items-center sm:justify-between gap-4 relative z-10">
      <ul className="flex flex-row gap-4 sm:gap-6 items-center text-center sm:text-left">
        {navigationLinks.map(i => (
          <li key={i.id}>
            <a
              href={`#${i.link}`}
              className="cursor-pointer font-semibold opacity-95 hover:opacity-100 hover:underline"
            >
              {i.title}
            </a>
          </li>
        ))}
      </ul>
      <div>
        <LanguagesBtn />
      </div>
    </nav>
  );
}

export default DesktopNav;
