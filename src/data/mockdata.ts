export interface ProductInfo {
  id: number;
  name: string;
  type: string;
  description: string;
  images: string[];
  sections: {
    title: string;
    content: string;
  }[];
}

export const product: ProductInfo = {
  id: 1,
  name: 'Sistam',
  type: 'kapsula',
  description: `Lorem Ipsum is simply dummy text of the printing and typesetting
  industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
  when an unknown printer took a galley of type scrambled it to make a type specimen book.
  It has survived not only five centuries, but also the leap into electronic typesetting,
  remaining essentially unchanged...`,
  images: ['/image1.png', '/image.png', '/image1.png', '/image.png'],
  sections: [
    {
      title: 'Tarkibi',
      content: 'Bu yerda mahsulot tarkibi haqida batafsil ma’lumot bo‘ladi.',
    },
    {
      title: 'Qo‘llanilishi',
      content: 'Dori vositasi qo‘llanilishi haqida qisqacha izoh.',
    },
    {
      title: 'Qo‘shimcha ma’lumot',
      content: 'Bu bo‘limda qo‘shimcha ma’lumot beriladi.',
    },
    {
      title: 'Nojo‘ ta’siri',
      content: 'Mumkin bo‘lgan nojo‘ya ta’sirlari haqida izoh.',
    },
  ],
};
