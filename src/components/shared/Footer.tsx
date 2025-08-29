import { useTranslation } from "react-i18next";
import logoImage from "@/images/logo.png";
import footerLogoImage from "@/images/footer-logo.png";
import { navigationLinks } from "@/constants";
import Ellipese12 from "@/images/Ellipse 12.png";
import Ellipese13 from "@/images/Ellipse 13.png";

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="footer bg-[#F9F9F9] text-[#413838] text-[16px] sm:text-[18px] w-full py-10 px-6 sm:px-10 flex flex-col md:flex-row justify-between items-start relative gap-10 md:gap-0">
      <div className="left-footer flex flex-col space-y-6 md:space-y-10">
        <div>
          <img src={logoImage} alt="Humo Farm Logo" className="w-32 sm:w-40" />
        </div>
        <div className="space-y-1">
          <p>{t("footer.address.city")}</p>
          <p>{t("footer.address.street")}</p>
        </div>
        <p className="text-sm sm:text-base">{t("footer.rights")}</p>
      </div>

      <div className="text-content flex flex-col sm:items-start space-y-4 sm:space-y-6">
        <ul className="flex flex-col items-center sm:items-start gap-2 sm:gap-4 text-center sm:text-left">
          {navigationLinks.map(i => (
            <li key={i.id}>
              <a href={`#${i.link}`} className="cursor-pointer font-semibold hover:underline">
                {t(`nav.${i.link}`, i.title)}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="hidden md:flex w-full md:w-auto justify-end">
        <div>
          <img className="absolute bottom-0 right-0" src={Ellipese13} alt="ellipse" />
          <img className="absolute bottom-0 right-0" src={Ellipese12} alt="ellipse" />
        </div>
        <img className="z-10 max-w-[150px] sm:max-w-[200px]" src={footerLogoImage} alt="Decorative Element" />
      </div>
    </footer>
  );
}

export default Footer;
