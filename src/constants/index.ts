import { v4 as uuidv4 } from "uuid";
import sertificatImage1 from "../images/serteficate1.png";
import sertificatImage2 from "../images/serteficate2.png";
import sertificatImage3 from "../images/serteficate3.png";
import sertificatImage4 from "../images/serteficate4.jpg";

import sistamImage from "../images/sistam.png";
import itemImg1 from "../images/calendar-clock.png";
import itemImg2 from "../images/user-alt.png";
import itemImg3 from "../images/pills.png";

export const navigationLinks = [
  {
    id: uuidv4(),
    title: "Biz haqimizda",
    link: "about",
  },
  {
    id: uuidv4(),
    title: "Mahsulotlar",
    link: "products",
  },
  {
    id: uuidv4(),
    title: "Bog‘lanish",
    link: "contact",
  },
];

export const langArr = [
  {
    id: uuidv4(),
    lang: "uz",
  },
  {
    id: uuidv4(),
    lang: "ru",
  },
  {
    id: uuidv4(),
    lang: "eng",
  },
];

export const certificateArr = [
  {
    id: uuidv4(),
    img: sertificatImage1,
  },
  {
    id: uuidv4(),
    img: sertificatImage2,
  },
  {
    id: uuidv4(),
    img: sertificatImage3,
  },
  {
    id: uuidv4(),
    img: sertificatImage4,
  },
];

export const items = [
  {
    id: uuidv4(),
    title: "20+ Yillik Tajriba",
    desc: "Uzoqq yillardan beri halqimizning hiz-matida bo’lib, o’z hizmatlarimizni taklif qilyapmiz",
    img: itemImg1,
  },
  {
    id: uuidv4(),
    title: "170+ Xodimlar",
    desc: "Bizning kompaniyada eng tajribali xodimlar o’z ish faoliyatlarini olib borishadi  va yuqori natijalar ko’rsatadi",
    img: itemImg2,
  },
  {
    id: uuidv4(),
    title: "160+ Mahsulot turlari",
    desc: "Siz bu yerda 100+ dan ortiq mahsulotlarni topishingiz mumkun. Va u mahsulot to’g’risida barcha ma’lumotlar mavjud.",
    img: itemImg3,
  },
];

export const products = Array(20)
  .fill(null)
  .map((_, index) => ({
    id: index + 1,
    name: "Sistam",
    type: "kapsula",
    image: [sistamImage],
    des: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type  scrambled it to make a type specimen book. It has survived not only f centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release Letraset sheets containing Lorem Ipsum passages,",
  }));
