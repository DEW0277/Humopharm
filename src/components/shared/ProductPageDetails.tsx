import Modal from "@/components/ui/Modal";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProductDetails } from "@/hooks/useProducts";
import { Loader2, ArrowLeft } from "lucide-react";

const ProductPage = () => {
  const [current, setCurrent] = useState(0);
  const [open, setOpen] = useState<number | null>(null);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const productId = id ? parseInt(id) : 0;

  const { product, loading, error } = useProductDetails(productId);

  const handleBackClick = () => {
    navigate("/");
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto p-6">
        <div className="flex justify-center items-center py-20">
          <Loader2 className="animate-spin size-12 text-[#e52629]" />
        </div>
      </div>
    );
  }
  console.log(product);

  if (error || !product) {
    return (
      <div className="max-w-5xl mx-auto p-6">
        <div className="text-center py-20">
          <p className="text-red-600 text-lg mb-4">{error || "Mahsulot topilmadi"}</p>
          <button
            onClick={handleBackClick}
            className="flex items-center gap-2 mx-auto px-6 py-3 bg-[#e52629] text-white rounded-lg hover:bg-[#c41e21] transition-colors"
          >
            <ArrowLeft className="size-5" />
            Bosh sahifaga qaytish
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="w-full md:w-[500px]">
          <div className="flex items-center mb-4 gap-4">
            <button
              onClick={handleBackClick}
              className="cursor-pointer p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="size-6 text-gray-600" />
            </button>
            <div className="ml-4 flex flex-col items-center">
              <h1 className="text-3xl md:text-5xl font-bold mb-2 text-center">{product.name}</h1>
              <span className="text-lg md:text-xl px-3 py-1 bg-blue-600 text-white rounded-full">{product.type}</span>
              {product.genus && <span className="text-sm text-gray-600 mt-2">{product.genus}</span>}
            </div>
          </div>

          <h2 className="text-black text-xl font-bold mt-4">Qisqacha ma'lumot :</h2>
          <p className="text-gray-600 text-base mt-2 leading-relaxed">{product.description}</p>

          {/* Additional Product Info */}
          <div className="mt-6 space-y-3">
            {product.price && (
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-700">Narxi:</span>
                <span className="text-lg font-bold text-[#e52629]">{product.price.toLocaleString()} so'm</span>
              </div>
            )}

            {product.dosage && (
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-700">Dozasi:</span>
                <span className="text-gray-600">{product.dosage}</span>
              </div>
            )}

            {product.manufacturer && (
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-700">Ishlab chiqaruvchi:</span>
                <span className="text-gray-600">{product.manufacturer}</span>
              </div>
            )}

            {product.prescription !== undefined && (
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-700">Retsept:</span>
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    product.prescription ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
                  }`}
                >
                  {product.prescription ? "Kerak" : "Kerak emas"}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="relative bg-gray-100 w-full md:w-[512px] rounded-lg p-6">
          <div className="relative bg-white rounded-lg shadow-md p-2">
            <img
              src={`${import.meta.env.VITE_API_URL || "http://localhost:3000"}${product.images[current]}`}
              alt={product.name}
              className="w-full rounded-lg"
            />
            {product.images.length > 1 && (
              <>
                <button
                  onClick={() => setCurrent(prev => (prev === 0 ? product.images.length - 1 : prev - 1))}
                  className="absolute top-1/2 left-3 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-md transition-colors"
                >
                  <ArrowLeft className="size-5 text-gray-700" />
                </button>

                <button
                  onClick={() => setCurrent(prev => (prev === product.images.length - 1 ? 0 : prev + 1))}
                  className="absolute top-1/2 right-3 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-md transition-colors"
                >
                  <ArrowLeft className="size-5 text-gray-700 rotate-180" />
                </button>
              </>
            )}
          </div>

          {product.images.length > 1 && (
            <div className="flex justify-center mt-4 gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`w-14 h-14 border rounded-md overflow-hidden bg-white shadow-sm transition-all ${
                    current === idx ? "border-red-500 scale-110" : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <img
                    src={`${import.meta.env.VITE_API_URL || "http://localhost:3000"}${img}`}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Product Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {product.sections?.map((section, index) => (
          <div key={index} className="bg-gray-100 rounded-xl shadow-sm">
            <button
              onClick={() => setOpen(index)}
              className="flex w-full items-center justify-between px-4 py-3 hover:bg-gray-200 transition rounded-xl"
            >
              <span className="font-medium">{section.title}</span>
              <svg
                className={`w-5 h-5 transition-transform ${open === index ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <Modal open={open === index} onClose={() => setOpen(null)} title={section.title}>
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">{section.content}</p>
              </div>
            </Modal>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
