
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { prisma } from "@/lib/db";

async function getBrands() {
  try {
    return await prisma.brand.findMany({
      include: {
        _count: {
          select: { products: true }
        }
      },
      orderBy: { name: 'asc' }
    });
  } catch (error) {
    console.error('Error fetching brands:', error);
    return [];
  }
}

export const metadata = {
  title: "Бренды корейской косметики - KoHiCo",
  description: "Все бренды премиальной корейской косметики в нашем каталоге: Sulwhasoo, The History of Whoo, BonCho, Rejuran, O HUI и другие.",
};

export default async function BrandsPage() {
  const brands = await getBrands();

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Наши бренды</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Премиальные корейские бренды косметики, представленные в нашем каталоге. 
            Только оригинальные товары от официальных поставщиков.
          </p>
        </div>

        {/* Brands Grid */}
        {brands.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {brands.map((brand) => (
              <Link key={brand.id} href={`/catalog?brand=${brand.slug}`}>
                <Card className="group hover:shadow-xl transition-all duration-300 h-full">
                  <CardContent className="p-8 text-center h-full flex flex-col">
                    
                    {/* Logo */}
                    <div className="w-24 h-24 mx-auto mb-6 bg-white rounded-full shadow-lg flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform">
                      {brand.logoUrl ? (
                        <Image
                          src={brand.logoUrl}
                          alt={brand.name}
                          width={72}
                          height={72}
                          className="w-18 h-18 object-contain"
                        />
                      ) : (
                        <div className="w-18 h-18 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-gray-600 font-bold text-lg">
                            {brand.name.substring(0, 2).toUpperCase()}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Brand Info */}
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-pink-600 transition-colors">
                        {brand.name}
                      </h2>
                      
                      {brand.country && (
                        <p className="text-sm text-gray-500 mb-4">
                          {brand.country}
                        </p>
                      )}

                      {brand.description && (
                        <p className="text-gray-600 mb-4 leading-relaxed">
                          {brand.description}
                        </p>
                      )}
                    </div>

                    {/* Product Count */}
                    <div className="mt-auto pt-4">
                      <Badge variant="secondary" className="text-sm">
                        {brand._count.products} товаров
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">Бренды не найдены</p>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-20 bg-white rounded-2xl shadow-lg p-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Почему мы выбираем именно эти бренды?
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mt-8">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Премиальное качество</h3>
                <p className="text-gray-600 text-sm">
                  Каждый бренд в нашем каталоге — это гарантия высочайшего качества и инновационных формул
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Оригинальность</h3>
                <p className="text-gray-600 text-sm">
                  Мы работаем только с официальными поставщиками и гарантируем 100% подлинность товаров
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Проверенная эффективность</h3>
                <p className="text-gray-600 text-sm">
                  Все представленные бренды имеют многолетнюю историю и положительные отзывы по всему миру
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
