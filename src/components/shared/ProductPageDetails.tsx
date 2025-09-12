import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useProductDetails } from "@/hooks/useProducts";
import { Loader2, ArrowLeft } from "lucide-react";
import Modal from "../ui/Modal";

const ProductPage = () => {
  const { t } = useTranslation();
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const productId = id ? parseInt(id) : 0;
  const [open, setOpen] = useState<number | null>(null);
  const { product, loading, error } = useProductDetails(productId);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto p-6">
        <div className="flex justify-center items-center py-20">
          <Loader2 className="animate-spin size-12 text-[#e52629]" />
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-5xl mx-auto p-6">
        <div className="text-center py-20">
          <p className="text-red-600 text-lg mb-4">{error || t("product.notFound")}</p>
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 mx-auto px-6 py-3 bg-[#e52629] text-white rounded-lg hover:bg-[#c41e21] transition-colors"
          >
            <ArrowLeft className="size-5" />
            {t("product.backToHome")}
          </button>
        </div>
      </div>
    );
  }

  const sections = [
    {
      title: t("product.sections.composition"),
      content: product.genus || t("product.sections.compositionDefault"),
    },
    {
      title: t("product.sections.usage"),
      content: product.dosage || t("product.sections.usageDefault"),
    },
    {
      title: t("product.sections.additionalInfo"),
      content: product.description || t("product.sections.additionalInfoDefault"),
    },
    {
      title: t("product.sections.sideEffects"),
      content: product.manufacturer || t("product.sections.sideEffectsDefault"),
    },
  ];

  return (
    <div className="max-w-[1320px] mx-auto">
      <div className="grid grid-cols-1! md:grid-cols-2! gap-8 ">
        <div className="flex flex-col">
          <div className="flex items-center mb-4 gap-30 ">
            <img src="/orqaga-icon.svg" alt={t("product.back")} onClick={() => navigate("/")} />
            <div className="ml-4 flex flex-col items-center">
              <h1 className="text-5xl font-bold mb-2 text-center">{product.name}</h1>
              <span className="text-xl px-3 py-1 bg-blue-600 text-white rounded-full">{product.type}</span>
            </div>
          </div>
          <h2 className="text-black text-xl font-bold mt-4">{t("product.shortInfo")}</h2>
          <p className="text-gray-600 text-l mt-2 leading-relaxed">{product.description}</p>
        </div>

        <div className="flex flex-col">
          <div className="relative bg-gray-100 md:w-[515px] rounded-lg p-6 ">
            <div className="relative bg-white rounded-lg shadow-md p-2 h-[400px]">
              <img
                src={`${import.meta.env.VITE_API_URL || "http://localhost:3000"}${product.images[current]}`}
                alt={product.name}
                className="w-full h-full rounded-lg"
              />
              <button
                onClick={() => setCurrent(prev => (prev === 0 ? product.images.length - 1 : prev - 1))}
                className="absolute top-1/2 left-3 -translate-y-1/2 p-2 "
              >
                <img src="/left.svg" alt={t("product.prevImage")} />
              </button>

              <button
                onClick={() => setCurrent(prev => (prev === product.images.length - 1 ? 0 : prev + 1))}
                className="absolute top-1/2 right-3 -translate-y-1/2 p-2 "
              >
                <img src="/right.svg" alt={t("product.nextImage")} />
              </button>
            </div>

            <div className="flex justify-center mt-4 gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`w-14 h-14 border rounded-md overflow-hidden bg-white shadow-sm ${
                    current === idx ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <img
                    src={`${import.meta.env.VITE_API_URL || "http://localhost:3000"}${img}`}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2! md:grid-cols-2 gap-4 my-8">
        {sections.map((section, index) => (
          <div key={index} className="bg-gray-100 rounded-xl shadow-sm">
            <button
              onClick={() => setOpen(index)}
              className="flex w-full items-center justify-between px-4 py-3 hover:bg-gray-200 transition rounded-xl"
            >
              <span className="font-medium">{section.title}</span>
              <img src="/kirish.svg" alt={t("product.openSection")} />
            </button>

            <Modal open={open === index} onClose={() => setOpen(null)} title={section.title}>
              {section.content}
            </Modal>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
