import Logo from "@/images/logo.png";
import Email from "@/images/clip-mail 1.png";
import Phone from "@/images/phone-call (7) 1.png";

function InfoBar() {
  return (
    <div className="hidden md:flex flex-col sm:flex-row items-center sm:justify-between gap-4 w-[92%] max-w-[1366px] mx-auto p-4">
      <div className="cursor-pointer">
        <img src={Logo} alt="Humo Pharm Group" className="w-[157px] h-auto" />
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-[#413838] text-sm sm:text-base font-semibold">
        <div className="flex items-center gap-2.5">
          <img src={Email} alt="mail" className="w-6 h-6" />
          <p className="m-0">
            Email: <br />
            <span className="font-medium text-[#6b6b6b] block">humofarmgroup@gmail.com</span>
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <img src={Phone} alt="phone" className="w-6 h-6" />
          <p className="m-0">
            Tel: <br />
            <span className="font-medium text-[#6b6b6b] block">+998 99 727 55 51</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default InfoBar;
