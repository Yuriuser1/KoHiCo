
import { Suspense } from "react";
import { CatalogContent } from "./catalog-content";
import { Loading } from "@/components/ui/loading";

export const metadata = {
  title: "Каталог товаров - KoHiCo",
  description: "Полный каталог премиальной корейской косметики. Фильтры по брендам, категориям и цене.",
};

export default function CatalogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={<Loading className="py-20" text="Загружаем каталог..." />}>
        <CatalogContent />
      </Suspense>
    </div>
  );
}
