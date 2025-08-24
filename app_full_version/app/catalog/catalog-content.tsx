
"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, Filter, SlidersHorizontal, Grid3X3, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/product-card";
import { Loading } from "@/components/ui/loading";
import { StatusMessage } from "@/components/ui/status-message";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Product, Category, Brand } from "@/lib/types";
import toast from "react-hot-toast";

interface CatalogData {
  products: Product[];
  categories: Category[];
  brands: Brand[];
  total: number;
}

export function CatalogContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [data, setData] = useState<CatalogData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  
  // Фильтры
  const [searchQuery, setSearchQuery] = useState(searchParams?.get("search") || "");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams?.get("category")?.split(",").filter(Boolean) || []
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>(
    searchParams?.get("brand")?.split(",").filter(Boolean) || []
  );
  const [priceRange, setPriceRange] = useState({
    min: searchParams?.get("minPrice") ? parseInt(searchParams.get("minPrice")!) : 0,
    max: searchParams?.get("maxPrice") ? parseInt(searchParams.get("maxPrice")!) : 10000,
  });
  const [sortBy, setSortBy] = useState(searchParams?.get("sort") || "newest");
  const [inStockOnly, setInStockOnly] = useState(searchParams?.get("inStock") === "true");
  const [promoOnly, setPromoOnly] = useState(searchParams?.get("promo") === "true");

  // Обновляем URL с параметрами фильтрации
  const updateURL = useCallback(() => {
    const params = new URLSearchParams();
    
    if (searchQuery) params.set("search", searchQuery);
    if (selectedCategories.length) params.set("category", selectedCategories.join(","));
    if (selectedBrands.length) params.set("brand", selectedBrands.join(","));
    if (priceRange.min > 0) params.set("minPrice", priceRange.min.toString());
    if (priceRange.max < 10000) params.set("maxPrice", priceRange.max.toString());
    if (sortBy !== "newest") params.set("sort", sortBy);
    if (inStockOnly) params.set("inStock", "true");
    if (promoOnly) params.set("promo", "true");

    const queryString = params.toString();
    const newURL = queryString ? `/catalog?${queryString}` : "/catalog";
    
    router.push(newURL, { scroll: false });
  }, [searchQuery, selectedCategories, selectedBrands, priceRange, sortBy, inStockOnly, promoOnly, router]);

  // Загружаем данные с сервера
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams();
      if (searchQuery) params.set("search", searchQuery);
      if (selectedCategories.length) params.set("category", selectedCategories.join(","));
      if (selectedBrands.length) params.set("brand", selectedBrands.join(","));
      if (priceRange.min > 0) params.set("minPrice", priceRange.min.toString());
      if (priceRange.max < 10000) params.set("maxPrice", priceRange.max.toString());
      if (sortBy) params.set("sort", sortBy);
      if (inStockOnly) params.set("inStock", "true");
      if (promoOnly) params.set("promo", "true");

      const response = await fetch(`/api/products?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error("Ошибка загрузки данных");
      }

      const result = await response.json();
      setData(result);
    } catch (error: any) {
      console.error("Error fetching catalog data:", error);
      setError(error.message || "Произошла ошибка при загрузке каталога");
    } finally {
      setLoading(false);
    }
  }, [searchQuery, selectedCategories, selectedBrands, priceRange, sortBy, inStockOnly, promoOnly]);

  // Обработчики фильтров
  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories(prev => [...prev, categoryId]);
    } else {
      setSelectedCategories(prev => prev.filter(id => id !== categoryId));
    }
  };

  const handleBrandChange = (brandId: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands(prev => [...prev, brandId]);
    } else {
      setSelectedBrands(prev => prev.filter(id => id !== brandId));
    }
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceRange({ min: 0, max: 10000 });
    setSortBy("newest");
    setInStockOnly(false);
    setPromoOnly(false);
  };

  const handleAddToCart = (productId: string) => {
    // TODO: Реализовать добавление в корзину
    toast.success("Товар добавлен в корзину!");
  };

  // Загружаем данные при изменении фильтров
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Обновляем URL при изменении фильтров
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      updateURL();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [updateURL]);

  // Фильтры компонент
  const FiltersContent = () => (
    <div className="space-y-6">
      <div>
        <Label htmlFor="search" className="text-base font-semibold">Поиск</Label>
        <div className="mt-2 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="search"
            placeholder="Поиск товаров..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {data?.categories && data.categories.length > 0 && (
        <div>
          <Label className="text-base font-semibold">Категории</Label>
          <div className="mt-2 space-y-2">
            {data.categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category.id}`}
                  checked={selectedCategories.includes(category.slug)}
                  onCheckedChange={(checked) => 
                    handleCategoryChange(category.slug, checked as boolean)
                  }
                />
                <Label 
                  htmlFor={`category-${category.id}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {category.name}
                </Label>
              </div>
            ))}
          </div>
        </div>
      )}

      {data?.brands && data.brands.length > 0 && (
        <div>
          <Label className="text-base font-semibold">Бренды</Label>
          <div className="mt-2 space-y-2">
            {data.brands.map((brand) => (
              <div key={brand.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`brand-${brand.id}`}
                  checked={selectedBrands.includes(brand.slug)}
                  onCheckedChange={(checked) => 
                    handleBrandChange(brand.slug, checked as boolean)
                  }
                />
                <Label 
                  htmlFor={`brand-${brand.id}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {brand.name}
                </Label>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <Label className="text-base font-semibold">Дополнительные фильтры</Label>
        <div className="mt-2 space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="inStock"
              checked={inStockOnly}
              onCheckedChange={(checked) => setInStockOnly(checked as boolean)}
            />
            <Label htmlFor="inStock" className="text-sm font-normal cursor-pointer">
              Только в наличии
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="promo"
              checked={promoOnly}
              onCheckedChange={(checked) => setPromoOnly(checked as boolean)}
            />
            <Label htmlFor="promo" className="text-sm font-normal cursor-pointer">
              Только акционные товары
            </Label>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t">
        <Button onClick={clearFilters} variant="outline" className="w-full">
          Сбросить фильтры
        </Button>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Loading className="py-20" text="Загружаем каталог..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StatusMessage
          type="error"
          title="Ошибка загрузки"
          message={error}
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Заголовок */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Каталог товаров</h1>
        <p className="text-gray-600">
          {data?.total ? `Найдено ${data.total} товаров` : "Товары не найдены"}
        </p>
      </div>

      <div className="lg:grid lg:grid-cols-4 lg:gap-8">
        {/* Фильтры - десктоп */}
        <div className="hidden lg:block">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center mb-4">
              <SlidersHorizontal className="w-5 h-5 mr-2" />
              <h2 className="text-lg font-semibold">Фильтры</h2>
            </div>
            <FiltersContent />
          </div>
        </div>

        <div className="lg:col-span-3">
          {/* Панель управления */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
            <div className="flex items-center gap-4">
              {/* Мобильные фильтры */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="lg:hidden">
                    <Filter className="w-4 h-4 mr-2" />
                    Фильтры
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                  <SheetHeader>
                    <SheetTitle>Фильтры</SheetTitle>
                    <SheetDescription>
                      Настройте параметры поиска товаров
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-6">
                    <FiltersContent />
                  </div>
                </SheetContent>
              </Sheet>

              {/* Активные фильтры */}
              <div className="flex flex-wrap gap-2">
                {selectedCategories.length > 0 && (
                  <Badge variant="secondary">
                    Категории: {selectedCategories.length}
                  </Badge>
                )}
                {selectedBrands.length > 0 && (
                  <Badge variant="secondary">
                    Бренды: {selectedBrands.length}
                  </Badge>
                )}
                {inStockOnly && <Badge variant="secondary">В наличии</Badge>}
                {promoOnly && <Badge variant="secondary">Акция</Badge>}
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Сортировка */}
              <div className="flex items-center gap-2">
                <Label htmlFor="sort" className="text-sm">Сортировка:</Label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]" id="sort">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Сначала новые</SelectItem>
                    <SelectItem value="price-asc">Цена: по возрастанию</SelectItem>
                    <SelectItem value="price-desc">Цена: по убыванию</SelectItem>
                    <SelectItem value="name">По названию</SelectItem>
                    <SelectItem value="featured">Рекомендуемые</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Переключатель вида */}
              <div className="flex border rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Товары */}
          {data?.products && data.products.length > 0 ? (
            <div className={`grid gap-6 ${
              viewMode === "grid" 
                ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" 
                : "grid-cols-1"
            }`}>
              {data.products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-500 mb-4">
                <Search className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-semibold">Товары не найдены</h3>
                <p className="text-sm">Попробуйте изменить параметры поиска или очистить фильтры</p>
              </div>
              <Button onClick={clearFilters} variant="outline">
                Сбросить фильтры
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
