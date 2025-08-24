
import { Shield, Award, Truck, Heart, Star, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "О компании - KoHiCo",
  description: "KoHiCo - ведущий поставщик премиальной корейской косметики в России. Наша история, ценности и преимущества.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pink-50 to-rose-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            О компании <span className="text-pink-600">KoHiCo</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Мы — команда энтузиастов корейской красоты, которая делает премиальную K-beauty косметику 
            доступной для каждого в России. Наша миссия — помочь вам обрести уверенность через заботу о себе.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Our Story */}
        <div className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Наша история</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  KoHiCo была основана в 2023 году группой экспертов по корейской косметике, 
                  которые заметили растущий интерес к K-beauty продукции в России, но отсутствие 
                  надежных поставщиков оригинальных товаров.
                </p>
                <p>
                  Мы начали с небольшой коллекции товаров от ведущих корейских брендов и постепенно 
                  расширили наш ассортимент, всегда придерживаясь принципа: только оригинальные товары, 
                  только проверенные бренды, только лучшее обслуживание.
                </p>
                <p>
                  Сегодня KoHiCo — это не просто интернет-магазин, а сообщество людей, которые разделяют 
                  нашу страсть к корейской косметике и философии ухода за собой.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-pink-600 mb-2">2023</div>
                  <div className="text-sm text-gray-600">Год основания</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-pink-600 mb-2">5+</div>
                  <div className="text-sm text-gray-600">Премиальных брендов</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-pink-600 mb-2">26+</div>
                  <div className="text-sm text-gray-600">Товаров в каталоге</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-pink-600 mb-2">100%</div>
                  <div className="text-sm text-gray-600">Оригинальные товары</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Наши ценности</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Принципы, которыми мы руководствуемся в работе и которые делают KoHiCo особенным
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-pink-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Подлинность</h3>
                <p className="text-gray-600">
                  Мы гарантируем 100% оригинальность всех товаров и работаем только с проверенными поставщиками
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Качество</h3>
                <p className="text-gray-600">
                  В нашем каталоге представлены только премиальные бренды с безупречной репутацией
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Забота</h3>
                <p className="text-gray-600">
                  Каждый клиент для нас важен, мы обеспечиваем персональный подход и внимательное обслуживание
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Star className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Экспертность</h3>
                <p className="text-gray-600">
                  Наша команда — настоящие эксперты по корейской косметике, готовые поделиться знаниями
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Truck className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Надежность</h3>
                <p className="text-gray-600">
                  Быстрая и безопасная доставка, гарантия возврата, прозрачные условия сотрудничества
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-rose-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Сообщество</h3>
                <p className="text-gray-600">
                  Мы создаем сообщество людей, объединенных любовью к корейской философии ухода
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-gray-50 rounded-2xl p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Почему выбирают KoHiCo?</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-600 mb-2">Оригинальные товары</div>
              <p className="text-gray-600 text-sm">
                100% гарантия подлинности от официальных поставщиков
              </p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-600 mb-2">Быстрая доставка</div>
              <p className="text-gray-600 text-sm">
                Доставка по России от 1 дня, бережная упаковка
              </p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-600 mb-2">Экспертная поддержка</div>
              <p className="text-gray-600 text-sm">
                Консультации по подбору средств от наших экспертов
              </p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-600 mb-2">Удобный возврат</div>
              <p className="text-gray-600 text-sm">
                14 дней на возврат товара без лишних вопросов
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
