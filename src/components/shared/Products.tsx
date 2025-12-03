import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Rasmlarni @ alias yordamida import qilish
import aptechkaImage from '@/images/aptechka.png';
import settingsSlidersImage from '@/images/settings-sliders.png';
import caretRightImage from '@/images/caret-right 3.png';
import setting1Image from '@/images/setting 1.png';
import carretRedImage from '@/images/carret-red.png';
import searchIonImage from '@/images/search-ion.png';
import angleSmallRightImage from '@/images/angle-small-right (1) 2.png';
import { Button } from '../ui/button';
import { ArrowDown, Loader2 } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';

function Products() {
  const { t } = useTranslation();
  const [isGenusOpen, setIsGenusOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [selectedGenus, setSelectedGenus] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [genera] = useState<string[]>([
    'humo pharm',
    'genius pharm',
    'infinity pharm',
  ]);
  const [categories] = useState<string[]>([
    'sirop',
    'tabletka',
    'kapsula',
    'svicha',
  ]);

  const {
    products,
    loading,
    error,
    pagination,
    loadMoreProducts,
    filterByGenus,
    filterByCategory,
    clearFilters,
  } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null); // <== добавляем ref

  // Закрытие при клике вне
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsGenusOpen(false);
        setIsCategoryOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setFilteredProducts(products);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = products.filter((product) =>
        [product.name, product.type, product.genus, product.description]
          .filter(Boolean)
          .some((field) => field?.toLowerCase().includes(query))
      );
      setFilteredProducts(filtered);
    }
  };

  const handleGenusFilter = async (genus: string) => {
    setSelectedGenus(genus);
    setIsGenusOpen(false);
    if (genus === selectedGenus) {
      setSelectedGenus('');
      await clearFilters();
    } else {
      await filterByGenus(genus);
    }
  };

  const handleCategoryFilter = async (category: string) => {
    setSelectedCategory(category);
    setIsCategoryOpen(false);
    if (category === selectedCategory) {
      setSelectedCategory('');
      await clearFilters();
    } else {
      await filterByCategory(category);
    }
  };

  const handleClearFilters = async () => {
    setSelectedGenus('');
    setSelectedCategory('');
    setSearchQuery('');
    await clearFilters();
  };

  const handleLoadMore = async () => {
    await loadMoreProducts();
  };

  const handleGenusToggle = () => {
    setIsGenusOpen(!isGenusOpen);
    if (!isGenusOpen) setIsCategoryOpen(false);
  };

  const handleCategoryToggle = () => {
    setIsCategoryOpen(!isCategoryOpen);
    if (!isCategoryOpen) setIsGenusOpen(false);
  };

  if (error) {
    return (
      <section className='section' id='products'>
        <div className='text-center text-red-600'>
          <p>
            {t('products.error')}: {error}
          </p>
          <Button onClick={() => window.location.reload()} className='mt-4'>
            {t('products.retry')}
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className='section' id='products'>
      <div className='head flex flex-col md:flex-row justify-center gap-3.5'>
        <div className='head-name flex items-center gap-4'>
          <img src={aptechkaImage} alt='' className='size-8 md:size-12' />
          <h3 className='font-semibold text-2xl md:text-3xl lg:text-4xl xl:text-6xl text-[#413838]'>
            {t('products.title')}
          </h3>
        </div>
        <div className='max-md:w-full gap-4 items-center flex relative'>
          <button
            id='categoryBtn'
            className={`flex items-center justify-center cursor-pointer rounded-[20px] !p-2 md:!p-4 gap-2 border bg-[#e52629] text-white border-[#e52629]"
            }`}
            onClick={handleCategoryToggle}
          >
            <img
              src={settingsSlidersImage}
              alt=''
              className='size-4 md:size-6'
            />
            <p className='!text-[10px] sm:!text-base md:text-lg font-semibold'>
              {selectedCategory || t('products.filterCategory')}
            </p>
            <img src={caretRightImage} alt='' className='size-4 md:size-6' />
          </button>
          <div className='relative'>
            <button
              id='genusBtn'
              className={`flex items-center justify-center cursor-pointer rounded-[20px] !p-2 md:!p-4 gap-2 border ${
                selectedGenus
                  ? 'bg-[#e52629] text-white border-[#e52629]'
                  : 'border-[#e52629] bg-white text-[#e52629]'
              }`}
              onClick={handleGenusToggle}
            >
              <img src={setting1Image} alt='' className='size-4 md:size-6' />
              <p className='!text-[10px] sm:!text-base md:!text-lg font-semibold'>
                {selectedGenus || t('products.filterGenus')}
              </p>
              <img src={carretRedImage} alt='' className='size-4 md:size-6' />
            </button>

            {isGenusOpen && (
              <div className='absolute top-full left-0 mt-2 w-[189px] bg-white rounded-lg shadow-lg p-3 flex flex-col gap-2 z-50'>
                {genera?.map((genus) => (
                  <label
                    key={genus}
                    className='flex items-center gap-2 cursor-pointer'
                  >
                    <input
                      type='radio'
                      name='genusOption'
                      className='form-radio w-5 h-5'
                      checked={selectedGenus === genus}
                      onChange={() => handleGenusFilter(genus)}
                    />
                    <span>{genus}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Category Dropdown */}
          <div
            className={`absolute top-full left-0 mt-2 w-[189px] bg-white rounded-lg shadow-lg p-3 flex flex-col gap-2 transition-all duration-300 z-50 ${
              isCategoryOpen
                ? 'opacity-100 scale-95 pointer-events-auto'
                : 'opacity-0 scale-95 pointer-events-none'
            }`}
          >
            {categories.map((category) => (
              <label
                key={category}
                className='flex items-center gap-2 cursor-pointer'
              >
                <input
                  type='radio'
                  name='categoryOption'
                  className='form-radio w-5 h-5'
                  checked={selectedCategory === category}
                  onChange={() => handleCategoryFilter(category)}
                />
                <span>{category}</span>
              </label>
            ))}
          </div>

          {(selectedGenus || selectedCategory || searchQuery) && (
            <button
              onClick={handleClearFilters}
              className='flex items-center justify-center cursor-pointer rounded-[20px] !p-2 md:!p-4 gap-2 border border-gray-400 bg-gray-100 text-gray-600'
            >
              <span className='!text-[10px] sm:!text-base md:!text-lg'>
                {t('products.clearFilters')}
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Search Form */}
      <form
        onSubmit={handleSearch}
        className='flex w-full justify-center items-center my-4'
      >
        <div className='p-2 md:p-4 flex items-center gap-3 w-full max-w-md rounded-full bg-gray-200 shadow-md'>
          <img src={searchIonImage} className='!size-4 md:size-6' alt='' />
          <input
            type='text'
            placeholder={t('products.searchPlaceholder')}
            className='flex-1 bg-transparent border-none text-base focus:outline-none'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button type='submit' className='!p-2 !px-4'>
            {t('products.search')}
          </Button>
        </div>
      </form>

      {/* Products Grid */}
      {loading && products?.length === 0 ? (
        <div className='flex justify-center items-center py-20'>
          <Loader2 className='animate-spin size-8 text-[#e52629]' />
        </div>
      ) : (
        <>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
            {filteredProducts?.map((product) => (
              <div className='product-div p-2' key={product.id}>
                <div className='prod-img'>
                  <img
                    src={`${
                      import.meta.env.VITE_API_URL ||
                      'https://humopharmgroup.uz/api'
                    }${product.images[0]}`}
                    alt={product.name}
                    className='w-full h-35 object-cover rounded-md'
                  />
                </div>

                <div className='prod-about space-y-4'>
                  <div className='prod-name space-y-2'>
                    <h4>{product.name}</h4>
                    <p>{product.type}</p>
                    {product.description && (
                      <span className='text-sm text-gray-600'>
                        {product.description}
                      </span>
                    )}
                  </div>
                  <div className='prod-btn'>
                    <button onClick={() => handleProductClick(product.id)}>
                      <p>{t('products.more')}</p>
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

          {pagination?.page < pagination?.totalPages && (
            <div className='mt-6 w-full flex items-center justify-center'>
              <Button
                variant='outline'
                className='flex gap-2.5 border text-[#E52629] border-[#E52629] rounded-[20px] !py-2.5 !px-7 cursor-pointer'
                onClick={handleLoadMore}
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className='animate-spin size-5' />
                ) : (
                  <>
                    <span className='text-sm'>{t('products.loadMore')}</span>
                    <ArrowDown className='size-5' />
                  </>
                )}
              </Button>
            </div>
          )}

          {products?.length === 0 && !loading && (
            <div className='text-center py-20'>
              <p className='text-gray-600 text-lg'>{t('products.notFound')}</p>
              <Button onClick={handleClearFilters} className='mt-4'>
                {t('products.clearFilters')}
              </Button>
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default Products;
