import Call from "@/images/phone-call (7) 1.png";
import User1 from "@/images/user1.png";
import User2 from "@/images/user2.png";
import User3 from "@/images/user3.png";
import Doctor from "@/images/dctr-removebg-preview-Picsart-AiImageEnhancer 1.png";
import { Button } from "../ui/button";

function Hero() {
  return (
    <section className="relative overflow-hidden rounded-tr-[200px] rounded-bl-[30px] w-[92%] max-w-[1366px] mx-auto p-6 sm:p-10 flex flex-col-reverse lg:flex-row items-center justify-between gap-8 bg-[url(@/images/image3.png)]">
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#dc3c40] to-[#762022cc]" />
      <div className="flex-1 flex flex-col gap-4 text-white items-center lg:items-start text-center lg:text-left relative z-50">
        <h3 className="hidden md:flex items-center gap-2.5 font-semibold opacity-90">
          <span className="block w-8 h-[1.6px] bg-white"></span>
          Assalomu alaykum
        </h3>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl text-start md:text-center font-extrabold leading-snug">
          Humo Pharm Group rasmiy sahifasiga hush kelibsiz
        </h1>
        <p className="opacity-95 text-start md:text-center">
          Siz bu yerda bizning barcha mahsulotlarimiz, kompaniya haqida ma’lumotlar va hamkorlar uchun aloqalarni
          topasiz. Sifat — bizning ustuvor yo’nalishimiz.
        </p>
        <div className="flex items-center gap-4 mt-4 justify-start md:justify-center w-full">
          <Button className="bg-white text-[#d93c40] px-5 py-3 rounded-[28px] font-bold hover:scale-105 transition-transform">
            <a href="#contact" className="inline-flex items-center gap-2">
              <img src={Call} alt="phone" className="w-5 h-5" />
              Bog‘lanish
            </a>
          </Button>
          <div className="hidden md:flex items-center gap-4">
            <div className="relative w-[120px] h-12">
              <img src={User1} className="absolute left-0 w-12 h-12 rounded-full border-4 border-white z-10" />
              <img src={User2} className="absolute left-9 w-12 h-12 rounded-full border-4 border-white z-20" />
              <img src={User3} className="absolute left-18 w-12 h-12 rounded-full border-4 border-white z-30" />
            </div>
            <span className="font-semibold text-lg">
              500+ <br /> ishonchli mijozlar
            </span>
          </div>
        </div>
      </div>
      <div className=" md:flex flex-1 relative justify-center lg:justify-end items-center w-full">
        {/* <div className='bg-[#FF5A64] rounded-[160px_160px_10px_10px] w-[280px] sm:w-[320px] md:w-[360px] h-[300px] sm:h-[350px] md:h-[395px] relative z-10' /> */}
        <img
          src={Doctor}
          alt="Doctor"
          className="md:block hidden absolute bottom-[-200px] left-1/2 -translate-x-1/2 sm:w-[400px] md:w-[550px] lg:w-[766px] h-auto z-[99999999]"
          style={{ display: window.innerWidth < 768 ? "none" : undefined }}
        />
      </div>
    </section>
  );
}

export default Hero;
