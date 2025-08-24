
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, Shield, Truck, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ProductCard } from "@/components/product-card";
import { prisma } from "@/lib/db";

async function getFeaturedProducts() {
  try {
    return await prisma.product.findMany({
      where: {
        isFeatured: true,
        inStock: true
      },
      include: {
        brand: true,
        category: true,
        images: true
      },
      take: 8,
      orderBy: {
        createdAt: 'desc'
      }
    });
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }
}

async function getCategories() {
  try {
    return await prisma.category.findMany({
      include: {
        _count: {
          select: { products: true }
        }
      },
      orderBy: {
        name: 'asc'
      }
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

async function getBrands() {
  try {
    return await prisma.brand.findMany({
      include: {
        _count: {
          select: { products: true }
        }
      },
      orderBy: {
        name: 'asc'
      }
    });
  } catch (error) {
    console.error('Error fetching brands:', error);
    return [];
  }
}

export default async function HomePage() {
  const [featuredProducts, categories, brands] = await Promise.all([
    getFeaturedProducts(),
    getCategories(),
    getBrands()
  ]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-pink-50 via-white to-rose-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="w-fit">
                  <Star className="w-4 h-4 mr-2" />
                  Официальный партнер K-Beauty брендов
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Премиальная
                  <span className="text-pink-600"> корейская</span>
                  <br />
                  косметика
                </h1>
                <p className="text-xl text-gray-600 max-w-md">
                  Откройте секреты корейского ухода за кожей с продукцией от ведущих K-Beauty брендов
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="text-lg px-8">
                  <Link href="/catalog">
                    Смотреть каталог
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="text-lg px-8">
                  <Link href="/brands">
                    Изучить бренды
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square max-w-lg mx-auto relative">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full blur-3xl opacity-20"></div>
                <div className="relative bg-white rounded-3xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <div className="grid grid-cols-2 gap-6">
                    {featuredProducts.slice(0, 4).map((product, index) => {
                      const primaryImage = product.images?.find(img => img.isPrimary) || product.images?.[0];
                      return (
                        <div key={product.id} className="text-center space-y-2">
                          <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden">
                            {primaryImage ? (
                              <Image
                                src={primaryImage.url}
                                alt={product.name}
                                width={120}
                                height={120}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-400">
                                <Shield className="w-8 h-8" />
                              </div>
                            )}
                          </div>
                          <p className="text-sm font-medium text-gray-900 truncate">{product.brand?.name}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Преимущества */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto">
                <Shield className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="font-semibold text-gray-900">100% Оригинал</h3>
              <p className="text-gray-600 text-sm">Только подлинные товары от официальных поставщиков</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto">
                <Truck className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Быстрая доставка</h3>
              <p className="text-gray-600 text-sm">Доставка по всей России от 1 дня</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto">
                <Award className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Премиум качество</h3>
              <p className="text-gray-600 text-sm">Люксовые корейские бренды высшего класса</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto">
                <Star className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Экспертная поддержка</h3>
              <p className="text-gray-600 text-sm">Консультации по подбору уходовых средств</p>
            </div>
          </div>
        </div>
      </section>

      {/* Рекомендуемые товары */}
      {featuredProducts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Рекомендуемые товары</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Лучшие продукты корейской косметики, отобранные нашими экспертами
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button size="lg" variant="outline" asChild>
                <Link href="/catalog">
                  Смотреть все товары
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Категории */}
      {categories.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Категории товаров</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Выберите нужную категорию для поиска идеальных средств ухода
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                <Link key={category.id} href={`/catalog?category=${category.slug}`}>
                  <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                    <CardContent className="p-6 text-center space-y-4">
                      <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${
                        index % 4 === 0 ? 'bg-pink-100' :
                        index % 4 === 1 ? 'bg-blue-100' :
                        index % 4 === 2 ? 'bg-green-100' : 'bg-purple-100'
                      }`}>
                        <div className={`w-8 h-8 rounded-full ${
                          index % 4 === 0 ? 'bg-pink-600' :
                          index % 4 === 1 ? 'bg-blue-600' :
                          index % 4 === 2 ? 'bg-green-600' : 'bg-purple-600'
                        }`}></div>
                      </div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-pink-600 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {category.description}
                      </p>
                      <Badge variant="secondary">
                        {category._count.products} товаров
                      </Badge>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Бренды */}
      {brands.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Наши бренды</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Ведущие корейские бренды премиум-класса в нашем каталоге
              </p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
              {brands.map((brand) => (
                <Link key={brand.id} href={`/catalog?brand=${brand.slug}`}>
                  <Card className="group hover:shadow-lg transition-all duration-300 aspect-square">
                    <CardContent className="p-6 h-full flex flex-col items-center justify-center text-center space-y-3">
                      <div className="w-16 h-16 bg-white rounded-full shadow-md flex items-center justify-center overflow-hidden">
                        {brand.logoUrl ? (
                          <Image
                            src={brand.logoUrl}
                            alt={brand.name}
                            width={48}
                            height={48}
                            className="w-12 h-12 object-contain"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-gray-600 font-bold text-xs">
                              {brand.name.substring(0, 2).toUpperCase()}
                            </span>
                          </div>
                        )}
                      </div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-pink-600 transition-colors text-sm">
                        {brand.name}
                      </h3>
                      <Badge variant="outline" className="text-xs">
                        {brand._count.products} товаров
                      </Badge>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-pink-600 to-rose-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white">
              Готовы начать путешествие в мир K-Beauty?
            </h2>
            <p className="text-pink-100 text-lg max-w-2xl mx-auto">
              Откройте для себя секреты корейского ухода за кожей с нашими премиальными продуктами
            </p>
            <Button size="lg" variant="secondary" asChild className="text-lg px-8">
              <Link href="/catalog">
                Начать покупки
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
