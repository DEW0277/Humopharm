import { useState } from 'react';

// Rasmlarni @ alias yordamida import qilish
import aptechkaImage from '@/images/aptechka.png';
import settingsSlidersImage from '@/images/settings-sliders.png';
import caretRightImage from '@/images/caret-right 3.png'; // Fayl nomida bo'shliq borligiga e'tibor bering
import setting1Image from '@/images/setting 1.png'; // Fayl nomida bo'shliq borligiga e'tibor bering
import carretRedImage from '@/images/carret-red.png';
import searchIonImage from '@/images/search-ion.png';
import angleSmallRightImage from '@/images/angle-small-right (1) 2.png'; // Fayl nomida bo'shliq va qavslar borligiga e'tibor bering
import { products } from '@/constants';
import { Button } from '../ui/button';
import { ArrowDown } from 'lucide-react';

function Products() {
  const [isGenusOpen, setIsGenusOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);

  return (
    <section className='section' id='products'>
      <div className='head flex flex-col md:flex-row justify-center gap-3.5'>
        <div className='head-name flex items-center gap-4'>
          <img src={aptechkaImage} alt='' className='size-8 md:size-12' />
          <h3 className='font-semibold text-2xl md:text-3xl lg:text-4xl xl:text-6xl text-[#413838]'>
            Mahsulotlarimiz :
          </h3>
        </div>
        <div className='max-md:w-full gap-4 items-center flex relative'>
          <button
            id='siropBtn'
            className='flex items-center justify-center cursor-pointer text-white rounded-[20px] !p-2 md:!p-4 gap-2 bg-[#e52629] focus-visible:right-0'
          >
            <img
              src={settingsSlidersImage}
              alt=''
              className='size-4 md:size-6'
            />
            <p className='!text-[10px] sm:!text-base md:!text-lg font-semibold text-white'>
              Filtr (sirop)
            </p>
            <img src={caretRightImage} alt='' className='size-4 md:size-6' />
          </button>
          <button
            id='genusBtn'
            className='flex items-center justify-center cursor-pointer rounded-[20px] !p-2 md:!p-4 gap-2 border border-[#e52629] bg-white text-[#e52629]'
            onClick={() => setIsGenusOpen(!isGenusOpen)}
          >
            <img src={setting1Image} alt='' className='size-4 md:size-6' />
            <p className='!text-[10px] sm:!text-base md:!text-lg font-semibold text-[#e52629]'>
              Genus
            </p>
            <img src={carretRedImage} alt='' className='size-4 md:size-6' />
          </button>
          <div
            id='genusDropdgenusDropdownown'
            className={`absolute top-full left-0 mt-2 w-[189px] bg-white rounded-lg shadow-lg p-3 flex flex-col gap-2 transition-all duration-300 z-50 ${
              isGenusOpen
                ? 'opacity-100 scale-95 pointer-events-auto'
                : 'opacity-0 scale-95 pointer-events-none'
            }`}
          >
            <label className='flex items-center gap-2 cursor-pointer'>
              <input
                type='radio'
                name='genusOption'
                className='form-radio w-5 h-5'
              />
              <span>Humo Pharm</span>
            </label>
            <label className='flex items-center gap-2 cursor-pointer'>
              <input
                type='radio'
                name='genusOption'
                className='form-radio w-5 h-5'
              />
              <span>Genius Pharm</span>
            </label>
            <label className='flex items-center gap-2 cursor-pointer'>
              <input
                type='radio'
                name='genusOption'
                className='form-radio w-5 h-5'
              />
              <span>Infinity Pharm</span>
            </label>
          </div>
        </div>
      </div>
      <div className='flex w-full justify-center items-center my-4'>
        <div className='p-2 md:p-4 flex items-center gap-3 w-full max-w-md rounded-full bg-gray-200 shadow-md'>
          <img src={searchIonImage} className='!size-4 md:!size-6' alt='' />
          <input
            type='text'
            placeholder='Qidituv / поиск ...'
            className='flex-1 bg-transparent border-none text-base focus:outline-none'
          />
        </div>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
        {products.slice(0, visibleCount).map((product, index) => (
          <div className='product-div' key={index}>
            <div className='prod-img'>
              <img src={product.image[0]} alt={product.name} />
            </div>
            <div className='prod-about space-y-4'>
              <div className='prod-name space-y-2'>
                <h4>{product.name}</h4>
                <p>{product.type}</p>
              </div>
              <div className='prod-btn'>
                <button>
                  <p>ko’proq bilish</p>
                  <img
                    style={{ transform: 'rotate(-90deg)' }}
                    src={angleSmallRightImage}
                    alt=''
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='mt-6 w-full flex items-center justify-center'>
        <Button
          variant='outline'
          className='flex gap-2.5 border text-[#E52629] border-[#E52629] rounded-[20px] !py-2.5 !px-7 cursor-pointer'
          onClick={() => setVisibleCount((prev) => prev + 4)}
        >
          <span className='text-sm'>Yana ko’rish</span>
          <ArrowDown className='size-5' />
        </Button>
      </div>
    </section>
  );
}

export default Products;
