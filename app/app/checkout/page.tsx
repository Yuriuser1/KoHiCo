
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CreditCard, Truck, Package, MapPin, Phone, Mail, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { StatusMessage } from "@/components/ui/status-message";
import toast from "react-hot-toast";

// Mock cart items
const mockCartItems = [
  {
    id: "1",
    name: "Sulwhasoo Essential Firming Cream",
    price: 1400,
    quantity: 1,
    volume: "15ml"
  },
  {
    id: "2", 
    name: "O HUI Day Shield Perfect Sun Black SPF 50+",
    price: 2900,
    quantity: 2,
    volume: "50ml"
  }
];

export default function CheckoutPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  
  const [formData, setFormData] = useState({
    // Customer info
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    
    // Delivery info
    deliveryMethod: "courier",
    address: "",
    city: "",
    postal: "",
    deliveryNotes: "",
    
    // Payment
    paymentMethod: "card",
    
    // Agreements
    termsAccepted: false,
    promotionsAccepted: false
  });

  const formatPrice = (price: number) => new Intl.NumberFormat('ru-RU').format(price);
  
  const subtotal = mockCartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryPrice = formData.deliveryMethod === "express" ? 800 : (subtotal > 3000 ? 0 : 300);
  const total = subtotal + deliveryPrice;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.termsAccepted) {
      toast.error("Необходимо согласиться с условиями соглашения");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate order processing
    setTimeout(() => {
      setOrderPlaced(true);
      setIsSubmitting(false);
      toast.success("Заказ успешно оформлен!");
    }, 2000);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="w-8 h-8 text-green-600" />
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Заказ успешно оформлен!</h1>
            <p className="text-gray-600 mb-6">
              Спасибо за ваш заказ. Мы отправили подтверждение на указанный email адрес.
            </p>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600">Номер заказа</p>
              <p className="text-lg font-bold text-gray-900">#KHC-{Date.now().toString().slice(-6)}</p>
            </div>
            
            <div className="space-y-4">
              <Button size="lg" asChild>
                <Link href="/orders">
                  Мои заказы
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/catalog">
                  Продолжить покупки
                </Link>
              </Button>
            </div>
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
            <Link href="/cart">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Вернуться в корзину
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Оформление заказа</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Order Form */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Customer Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Контактная информация
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Имя *</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Иван"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Фамилия *</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Петров"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="ivan@example.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Телефон *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+7 (900) 123-45-67"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Delivery Method */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Truck className="w-5 h-5 mr-2" />
                    Способ доставки
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={formData.deliveryMethod}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, deliveryMethod: value }))}
                  >
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="courier" id="courier" />
                      <Label htmlFor="courier" className="flex-1">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Курьерская доставка</p>
                            <p className="text-sm text-gray-600">1-2 дня, Москва</p>
                          </div>
                          <span className="font-semibold">
                            {subtotal > 3000 ? "Бесплатно" : "300 ₽"}
                          </span>
                        </div>
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="pickup" id="pickup" />
                      <Label htmlFor="pickup" className="flex-1">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Самовывоз</p>
                            <p className="text-sm text-gray-600">Пункты выдачи СДЭК</p>
                          </div>
                          <span className="font-semibold">
                            {subtotal > 3000 ? "Бесплатно" : "от 200 ₽"}
                          </span>
                        </div>
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="express" id="express" />
                      <Label htmlFor="express" className="flex-1">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Экспресс-доставка</p>
                            <p className="text-sm text-gray-600">В день заказа, Москва</p>
                          </div>
                          <span className="font-semibold">800 ₽</span>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Delivery Address */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    Адрес доставки
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">Город *</Label>
                      <Input
                        id="city"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Москва"
                      />
                    </div>
                    <div>
                      <Label htmlFor="postal">Индекс</Label>
                      <Input
                        id="postal"
                        name="postal"
                        value={formData.postal}
                        onChange={handleInputChange}
                        placeholder="123456"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="address">Адрес *</Label>
                    <Input
                      id="address"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Улица, дом, квартира"
                    />
                  </div>
                  <div>
                    <Label htmlFor="deliveryNotes">Комментарий к заказу</Label>
                    <Textarea
                      id="deliveryNotes"
                      name="deliveryNotes"
                      value={formData.deliveryNotes}
                      onChange={handleInputChange}
                      placeholder="Дополнительная информация для курьера..."
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Способ оплаты
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={formData.paymentMethod}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, paymentMethod: value }))}
                  >
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex-1">
                        <div className="flex items-center">
                          <CreditCard className="w-5 h-5 mr-3 text-blue-600" />
                          <div>
                            <p className="font-medium">Банковской картой</p>
                            <p className="text-sm text-gray-600">Visa, MasterCard, МИР</p>
                          </div>
                        </div>
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="cash" id="cash" />
                      <Label htmlFor="cash" className="flex-1">
                        <div className="flex items-center">
                          <Package className="w-5 h-5 mr-3 text-green-600" />
                          <div>
                            <p className="font-medium">При получении</p>
                            <p className="text-sm text-gray-600">Наличными или картой курьеру</p>
                          </div>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Agreements */}
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="termsAccepted"
                      name="termsAccepted"
                      checked={formData.termsAccepted}
                      onCheckedChange={(checked) => 
                        setFormData(prev => ({ ...prev, termsAccepted: checked as boolean }))
                      }
                      className="mt-1"
                    />
                    <Label htmlFor="termsAccepted" className="text-sm">
                      Я соглашаюсь с{" "}
                      <Link href="/terms" className="text-pink-600 hover:underline">
                        пользовательским соглашением
                      </Link>{" "}
                      и даю согласие на обработку персональных данных *
                    </Label>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="promotionsAccepted"
                      name="promotionsAccepted"
                      checked={formData.promotionsAccepted}
                      onCheckedChange={(checked) => 
                        setFormData(prev => ({ ...prev, promotionsAccepted: checked as boolean }))
                      }
                      className="mt-1"
                    />
                    <Label htmlFor="promotionsAccepted" className="text-sm">
                      Я хочу получать информацию о новинках и специальных предложениях
                    </Label>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle>Ваш заказ</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  
                  {/* Order Items */}
                  <div className="space-y-3">
                    {mockCartItems.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 line-clamp-2">{item.name}</p>
                          <p className="text-gray-500">{item.volume} × {item.quantity}</p>
                        </div>
                        <span className="font-semibold ml-4">
                          {formatPrice(item.price * item.quantity)} ₽
                        </span>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Price Breakdown */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Товары</span>
                      <span>{formatPrice(subtotal)} ₽</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Доставка</span>
                      <span>
                        {deliveryPrice === 0 ? "Бесплатно" : `${formatPrice(deliveryPrice)} ₽`}
                      </span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between font-bold text-lg">
                    <span>Итого</span>
                    <span>{formatPrice(total)} ₽</span>
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Оформляем заказ...
                      </>
                    ) : (
                      "Оформить заказ"
                    )}
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    Нажимая кнопку, вы подтверждаете заказ и соглашаетесь с условиями
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
