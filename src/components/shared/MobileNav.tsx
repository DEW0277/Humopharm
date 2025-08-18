import { useState } from "react";
import Logo from "@/images/logo.png";
import LanguagesBtn from "./LanguageBtn";
import { Button } from "../ui/button";
import { RiApps2Fill, RiCloseFill } from "react-icons/ri";
import { navigationLinks } from '@/constants'
import Email from "@/images/clip-mail 1.png";
import Phone from "@/images/phone-call (7) 1.png";



function MobileNav() {
    const [open, setOpen] = useState(false)

    const toggleMenu = () => {
        setOpen(!open);
        document.querySelector('.w-full.h-screen.fixed')?.classList.toggle('hidden');
    }
    return (
        <nav className="max-md:flex hidden p-4 items-center justify-between">
            <img src={Logo} alt="Humo Pharm Group" className="w-[157px] h-auto" />
            <div className="flex items-center">
                <LanguagesBtn />
                <Button size={"icon"} className="ml-2 bg-[#D93D40] hover:bg-[#D93D40]/90 rounded-xl cursor-pointer" onClick={toggleMenu}>
                    <RiApps2Fill className="size-6 text-white" />
                </Button>
                <div className={`w-full px-4 py-6 fixed top-0 left-0 bg-white z-50  transition-transform duration-300 ${open ? 'translate-y-0' : '-translate-y-full'} flex flex-col items-center justify-center`}>
                    <div className="w-full flex items-start justify-between">
                        <ul className="space-y-4 text-lg">
                            {navigationLinks.map((i) => (
                                <li key={i.id}>
                                    <a
                                        href={`#${i.link}`}
                                        className="cursor-pointer font-semibold opacity-95 hover:opacity-100 hover:underline"
                                        onClick={toggleMenu}
                                    >
                                        {i.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <Button size={"icon"} className="mt-6 bg-[#D93D40] hover:bg-[#D93D40]/90 rounded-full cursor-pointer" onClick={toggleMenu}>
                            <RiCloseFill className="size-6 text-white" />
                        </Button>
                    </div>
                    <div className="w-full flex items-center justify-between mt-4 flex-wrap gap-2.5">
                        <div className="flex items-center gap-2.5">
                            <img src={Email} alt="mail" className="w-6 h-6" />
                            <p className="m-0">
                                Email: <br />
                                <span className="font-medium text-[#6b6b6b] block">
                                    humofarmgroup@gmail.com
                                </span>
                            </p>
                        </div>
                        <div className="flex items-center gap-2.5">
                            <img src={Phone} alt="phone" className="w-6 h-6" />
                            <p className="m-0">
                                Tel: <br />
                                <span className="font-medium text-[#6b6b6b] block">
                                    +998 00 000 00 00
                                </span>
                            </p>
                        </div>                    </div>
                </div>
            </div>
        </nav >
    )
}

export default MobileNav