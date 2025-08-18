import Modal from '@/components/ui/Modal';
import { product } from '@/data/mockdata';
import { useState } from 'react';

const ProductPage = () => {
  const [current, setCurrent] = useState(0);
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className='max-w-5xl mx-auto p-6'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-start'>
        <div>
          <div className='flex items-center mb-4 gap-30 '>
            <img src='/orqaga-icon.svg' alt='' />
            <div className='ml-4 flex flex-col items-center'>
              <h1 className='text-5xl font-bold mb-2 text-center'>
                {product.name}
              </h1>
              <span className='text-xl px-3 py-1 bg-blue-600 text-white rounded-full'>
                {product.type}
              </span>
            </div>
          </div>
          <h2 className='text-black text-xl font-bold mt-4'>
            Qisqacha ma’lumot :
          </h2>
          <p className='text-gray-600 text-l mt-2 leading-relaxed'>
            {product.description}
          </p>
        </div>

        <div className='relative bg-gray-100 rounded-lg p-6'>
          <div className='relative bg-white rounded-lg shadow-md p-2'>
            <img
              src={product.images[current]}
              alt={product.name}
              className='w-full rounded-lg'
            />
            <button
              onClick={() =>
                setCurrent((prev) =>
                  prev === 0 ? product.images.length - 1 : prev - 1
                )
              }
              className='absolute top-1/2 left-3 -translate-y-1/2 p-2 '
            >
              <img src='/left.svg' alt='' />
            </button>

            <button
              onClick={() =>
                setCurrent((prev) =>
                  prev === product.images.length - 1 ? 0 : prev + 1
                )
              }
              className='absolute top-1/2 right-3 -translate-y-1/2  p-2 '
            >
              <img src='/right.svg' alt='' />
            </button>
          </div>

          <div className='flex justify-center mt-4 gap-3'>
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`w-14 h-14 border rounded-md overflow-hidden bg-white shadow-sm ${
                  current === idx ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <img src={img} alt='' className='w-full h-full object-cover' />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-8'>
        {product.sections.map((section, index) => (
          <div key={index} className='bg-gray-100 rounded-xl shadow-sm'>
            <button
              onClick={() => setOpen(index)}
              className='flex w-full items-center justify-between px-4 py-3 hover:bg-gray-200 transition rounded-xl'
            >
              <span className='font-medium'>{section.title}</span>
              <img src='/kirish.svg' alt='' />
            </button>

            <Modal
              open={open === index}
              onClose={() => setOpen(null)}
              title={section.title}
            >
              {section.content}
            </Modal>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
