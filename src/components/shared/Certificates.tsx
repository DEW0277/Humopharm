import vrachImage from "@/images/vrach.png";
import stethoscopeImage from "@/images/stethoscope.png";
import group125Image from "@/images/Group 125.png";
import certificatesBg from "@/images/certificates-bg.png";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import { Card, CardContent } from "../ui/card";
import { certificateArr } from "@/constants";

function Certificates() {
  return (
    <section className="mt-[200px]">
      <div className="relative flex flex-col md:flex-row items-center md:items-start gap-4 bg-gradient-to-b from-[#ec5256] via-[#d93d40] to-[#a61f22] rounded-[18px] p-6 text-white overflow-hidden w-full max-w-[1320px] mx-auto min-h-[520px]">
        <img
          className="hidden! md:block! absolute bottom-0 left-[228px] ml-[-130px] w-[356px] h-[434px] z-10"
          src={vrachImage}
          alt="doctor"
        />
        <img className="hidden! md:block! absolute top-3 right-5 opacity-90" src={stethoscopeImage} alt="stethoscope" />
        <img className="hidden md:block! absolute bottom-0 left-0 opacity-90" src={group125Image} alt="stethoscope" />

        {/* Заголовок и описание */}
        <div className="relative flex flex-col items-center md:items-start text-center md:text-left z-20 w-full md:w-auto">
          <h2 className="text-[clamp(28px,3.2vw,40px)] md:text-[58px] font-extrabold leading-tight mt-0 md:mt-0">
            Bizning Sertifikatlarimiz
          </h2>
          <p className="max-w-[440px] opacity-95 mt-4">
            Siz bu yerda barcha maxsus tashkilotlardan berilgan sertifikat va tegishli litsenziyalarni ko‘rishingiz
            mumkin. Bu yo‘l ishonchingizni oshadi.
          </p>
        </div>

        {/* Карусель */}
        <div className="mt-8 md:mt-60 flex justify-center md:justify-start w-full relative">
          <img
            src={certificatesBg}
            alt="certificates background"
            className="hidden! md:block! absolute bottom-[-40px] left-1/2 md:left-[100px] -translate-x-1/2 md:translate-x-0
             w-[680px] h-auto z-0 pointer-events-none select-none"
          />

          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-[650px] flex flex-col"
          >
            <CarouselContent>
              {certificateArr.map(item => (
                <CarouselItem key={item.id} className="basis-full sm:basis-1/2 lg:basis-1/3 flex justify-center">
                  <Card className="w-[210px] h-[280px] overflow-hidden border-none">
                    <CardContent className="p-0">
                      <img src={item.img} alt="certificate" className="w-full h-full object-cover" />
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Кнопки карусели по бокам */}
            <CarouselPrevious className="absolute md:hidden left-[10px] top-1/2 -translate-y-1/2" />
            <CarouselNext className="absolute md:hidden right-[10px] top-1/2 -translate-y-1/2" />

            <div className="hidden! md:flex! justify-center gap-4 my-10 relative mx-auto">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </Carousel>

          {/* Декор внизу (десктоп) */}
          <div className="hidden md:block mt-[600px] w-[432px] absolute h-[432px] mr-10">
            <img src={group125Image} alt="decor" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Certificates;
