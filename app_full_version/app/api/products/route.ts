
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Параметры фильтрации
    const search = searchParams.get("search") || "";
    const categories = searchParams.get("category")?.split(",").filter(Boolean) || [];
    const brands = searchParams.get("brand")?.split(",").filter(Boolean) || [];
    const minPrice = parseInt(searchParams.get("minPrice") || "0");
    const maxPrice = parseInt(searchParams.get("maxPrice") || "999999");
    const sort = searchParams.get("sort") || "newest";
    const inStock = searchParams.get("inStock") === "true";
    const promo = searchParams.get("promo") === "true";
    
    // Строим условия фильтрации
    const whereConditions: any = {
      AND: []
    };

    if (search) {
      whereConditions.AND.push({
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
          { shortDescription: { contains: search, mode: 'insensitive' } },
          { brand: { name: { contains: search, mode: 'insensitive' } } }
        ]
      });
    }

    if (categories.length > 0) {
      whereConditions.AND.push({
        category: { slug: { in: categories } }
      });
    }

    if (brands.length > 0) {
      whereConditions.AND.push({
        brand: { slug: { in: brands } }
      });
    }

    if (minPrice > 0 || maxPrice < 999999) {
      whereConditions.AND.push({
        price: {
          gte: minPrice,
          lte: maxPrice
        }
      });
    }

    if (inStock) {
      whereConditions.AND.push({ inStock: true });
    }

    if (promo) {
      whereConditions.AND.push({ isPromo: true });
    }

    // Настройка сортировки
    let orderBy: any = { createdAt: 'desc' };
    
    switch (sort) {
      case 'price-asc':
        orderBy = { price: 'asc' };
        break;
      case 'price-desc':
        orderBy = { price: 'desc' };
        break;
      case 'name':
        orderBy = { name: 'asc' };
        break;
      case 'featured':
        orderBy = [{ isFeatured: 'desc' }, { createdAt: 'desc' }];
        break;
      default:
        orderBy = { createdAt: 'desc' };
    }

    // Получаем товары
    const products = await prisma.product.findMany({
      where: whereConditions.AND.length > 0 ? whereConditions : {},
      include: {
        brand: true,
        category: true,
        images: true
      },
      orderBy,
      take: 50 // Лимит товаров на страницу
    });

    // Получаем общее количество товаров
    const total = await prisma.product.count({
      where: whereConditions.AND.length > 0 ? whereConditions : {}
    });

    // Получаем категории и бренды для фильтров
    const [categories_list, brands_list] = await Promise.all([
      prisma.category.findMany({
        orderBy: { name: 'asc' }
      }),
      prisma.brand.findMany({
        orderBy: { name: 'asc' }
      })
    ]);

    return NextResponse.json({
      products,
      categories: categories_list,
      brands: brands_list,
      total
    });

  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Ошибка загрузки товаров" },
      { status: 500 }
    );
  }
}
