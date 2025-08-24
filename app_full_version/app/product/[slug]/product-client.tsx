
"use client";

import { ShoppingCart, Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/lib/types";
import { useState } from "react";

interface ProductClientProps {
  product: Product;
}

export function ProductClient({ product }: ProductClientProps) {
  const [activeTab, setActiveTab] = useState("description");

  const handleAddToCart = () => {
    if (product.inStock) {
      // TODO: Implement real cart functionality
      alert('Товар добавлен в корзину!');
    }
  };

  const handleToggleWishlist = () => {
    // TODO: Implement real wishlist functionality  
    alert('Добавлено в избранное!');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.shortDescription || product.name,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Ссылка скопирована!');
    }
  };

  return (
    <>
      {/* Actions */}
      <div className="space-y-4">
        <div className="flex gap-4">
          <Button 
            size="lg" 
            className="flex-1 text-lg py-6"
            disabled={!product.inStock}
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            {product.inStock ? 'Добавить в корзину' : 'Нет в наличии'}
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={handleToggleWishlist}
          >
            <Heart className="w-5 h-5" />
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={handleShare}
          >
            <Share2 className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Product Details Tabs */}
      <Card className="mt-16">
        <CardContent className="p-8">
          <div className="w-full">
            <div className="grid w-full grid-cols-4 gap-1 bg-muted p-1 rounded-md">
              <Button
                variant={activeTab === "description" ? "default" : "ghost"}
                onClick={() => setActiveTab("description")}
                className="h-10"
              >
                Описание
              </Button>
              <Button
                variant={activeTab === "benefits" ? "default" : "ghost"}
                onClick={() => setActiveTab("benefits")}
                className="h-10"
              >
                Преимущества
              </Button>
              <Button
                variant={activeTab === "ingredients" ? "default" : "ghost"}
                onClick={() => setActiveTab("ingredients")}
                className="h-10"
              >
                Состав
              </Button>
              <Button
                variant={activeTab === "usage" ? "default" : "ghost"}
                onClick={() => setActiveTab("usage")}
                className="h-10"
              >
                Применение
              </Button>
            </div>
            
            {activeTab === "description" && (
              <div className="mt-8">
                <div className="prose max-w-none">
                  {product.description ? (
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {product.description}
                    </p>
                  ) : (
                    <p className="text-gray-500 italic">Подробное описание товара будет добавлено позже.</p>
                  )}
                </div>
              </div>
            )}
            
            {activeTab === "benefits" && (
              <div className="mt-8">
                {product.benefits && product.benefits.length > 0 ? (
                  <ul className="space-y-3">
                    {product.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-pink-500 rounded-full mt-2"></div>
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 italic">Информация о преимуществах будет добавлена позже.</p>
                )}
              </div>
            )}
            
            {activeTab === "ingredients" && (
              <div className="mt-8">
                {product.ingredients && product.ingredients.length > 0 ? (
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900">Ключевые ингредиенты:</h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {product.ingredients.map((ingredient, index) => (
                        <div key={index} className="bg-gray-50 p-3 rounded-lg">
                          <span className="text-gray-700">{ingredient}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500 italic">Информация о составе будет добавлена позже.</p>
                )}
              </div>
            )}
            
            {activeTab === "usage" && (
              <div className="mt-8">
                {product.usage ? (
                  <div className="bg-blue-50 p-6 rounded-xl">
                    <h3 className="font-semibold text-gray-900 mb-3">Способ применения:</h3>
                    <p className="text-gray-700 leading-relaxed">{product.usage}</p>
                  </div>
                ) : (
                  <p className="text-gray-500 italic">Инструкция по применению будет добавлена позже.</p>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
