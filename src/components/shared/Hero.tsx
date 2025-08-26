import { useTranslation } from "react-i18next";
import Call from "@/images/phone-call (7) 1.png";
import User1 from "@/images/user1.png";
import User2 from "@/images/user2.png";
import User3 from "@/images/user3.png";
import Doctor from "@/images/dctr-removebg-preview-Picsart-AiImageEnhancer 1.png";
import { Button } from "../ui/button";

function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative rounded-tr-[200px] rounded-bl-[30px]! w-full max-w-[1320px] w-[92%] mx-auto p-6 sm:p-10 flex flex-col-reverse lg:flex-row items-center justify-between gap-8 bg-[url(@/images/image3.png)]">
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#dc3c40] to-[#762022cc]  rounded-tr-[200px] rounded-bl-[30px]!" />

      <div className="flex-1 flex flex-col gap-4 text-white items-center lg:items-start text-center lg:text-left relative z-50 ">
        <h3 className="hidden md:flex items-center gap-2.5 font-semibold opacity-90 mt-[-10px]">
          <span className="block w-8 h-[1.6px] bg-white"></span>
          {t("hero.greeting")}
        </h3>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl text-start font-semibold leading-snug max-w-[550px]">
          {t("hero.title")}
        </h1>
        <p className="opacity-95 text-start max-w-[450px]">{t("hero.description")}</p>
        <div className="flex items-center gap-4 mt-4 justify-start w-full">
          <Button className="bg-white text-[#d93c40] px-5 py-6 rounded-[20px] font-bold hover:scale-105 transition-transform">
            <a href="#contact" className="inline-flex items-center gap-2">
              <img src={Call} alt="phone" className="w-5 h-5" />
              {t("hero.contactButton")}
            </a>
          </Button>
          <div className="hidden md:flex items-center gap-4">
            <div className="relative w-[120px] h-12">
              <img src={User1} className="absolute left-0 w-12 h-12 rounded-full border-4 border-white z-10" />
              <img src={User2} className="absolute left-9 w-12 h-12 rounded-full border-4 border-white z-20" />
              <img src={User3} className="absolute left-18 w-12 h-12 rounded-full border-4 border-white z-30" />
            </div>
            <span className="font-semibold text-lg">{t("hero.clientsCount")}</span>
          </div>
        </div>
      </div>
      <div className=" md:flex flex-1 relative justify-center lg:justify-end items-center w-full">
        <img
          src={Doctor}
          alt="Doctor"
          className="md:block hidden absolute bottom-[-192px] left-1/2 -translate-x-1/2 sm:w-[400px] md:w-[550px] lg:w-[766px] h-auto z-[99999999]"
          style={{ display: typeof window !== "undefined" && window.innerWidth < 768 ? "none" : undefined }}
        />
      </div>
    </section>
  );
}

export default Hero;
