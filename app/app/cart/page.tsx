
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Plus, Minus, Trash2, ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

// Временная заглушка для корзины
const mockCartItems = [
  {
    id: "1",
    product: {
      id: "1",
      name: "Sulwhasoo Essential Firming Cream",
      slug: "sulwhasoo-essential-firming-cream",
      price: 1400,
      volume: "15ml",
      brand: { name: "Sulwhasoo" },
      images: [{ url: "https://i.ebayimg.com/images/g/3~QAAOSw6fNjLTq3/s-l1200.jpg", alt: "Sulwhasoo Cream", isPrimary: true }],
      inStock: true
    },
    quantity: 1
  },
  {
    id: "2", 
    product: {
      id: "2",
      name: "O HUI Day Shield Perfect Sun Black SPF 50+",
      slug: "o-hui-day-shield-perfect-sun-black-spf-50",
      price: 2900,
      volume: "50ml",
      brand: { name: "O HUI" },
      images: [{ url: "https://i.ebayimg.com/images/g/Ti4AAOSwUotiCyjb/s-l400.jpg", alt: "O HUI Sunscreen", isPrimary: true }],
      inStock: true
    },
    quantity: 2
  }
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(mockCartItems);
  const [promoCode, setPromoCode] = useState("");

  const formatPrice = (price: number) => new Intl.NumberFormat('ru-RU').format(price);

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(itemId);
      return;
    }
    
    setCartItems(items => 
      items.map(item => 
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (itemId: string) => {
    setCartItems(items => items.filter(item => item.id !== itemId));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shipping = subtotal > 3000 ? 0 : 300;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-12 h-12 text-gray-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Ваша корзина пуста</h1>
            <p className="text-gray-600">Добавьте товары из каталога, чтобы оформить заказ</p>
          </div>
          <div className="space-y-4">
            <Button size="lg" asChild>
              <Link href="/catalog">
                Перейти в каталог
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                На главную
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/catalog">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Продолжить покупки
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Корзина</h1>
          <p className="text-gray-600 mt-2">{cartItems.length} товаров в корзине</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    
                    {/* Product Image */}
                    <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      {item.product.images?.[0] ? (
                        <Image
                          src={item.product.images[0].url}
                          alt={item.product.images[0].alt || item.product.name}
                          width={96}
                          height={96}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ShoppingCart className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <Link
                            href={`/product/${item.product.slug}`}
                            className="font-semibold text-gray-900 hover:text-pink-600 transition-colors"
                          >
                            {item.product.name}
                          </Link>
                          {item.product.brand && (
                            <p className="text-sm text-gray-500">{item.product.brand.name}</p>
                          )}
                          {item.product.volume && (
                            <p className="text-xs text-gray-400">Объем: {item.product.volume}</p>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 p-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="flex justify-between items-end">
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 p-0"
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <Input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                            className="w-16 text-center"
                            min="1"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 p-0"
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                        
                        <div className="text-right">
                          <p className="font-bold text-lg">
                            {formatPrice(item.product.price * item.quantity)} ₽
                          </p>
                          <p className="text-sm text-gray-500">
                            {formatPrice(item.product.price)} ₽ за шт.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Итого по заказу</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                
                {/* Promo Code */}
                <div>
                  <div className="flex gap-2 mb-2">
                    <Input
                      placeholder="Промокод"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <Button 
                      variant="outline" 
                      onClick={() => alert('Промокод применён!')}
                    >
                      Применить
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Price Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Товары ({cartItems.length})</span>
                    <span>{formatPrice(subtotal)} ₽</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Доставка</span>
                    <span>
                      {shipping === 0 ? (
                        <Badge variant="secondary">Бесплатно</Badge>
                      ) : (
                        `${formatPrice(shipping)} ₽`
                      )}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-xs text-gray-500">
                      Бесплатная доставка при заказе от 3000 ₽
                    </p>
                  )}
                </div>

                <Separator />

                <div className="flex justify-between font-bold text-lg">
                  <span>К оплате</span>
                  <span>{formatPrice(total)} ₽</span>
                </div>

                <Button size="lg" className="w-full" asChild>
                  <Link href="/checkout">
                    Оформить заказ
                  </Link>
                </Button>

                <div className="text-center text-xs text-gray-500 space-y-1">
                  <p>Нажимая "Оформить заказ", вы соглашаетесь с условиями</p>
                  <div className="flex justify-center gap-4">
                    <Link href="/terms" className="text-pink-600 hover:underline">
                      Пользовательского соглашения
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
