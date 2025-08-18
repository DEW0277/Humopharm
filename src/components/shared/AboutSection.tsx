import Microchip from "@/images/microchip 1.png"
import Factory from "@/images/image 20.png"
import Factory2 from "@/images/image 23.png"
import User from "@/images/user-md 1 (1).png"
import Disusion from "@/images/discussion-group 1.png"
import Factory3 from "@/images/factory.png"
import Factory4 from "@/images/liblary.png"
import Factory5 from "@/images/test-tabletka.png"
import Factory6 from "@/images/tabletka.png"
import Dori from "@/images/dori.png"
import { items } from "@/constants"
import AboutCard from "./AboutCard"

function AboutSection() {
  return (
    <>
      <section className="section center text-center" id="about">
        <div className="w-full max-w-[625px] flex justify-center items-center mx-auto bg-inherit md:bg-[#D93D40] py-5">
          <h2 className="text-[#D93D40] md:text-white text-2xl sm:text-3xl md:text-4xl font-semibold">Humo Pharm Group</h2>
        </div>
        <h3 className="font-['Pacifico'] mt-8 text-[#D93D40] font-normal text-4xl ">Bu !!!</h3>
      </section>
      <section className="px-5">
        {/* desktop */}
        <div className="hidden max-w-6xl mx-auto md:flex flex-col gap-6 space-y-40 mt-6 max-md:overflow-hidden">
          <div className="relative -ml-[100px] flex items-center flex-col-reverse lg:flex-row">
            <div className="w-[600px] relative">
              <div className="bg-assets" />
              <div className="image-stack relative">
                <div className="about-img-div">
                  <img src={Factory} alt="Ishlab chiqarish 1" />
                </div>
                <div className="about-img-2">
                  <img src={Factory2} alt="Ishlab chiqarish 2" />
                  <div className="bg-assets-1" />
                </div>
              </div>
            </div>
            <div className="ml-0 lg:ml-50 items-center space-y-4">
              <p className="font-bold text-[28px] text-[#413838]">8+ yil Tajriba</p>
              <p className="font-medium text-[18px] w-[332px]">
                Uzoq yillardan beri halqimizning hizmatida bo’lib, o’z servislarimizni taklif qilmoqdamiz.
              </p>
              <div className="flex gap-2 items-center text-[#d93c40]">
                <img src={Microchip} alt="" />
                <p className="font-semibold text-[18px]">Yuqori texnologiyalar</p>
              </div>
              <div className="flex items-center gap-2 text-[#d93c40]">
                <img src={User} alt="" />
                <p className="font-semibold text-[18px]">Malakali xodimlar</p>
              </div>
              <div className="w-[428px] h-[201px] rounded-[60px] -mt-[95px] ml-[76px] bg-[#FFF7F7] z-[-1]"></div>
            </div>
          </div>
          <div className="relative -ml-[100px] flex flex-col lg:flex-row justify-around items-center">
            <div className="w-[600px] relative space-y-6">
              <p className="font-bold text-[28px] text-[#413838]">70+ xodimlar</p>
              <p className="font-medium text-[18px] w-[332px]">
                Bizning kompaniyada eng tajribali xodimlar o’z ish faoliyatlarini olib borishadi va yuqori natijalar ko’rsatadi
              </p>
              <div className="space-y-4">
                <div className="flex gap-2 items-center text-[#d93c40]">
                  <img src={Disusion} alt="" />
                  <p className="font-semibold text-[18px]">Inoq jamoa</p>
                </div>
                <div className="flex items-center gap-2 text-[#d93c40]">
                  <img src={User} alt="" />
                  <p className="font-semibold text-[18px]">Malakali xodimlar</p>
                </div>
                <div className="w-[428px] h-[201px] rounded-[60px] -mt-[95px] ml-[76px] bg-[#FFF7F7] z-[-1]"></div>
              </div>
            </div>
            <div className="about-right ml-0 lg:ml-50 items-center space-y-4">
              <div className="bg-assets"></div>
              <div className="image-stack">
                <div className="about-img-div">
                  <img src={Factory3} alt="Ishlab chiqarish 1" />
                </div>
                <div className="about-img-2">
                  <img src={Factory4} alt="Ishlab chiqarish 2" />
                  <div className="bg-assets-1"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative -ml-[100px] flex flex-col-reverse lg:flex-row items-center">
            <div className="w-[600px] relative">
              <div className="bg-assets"></div>
              <div className="image-stack">
                <div className="about-img-div">
                  <img src={Factory6} alt="Ishlab chiqarish 1" />
                </div>
                <div className="about-img-2">
                  <img src={Factory5} alt="Ishlab chiqarish 2" />
                  <div className="bg-assets-1"></div>
                </div>
              </div>
            </div>
            <div className="about-right ml-0 lg:ml-50 items-center space-y-4">
              <p className="font-bold text-[28px] text-[#413838]">100+ mahsulot turlari</p>
              <p className="font-medium text-[18px] w-[332px]">
                Siz bu yerda 100+ dan ortiq mahsulotlarni topishingiz mumkun. Va u mahsulot to’g’risida barcha ma’lumotlar mavjud.
              </p>
              <div className="flex gap-2 items-center text-[#d93c40]">
                <img src={Dori} alt="" />
                <p className="font-semibold text-[18px]">Turfa xil dorilar</p>
              </div>
              <div className="flex items-center gap-2 text-[#d93c40]">
                <img src={User} alt="" />
                <p className="font-semibold text-[18px]">Yuqori sifat</p>
              </div>
              <div className="w-[428px] h-[201px] rounded-[60px] -mt-[95px] ml-[76px] bg-[#FFF7F7] z-[-1]"></div>
            </div>
          </div>
        </div>
        {/* mobile */}
        <div className="flex md:hidden flex-col gap-4">
          {items.map(i => (
            <AboutCard key={i.id} item={i} />
          ))}
        </div>
      </section>
    </>
  );
}

export default AboutSection;