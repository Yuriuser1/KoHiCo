
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingCart, Star, Sparkles } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Product } from "@/lib/types";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (productId: string) => void;
  onToggleWishlist?: (productId: string) => void;
  isInWishlist?: boolean;
}

export function ProductCard({ 
  product, 
  onAddToCart, 
  onToggleWishlist, 
  isInWishlist = false 
}: ProductCardProps) {
  const [imageError, setImageError] = useState(false);
  
  const primaryImage = product.images?.find(img => img.isPrimary) || product.images?.[0];
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU').format(price);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart?.(product.id);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleWishlist?.(product.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -8 }}
    >
      <Link href={`/product/${product.slug}`}>
        <Card className="group h-full overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-white">
          <div className="relative aspect-square overflow-hidden bg-gray-50">
            {/* Изображение товара */}
            {primaryImage && !imageError ? (
              <div className="relative w-full h-full">
                <Image
                  src={primaryImage.url}
                  alt={primaryImage.alt || product.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={() => setImageError(true)}
                />
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <div className="text-center text-gray-500">
                  <div className="w-16 h-16 mx-auto mb-2 bg-gray-200 rounded-full flex items-center justify-center">
                    <ShoppingCart className="w-8 h-8" />
                  </div>
                  <p className="text-sm">Фото товара</p>
                </div>
              </div>
            )}

            {/* Бейджи */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {product.isPromo && (
                <Badge variant="destructive" className="text-xs font-medium">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Акция
                </Badge>
              )}
              {product.isFeatured && (
                <Badge variant="secondary" className="text-xs font-medium">
                  <Star className="w-3 h-3 mr-1" />
                  Хит
                </Badge>
              )}
              {!product.inStock && (
                <Badge variant="outline" className="text-xs font-medium bg-white">
                  Нет в наличии
                </Badge>
              )}
            </div>

            {/* Кнопка избранного */}
            <button
              onClick={handleToggleWishlist}
              className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
              aria-label="Добавить в избранное"
            >
              <Heart 
                className={`w-4 h-4 transition-colors ${
                  isInWishlist ? 'fill-red-500 text-red-500' : 'text-gray-600 hover:text-red-500'
                }`} 
              />
            </button>

            {/* Кнопка быстрого добавления в корзину */}
            {product.inStock && (
              <Button
                size="sm"
                onClick={handleAddToCart}
                className="absolute bottom-3 left-1/2 transform -translate-x-1/2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                В корзину
              </Button>
            )}
          </div>

          <CardContent className="p-4">
            {/* Бренд */}
            {product.brand && (
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                {product.brand.name}
              </p>
            )}

            {/* Название */}
            <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2 group-hover:text-pink-600 transition-colors">
              {product.name}
            </h3>

            {/* Краткое описание */}
            {product.shortDescription && (
              <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                {product.shortDescription}
              </p>
            )}

            {/* Объем */}
            {product.volume && (
              <p className="text-xs text-gray-500 mb-2">
                Объем: {product.volume}
              </p>
            )}

            {/* Промо текст */}
            {product.isPromo && product.promoText && (
              <p className="text-xs text-pink-600 font-medium mb-2">
                {product.promoText}
              </p>
            )}

            {/* Цена */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-lg font-bold text-gray-900">
                  {formatPrice(product.price)} ₽
                </span>
              </div>
              
              {product.inStock ? (
                <Badge variant="secondary" className="text-xs">
                  В наличии
                </Badge>
              ) : (
                <Badge variant="outline" className="text-xs">
                  Нет в наличии
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
