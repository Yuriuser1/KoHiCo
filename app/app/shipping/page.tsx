
import { Truck, Package, Clock, MapPin, CreditCard } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Доставка и оплата - KoHiCo",
  description: "Информация о доставке товаров KoHiCo по России. Способы доставки, сроки, стоимость и условия.",
};

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Доставка и оплата</h1>
          <p className="text-lg text-gray-600">
            Вся информация о способах доставки и оплаты ваших заказов
          </p>
        </div>

        {/* Free Shipping Banner */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-6 mb-12 text-center">
          <div className="flex items-center justify-center mb-2">
            <Truck className="w-6 h-6 mr-2" />
            <span className="text-xl font-semibold">Бесплатная доставка</span>
          </div>
          <p>при заказе от 3 000 рублей по всей России!</p>
        </div>

        {/* Delivery Methods */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Способы доставки</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Truck className="w-5 h-5 mr-2 text-blue-600" />
                  Курьерская доставка (Москва)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Стоимость:</span>
                  <span className="font-semibold">300 ₽</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Сроки:</span>
                  <span className="font-semibold">1-2 дня</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Время:</span>
                  <span className="font-semibold">10:00-21:00</span>
                </div>
                <Badge variant="secondary" className="w-fit">
                  Бесплатно от 3 000 ₽
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="w-5 h-5 mr-2 text-green-600" />
                  Почта России
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Стоимость:</span>
                  <span className="font-semibold">От 250 ₽</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Сроки:</span>
                  <span className="font-semibold">3-14 дней</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">География:</span>
                  <span className="font-semibold">Вся Россия</span>
                </div>
                <Badge variant="secondary" className="w-fit">
                  Бесплатно от 3 000 ₽
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-purple-600" />
                  СДЭК
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Стоимость:</span>
                  <span className="font-semibold">От 200 ₽</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Сроки:</span>
                  <span className="font-semibold">2-7 дней</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Пункты выдачи:</span>
                  <span className="font-semibold">5000+</span>
                </div>
                <Badge variant="secondary" className="w-fit">
                  Бесплатно от 3 000 ₽
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-orange-600" />
                  Экспресс-доставка (Москва)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Стоимость:</span>
                  <span className="font-semibold">800 ₽</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Сроки:</span>
                  <span className="font-semibold">В день заказа</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Время:</span>
                  <span className="font-semibold">12:00-21:00</span>
                </div>
                <Badge variant="destructive" className="w-fit">
                  При заказе до 15:00
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Способы оплаты</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Банковской картой</h3>
                <p className="text-sm text-gray-600">Visa, MasterCard, МИР</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">При получении</h3>
                <p className="text-sm text-gray-600">Наличными или картой</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-purple-600 font-bold">₽</div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Переводом</h3>
                <p className="text-sm text-gray-600">На карту Сбербанка</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Delivery Terms */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Условия доставки</h2>
          
          <Card>
            <CardContent className="p-8">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">📦 Упаковка</h3>
                  <p className="text-gray-600">
                    Все товары тщательно упаковываются в защитную пленку и картонную коробку. 
                    Хрупкие товары дополнительно защищаются воздушно-пузырчатой пленкой.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">🕒 Сроки обработки</h3>
                  <p className="text-gray-600">
                    Заказы обрабатываются в течение 1-2 рабочих дней с момента подтверждения оплаты. 
                    В период акций срок может увеличиваться до 3 рабочих дней.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">📍 Зона доставки</h3>
                  <p className="text-gray-600">
                    Мы доставляем заказы по всей территории Российской Федерации. 
                    Стоимость и сроки доставки зависят от удаленности региона.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">📞 Уведомления</h3>
                  <p className="text-gray-600">
                    О готовности заказа к отправке и номере для отслеживания мы уведомляем 
                    по email и SMS на указанный при оформлении номер телефона.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Important Notes */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 mb-4">⚠️ Важная информация</h3>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li>• При доставке обязательно проверяйте целостность упаковки</li>
            <li>• В случае повреждения товара при транспортировке составляется акт</li>
            <li>• Доставка в выходные и праздничные дни не осуществляется</li>
            <li>• Срок хранения заказа в пункте выдачи — 5 рабочих дней</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
