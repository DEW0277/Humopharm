import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Rasmlarni @ alias yordamida import qilish
import aptechkaImage from "@/images/aptechka.png";
import settingsSlidersImage from "@/images/settings-sliders.png";
import caretRightImage from "@/images/caret-right 3.png"; // Fayl nomida bo'shliq borligiga e'tibor bering
import setting1Image from "@/images/setting 1.png"; // Fayl nomida bo'shliq borligiga e'tibor bering
import carretRedImage from "@/images/carret-red.png";
import searchIonImage from "@/images/search-ion.png";
import angleSmallRightImage from "@/images/angle-small-right (1) 2.png"; // Fayl nomida bo'shliq va qavslar borligiga e'tibor bering
import { Button } from "../ui/button";
import { ArrowDown, Loader2 } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";

function Products() {
  const [isGenusOpen, setIsGenusOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const [selectedGenus, setSelectedGenus] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [genera] = useState<string[]>(["humo pharm", "genius pharm", "infinity pharm"]);
  const [categories] = useState<string[]>(["sirop", "tabletka", "kapsula", "svicha"]);

  // const [categories, setCategories] = useState<string[]>([]);
  const { products, loading, error, pagination, loadMoreProducts, filterByGenus, filterByCategory, clearFilters } =
    useProducts();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  // Load genera and categories on component mount
  // useEffect(() => {
  //   const loadFilters = async () => {
  //     try {
  //       const [generaData] = await Promise.all([
  //         apiService.getGenera(),
  //         // apiService.getCategories(),
  //       ]);
  //       setGenera(generaData);
  //       // setCategories(categoriesData);
  //     } catch (err) {
  //       console.error("Failed to load filters:", err);
  //     }
  //   };

  //   loadFilters();
  // }, []);

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      setFilteredProducts(products);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = products.filter(product =>
        [product.name, product.type, product.genus, product.description]
          .filter(Boolean)
          .some(field => field?.toLowerCase().includes(query))
      );
      setFilteredProducts(filtered);
    }
  };

  const handleGenusFilter = async (genus: string) => {
    setSelectedGenus(genus);
    setIsGenusOpen(false);
    if (genus === selectedGenus) {
      setSelectedGenus("");
      await clearFilters();
    } else {
      await filterByGenus(genus);
    }
  };

  const handleCategoryFilter = async (category: string) => {
    setSelectedCategory(category);
    setIsCategoryOpen(false);
    if (category === selectedCategory) {
      setSelectedCategory("");
      await clearFilters();
    } else {
      await filterByCategory(category);
    }
  };

  // const handleCategoryFilter = async (category: string) => {
  //   setSelectedCategory(category);
  //   if (category === selectedCategory) {
  //     setSelectedCategory("");
  //     await clearFilters();
  //   } else {
  //     await filterByCategory(category);
  //   }
  // };

  const handleClearFilters = async () => {
    setSelectedGenus("");
    setSelectedCategory("");
    setSearchQuery("");
    await clearFilters();
  };

  const handleLoadMore = async () => {
    await loadMoreProducts();
  };

  if (error) {
    return (
      <section className="section" id="products">
        <div className="text-center text-red-600">
          <p>Xatolik yuz berdi: {error}</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Qayta urinish
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="section" id="products">
      <div className="head flex flex-col md:flex-row justify-center gap-3.5">
        <div className="head-name flex items-center gap-4">
          <img src={aptechkaImage} alt="" className="size-8 md:size-12" />
          <h3 className="font-semibold text-2xl md:text-3xl lg:text-4xl xl:text-6xl text-[#413838]">
            Mahsulotlarimiz :
          </h3>
        </div>
        <div className="max-md:w-full gap-4 items-center flex relative">
          <button
            id="categoryBtn"
            className={`flex items-center justify-center cursor-pointer rounded-[20px] !p-2 md:!p-4 gap-2 border ${
              selectedCategory ? "bg-[#e52629] text-white border-[#e52629]" : "border-[#e52629] bg-white text-[#e52629]"
            }`}
            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
          >
            <img src={settingsSlidersImage} alt="" className="size-4 md:size-6" />
            <p className="!text-[10px] sm:!text-base md:text-lg font-semibold">{selectedCategory || "Filtr(sirop)"}</p>
            <img src={caretRightImage} alt="" className="size-4 md:size-6" />
          </button>
          <button
            id="genusBtn"
            className={`flex items-center justify-center cursor-pointer rounded-[20px] !p-2 md:!p-4 gap-2 border ${
              selectedGenus ? "bg-[#e52629] text-white border-[#e52629]" : "border-[#e52629] bg-white text-[#e52629]"
            }`}
            onClick={() => setIsGenusOpen(!isGenusOpen)}
          >
            <img src={setting1Image} alt="" className="size-4 md:size-6" />
            <p className="!text-[10px] sm:!text-base md:!text-lg font-semibold">{selectedGenus || "Genus"}</p>
            <img src={carretRedImage} alt="" className="size-4 md:size-6" />
          </button>

          {/* Genus Dropdown */}
          <div
            id="genusDropdown"
            className={`absolute top-full left-0 mt-2 w-[189px] bg-white rounded-lg shadow-lg p-3 flex flex-col gap-2 transition-all duration-300 z-50 ${
              isGenusOpen ? "opacity-100 scale-95 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            {genera?.map(genus => (
              <label key={genus} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="genusOption"
                  className="form-radio w-5 h-5"
                  checked={selectedGenus === genus}
                  onChange={() => handleGenusFilter(genus)}
                />
                <span>{genus}</span>
              </label>
            ))}
          </div>

          {/* Category Dropdown */}
          {/* Category Dropdown */}
          <div
            className={`absolute top-full left-0 mt-2 w-[189px] bg-white rounded-lg shadow-lg p-3 flex flex-col gap-2 transition-all duration-300 z-50 ${
              isCategoryOpen ? "opacity-100 scale-95 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            {categories.map(category => (
              <label key={category} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="categoryOption"
                  className="form-radio w-5 h-5"
                  checked={selectedCategory === category}
                  onChange={() => handleCategoryFilter(category)}
                />
                <span>{category}</span>
              </label>
            ))}
          </div>

          {/* Clear Filters Button */}
          {(selectedGenus || selectedCategory || searchQuery) && (
            <button
              onClick={handleClearFilters}
              className="flex items-center justify-center cursor-pointer rounded-[20px] !p-2 md:!p-4 gap-2 border border-gray-400 bg-gray-100 text-gray-600"
            >
              <span className="!text-[10px] sm:!text-base md:!text-lg">Tozalash</span>
            </button>
          )}
        </div>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="flex w-full justify-center items-center my-4">
        <div className="p-2 md:p-4 flex items-center gap-3 w-full max-w-md rounded-full bg-gray-200 shadow-md">
          <img src={searchIonImage} className="!size-4 md:size-6" alt="" />
          <input
            type="text"
            placeholder="Qidituv / поиск ..."
            className="flex-1 bg-transparent border-none text-base focus:outline-none"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          <Button type="submit" className="!p-2 !px-4">
            Qidirish
          </Button>
        </div>
      </form>

      {/* Products Grid */}
      {loading && products?.length === 0 ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="animate-spin size-8 text-[#e52629]" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts?.map(product => (
              <div className="product-div" key={product.id}>
                <div className="prod-img">
                  <img
                    src={`${import.meta.env.VITE_API_URL || "http://localhost:3000"}${product.images[0]}`}
                    alt={product.name}
                    className="w-full h-30 object-cover rounded-md"
                  />
                </div>

                <div className="prod-about space-y-4">
                  <div className="prod-name space-y-2">
                    <h4>{product.name}</h4>
                    <p>{product.type}</p>
                    {product.genus && <span className="text-sm text-gray-600">{product.genus}</span>}
                  </div>
                  <div className="prod-btn">
                    <button onClick={() => handleProductClick(product.id)}>
                      <p>ko'proq bilish</p>
                      <img style={{ transform: "rotate(-90deg)" }} src={angleSmallRightImage} alt="" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {pagination?.page < pagination?.totalPages && (
            <div className="mt-6 w-full flex items-center justify-center">
              <Button
                variant="outline"
                className="flex gap-2.5 border text-[#E52629] border-[#E52629] rounded-[20px] !py-2.5 !px-7 cursor-pointer"
                onClick={handleLoadMore}
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="animate-spin size-5" />
                ) : (
                  <>
                    <span className="text-sm">Yana ko'rish</span>
                    <ArrowDown className="size-5" />
                  </>
                )}
              </Button>
            </div>
          )}

          {/* No Products Message */}
          {products?.length === 0 && !loading && (
            <div className="text-center py-20">
              <p className="text-gray-600 text-lg">Mahsulotlar topilmadi</p>
              <Button onClick={handleClearFilters} className="mt-4">
                Filtrlarni tozalash
              </Button>
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default Products;
