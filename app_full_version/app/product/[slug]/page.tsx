
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ShoppingCart, Star, Shield, Truck, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { prisma } from "@/lib/db";
import { ProductClient } from "./product-client";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

async function getProduct(slug: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        brand: true,
        category: true,
        images: {
          orderBy: [
            { isPrimary: 'desc' },
            { createdAt: 'asc' }
          ]
        }
      }
    });

    return product;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

async function getRelatedProducts(categoryId: string, currentProductId: string) {
  try {
    return await prisma.product.findMany({
      where: {
        categoryId,
        id: { not: currentProductId },
        inStock: true
      },
      include: {
        brand: true,
        images: true
      },
      take: 4,
      orderBy: { createdAt: 'desc' }
    });
  } catch (error) {
    console.error('Error fetching related products:', error);
    return [];
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product.categoryId, product.id);
  const formatPrice = (price: number) => new Intl.NumberFormat('ru-RU').format(price);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-pink-600">Главная</Link>
          <span>/</span>
          <Link href="/catalog" className="hover:text-pink-600">Каталог</Link>
          <span>/</span>
          <Link href={`/catalog?category=${product.category?.slug}`} className="hover:text-pink-600">
            {product.category?.name}
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">{product.name}</span>
        </div>

        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/catalog">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Назад к каталогу
          </Link>
        </Button>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-2xl shadow-lg overflow-hidden">
              {product.images?.[0] ? (
                <Image
                  src={product.images[0].url}
                  alt={product.images[0].alt || product.name}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <ShoppingCart className="w-16 h-16 text-gray-400" />
                </div>
              )}
            </div>
            
            {/* Thumbnail Images */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.slice(1, 5).map((image, index) => (
                  <div key={image.id} className="aspect-square bg-white rounded-lg shadow-md overflow-hidden">
                    <Image
                      src={image.url}
                      alt={image.alt || `${product.name} - фото ${index + 2}`}
                      width={150}
                      height={150}
                      className="w-full h-full object-cover hover:scale-110 transition-transform cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            
            {/* Brand & Title */}
            <div>
              {product.brand && (
                <p className="text-sm text-pink-600 font-medium uppercase tracking-wide mb-2">
                  {product.brand.name}
                </p>
              )}
              <h1 className="text-3xl font-bold text-gray-900 leading-tight">{product.name}</h1>
              {product.shortDescription && (
                <p className="text-lg text-gray-600 mt-2">{product.shortDescription}</p>
              )}
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {product.isPromo && (
                <Badge variant="destructive">
                  <Star className="w-3 h-3 mr-1" />
                  Акция
                </Badge>
              )}
              {product.isFeatured && (
                <Badge variant="secondary">
                  Рекомендуем
                </Badge>
              )}
              {product.inStock ? (
                <Badge variant="default" className="bg-green-100 text-green-700 hover:bg-green-200">
                  В наличии
                </Badge>
              ) : (
                <Badge variant="outline">
                  Нет в наличии
                </Badge>
              )}
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-bold text-gray-900">
                  {formatPrice(product.price)} ₽
                </span>
                {product.volume && (
                  <span className="text-gray-500">
                    за {product.volume}
                  </span>
                )}
              </div>
              {product.isPromo && product.promoText && (
                <p className="text-pink-600 font-medium">{product.promoText}</p>
              )}
            </div>

            {/* Client Component for Actions and Tabs */}
            <ProductClient product={product} />

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
              <div className="text-center">
                <Shield className="w-6 h-6 mx-auto text-green-600 mb-2" />
                <p className="text-xs text-gray-600">100% оригинал</p>
              </div>
              <div className="text-center">
                <Truck className="w-6 h-6 mx-auto text-blue-600 mb-2" />
                <p className="text-xs text-gray-600">Быстрая доставка</p>
              </div>
              <div className="text-center">
                <RotateCcw className="w-6 h-6 mx-auto text-purple-600 mb-2" />
                <p className="text-xs text-gray-600">Возврат 14 дней</p>
              </div>
            </div>
          </div>
        </div>



        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Похожие товары</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => {
                const primaryImage = relatedProduct.images?.find(img => img.isPrimary) || relatedProduct.images?.[0];
                return (
                  <Link key={relatedProduct.id} href={`/product/${relatedProduct.slug}`}>
                    <Card className="group hover:shadow-lg transition-shadow">
                      <CardContent className="p-4">
                        <div className="aspect-square bg-gray-50 rounded-lg mb-3 overflow-hidden">
                          {primaryImage ? (
                            <Image
                              src={primaryImage.url}
                              alt={relatedProduct.name}
                              width={200}
                              height={200}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <ShoppingCart className="w-8 h-8 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2 group-hover:text-pink-600">
                          {relatedProduct.name}
                        </h3>
                        <p className="text-lg font-bold text-gray-900">
                          {formatPrice(relatedProduct.price)} ₽
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: ProductPageProps) {
  const product = await getProduct(params.slug);
  
  if (!product) {
    return {
      title: "Товар не найден - KoHiCo"
    };
  }

  const primaryImage = product.images?.find(img => img.isPrimary)?.url || product.images?.[0]?.url;

  return {
    title: `${product.name} - ${product.brand?.name || 'KoHiCo'}`,
    description: product.shortDescription || product.description || `Купить ${product.name} в интернет-магазине KoHiCo. Премиальная корейская косметика с доставкой по России.`,
    openGraph: {
      title: product.name,
      description: product.shortDescription || product.description,
      images: primaryImage ? [{ url: primaryImage, alt: product.name }] : [],
    },
  };
}
