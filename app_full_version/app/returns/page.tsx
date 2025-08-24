
import { RotateCcw, CheckCircle, XCircle, AlertTriangle, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
  title: "Возврат товара - KoHiCo",
  description: "Условия возврата товаров KoHiCo. Как вернуть товар, сроки возврата, требования к товару.",
};

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <RotateCcw className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Возврат товара</h1>
          <p className="text-lg text-gray-600">
            Мы заботимся о ваших правах как покупателя и обеспечиваем простую процедуру возврата
          </p>
        </div>

        {/* Return Policy Summary */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-8 mb-12 text-center">
          <h2 className="text-2xl font-bold mb-4">14 дней на возврат</h2>
          <p className="text-blue-100">
            Вы можете вернуть товар в течение 14 дней с момента получения при соблюдении условий
          </p>
        </div>

        {/* What Can Be Returned */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Что можно вернуть</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-green-700">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Можно вернуть
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Запечатанные товары в оригинальной упаковке</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Товары, не подходящие по размеру/объему</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Неиспользованные наборы</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Товары с браком или повреждениями</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-red-700">
                  <XCircle className="w-5 h-5 mr-2" />
                  Нельзя вернуть
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Вскрытые косметические средства</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Использованные товары</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Товары без оригинальной упаковки</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Товары с истекшим сроком годности</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Return Process */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Как вернуть товар</h2>
          
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-blue-600 font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Свяжитесь с нами</h3>
                    <p className="text-gray-600 mb-3">
                      Напишите нам на info@kohico.ru или позвоните по телефону +7 (900) 000-00-00. 
                      Укажите номер заказа и причину возврата.
                    </p>
                    <Badge variant="secondary">Срок: в течение 14 дней</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-blue-600 font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Получите инструкции</h3>
                    <p className="text-gray-600 mb-3">
                      Наш специалист свяжется с вами и предоставит подробные инструкции по возврату, 
                      а также адрес для отправки товара.
                    </p>
                    <Badge variant="secondary">Срок: в течение 24 часов</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-blue-600 font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Отправьте товар</h3>
                    <p className="text-gray-600 mb-3">
                      Упакуйте товар в оригинальную упаковку и отправьте по указанному адресу. 
                      Стоимость обратной доставки компенсируется при возврате по нашей вине.
                    </p>
                    <Badge variant="secondary">Отслеживаемая отправка</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-green-600 font-bold text-sm">4</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Получите возврат средств</h3>
                    <p className="text-gray-600 mb-3">
                      После получения и проверки товара мы вернем вам деньги на карту или счет, 
                      с которого была произведена оплата.
                    </p>
                    <Badge variant="secondary">Срок: 3-10 рабочих дней</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Refund Timeline */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Сроки возврата средств</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Банковская карта</h3>
                <p className="text-sm text-gray-600 mb-2">3-10 рабочих дней</p>
                <Badge variant="outline">Автоматически</Badge>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Банковский перевод</h3>
                <p className="text-sm text-gray-600 mb-2">1-3 рабочих дня</p>
                <Badge variant="outline">По реквизитам</Badge>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Электронные кошельки</h3>
                <p className="text-sm text-gray-600 mb-2">До 24 часов</p>
                <Badge variant="outline">При наличии</Badge>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Important Information */}
        <div className="mb-12">
          <Card className="bg-yellow-50 border-yellow-200">
            <CardHeader>
              <CardTitle className="flex items-center text-yellow-800">
                <AlertTriangle className="w-5 h-5 mr-2" />
                Важная информация
              </CardTitle>
            </CardHeader>
            <CardContent className="text-yellow-800">
              <ul className="space-y-2 text-sm">
                <li>• Товар должен быть в состоянии, пригодном для продажи</li>
                <li>• При возврате товара надлежащего качества доставка не компенсируется</li>
                <li>• Возврат производится на тот же способ оплаты, что использовался при покупке</li>
                <li>• Сохраняйте чек и упаковку до окончания срока возврата</li>
                <li>• При возврате по нашей вине все расходы компенсируются</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Contact for Returns */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Нужна помощь с возвратом?</h2>
          <p className="text-gray-600 mb-6">
            Наши специалисты готовы помочь вам с любыми вопросами по возврату товаров
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="/contact">
                Связаться с поддержкой
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="mailto:info@kohico.ru">
                Написать на email
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
