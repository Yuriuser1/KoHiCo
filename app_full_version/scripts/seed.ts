
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

// Функция для создания slug из названия
function createSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-zA-Z0-9\u0400-\u04FF]/g, '-') // Поддержка кириллицы
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// Загружаем данные из JSON файла
const loadProductData = () => {
  const dataPath = path.join(process.cwd(), '..', '..', 'kohico_import_ready.json');
  const jsonData = fs.readFileSync(dataPath, 'utf8');
  return JSON.parse(jsonData);
};

// Маппинг изображений для брендов и товаров (из asset_retrieval_subtask)
const brandLogos: Record<string, string> = {
  'sulwhasoo': 'https://koreainthebox.com/cdn/shop/collections/sulwhasoo_logo_001.jpg?v=1615860756',
  'the-history-of-whoo': 'https://www.lmching.com/cdn/shop/collections/the-history-of-whoo-lmching-group-limited_bdf29c70-86ba-4fd8-916f-ae3f1d45d895.jpg?v=1704259352',
  'boncho': 'https://petit-ra.com/wp-content/uploads/2022/03/%EB%B3%B8%EC%B4%88%ED%99%94%EB%B0%A9-%EC%98%A5%EC%9A%A9%EC%82%B0-30.jpg',
  'rejuran': 'https://rejuranusa.com/cdn/shop/files/nutritive-cream-1_1200x.png?v=1728428730',
  'o-hui': 'https://coscorea.com/cdn/shop/files/OHui_DayShieldSunquid50mlSpecialSet_1_1024x1024.jpg?v=1716357560'
};

const productImages: Record<string, string[]> = {
  // Sulwhasoo Essential Firming Cream
  'kohico-004': [
    'https://i.ebayimg.com/images/g/3~QAAOSw6fNjLTq3/s-l1200.jpg',
    'https://i.ebayimg.com/images/g/SUMAAOSwQCFi1lbB/s-l1200.jpg',
    'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg2pwi3jstYhpOq0gbzsqa9GNb6vmfnMKyNRx0ExpdYLneh5m9HEvkAOk2wueIJGh5eOlENqN5NrSi05lGQlEY8WS6xyskRwwjDoTTprifCh9IStHJv7k6lguDSid2U8FO-5xjVhe3jKWau/s1600/sulwhasoo-malaysia3.jpg'
  ],
  // Sulwhasoo First Care Activating Serum
  'kohico-005': [
    'https://m.media-amazon.com/images/I/51Tslvymk9L._UF1000,1000_QL80_.jpg',
    'https://www.everydayemall.com/cdn/shop/files/activatingserum_1024x1024.png?v=1705508686',
    'https://media.allure.com/photos/602d883d021e74fe8c0ef954/4:3/w_2663,h_1997,c_limit/lede_AE.jpg'
  ],
  // Набор зубных паст
  'kohico-001': [
    'https://cdn.abacus.ai/images/0fdbbc02-c301-40c1-83c4-1ca4f03b4764.png',
    'https://i.ebayimg.com/images/g/HPEAAOSwXWRnWs8y/s-l500.jpg'
  ],
  // Солнцезащитный набор
  'kohico-002': [
    'https://cdn.abacus.ai/images/5b0bc925-dccf-4a53-940c-1a9c6bf6f743.png',
    'https://m.media-amazon.com/images/I/61wP6qwz6OL._UF1000,1000_QL80_.jpg'
  ],
  // O HUI Day Shield Perfect Sun Black SPF 50+
  'kohico-003': [
    'https://i.ebayimg.com/images/g/Ti4AAOSwUotiCyjb/s-l400.jpg',
    'https://ohuihouse.com/wp-content/uploads/2018/04/ohui-day-shield-perfect-sun-black-spf50-pa.jpg',
    'https://i.ebayimg.com/images/g/qUkAAOSwsz9kWtqg/s-l1200.jpg'
  ]
};

async function main() {
  console.log('🌱 Начинаем seed базы данных...');

  // Создаем админ аккаунт
  console.log('👤 Создаем админ аккаунт...');
  const hashedPassword = await bcrypt.hash('johndoe123', 12);
  
  const adminUser = await prisma.user.upsert({
    where: { email: 'john@doe.com' },
    update: {},
    create: {
      email: 'john@doe.com',
      password: hashedPassword,
      firstName: 'Администратор',
      lastName: 'Системы',
      name: 'Администратор Системы',
      isAdmin: true,
      phone: '+7 (900) 000-00-00'
    }
  });

  console.log(`✅ Администратор создан: ${adminUser.email}`);

  // Загружаем данные продуктов
  const data = loadProductData();
  
  // Создаем категории
  console.log('📁 Создаем категории...');
  const categoryMap = new Map();
  
  for (const category of data.categories) {
    const createdCategory = await prisma.category.upsert({
      where: { slug: category.id },
      update: {
        name: category.name,
        description: category.description
      },
      create: {
        name: category.name,
        slug: category.id,
        description: category.description
      }
    });
    
    categoryMap.set(category.id, createdCategory.id);
    console.log(`✅ Категория создана: ${category.name}`);
  }

  // Создаем бренды
  console.log('🏷️ Создаем бренды...');
  const brandMap = new Map();
  
  for (const brand of data.brands) {
    const createdBrand = await prisma.brand.upsert({
      where: { slug: brand.id },
      update: {
        name: brand.name,
        description: brand.description,
        country: brand.country,
        logoUrl: brandLogos[brand.id] || null
      },
      create: {
        name: brand.name,
        slug: brand.id,
        description: brand.description,
        country: brand.country,
        logoUrl: brandLogos[brand.id] || null
      }
    });
    
    brandMap.set(brand.id, createdBrand.id);
    console.log(`✅ Бренд создан: ${brand.name}`);
  }

  // Создаем товары
  console.log('🛍️ Создаем товары...');
  
  for (const product of data.products) {
    try {
      // Получаем ID категории и бренда
      const categoryId = categoryMap.get(product.category_id);
      const brandId = brandMap.get(product.brand_id);
      
      if (!categoryId || !brandId) {
        console.warn(`⚠️ Пропускаем товар ${product.name} - не найдена категория или бренд`);
        continue;
      }

      // Создаем товар
      const createdProduct = await prisma.product.upsert({
        where: { sku: product.sku },
        update: {
          name: product.name,
          slug: createSlug(product.name),
          shortDescription: product.short_description,
          description: product.description,
          price: product.price || 0,
          currency: product.currency,
          volume: product.volume,
          inStock: product.in_stock,
          isFeatured: product.is_featured,
          isPromo: product.is_promo,
          promoText: product.promo_text,
          benefits: product.benefits || [],
          ingredients: product.ingredients || [],
          usage: product.usage,
          tags: product.tags || [],
          categoryId: categoryId,
          brandId: brandId,
          telegramPostId: product.telegram_post_id
        },
        create: {
          sku: product.sku,
          name: product.name,
          slug: createSlug(product.name),
          shortDescription: product.short_description,
          description: product.description,
          price: product.price || 0,
          currency: product.currency,
          volume: product.volume,
          inStock: product.in_stock,
          isFeatured: product.is_featured,
          isPromo: product.is_promo,
          promoText: product.promo_text,
          benefits: product.benefits || [],
          ingredients: product.ingredients || [],
          usage: product.usage,
          tags: product.tags || [],
          categoryId: categoryId,
          brandId: brandId,
          telegramPostId: product.telegram_post_id
        }
      });

      console.log(`✅ Товар создан: ${product.name}`);

      // Добавляем изображения из JSON
      if (product.images && product.images.length > 0) {
        for (let i = 0; i < product.images.length; i++) {
          await prisma.productImage.create({
            data: {
              url: product.images[i],
              alt: `${product.name} - изображение ${i + 1}`,
              isPrimary: i === 0,
              productId: createdProduct.id
            }
          });
        }
      }

      // Добавляем дополнительные изображения из нашего маппинга
      if (productImages[product.id]) {
        const existingImagesCount = product.images?.length || 0;
        
        for (let i = 0; i < productImages[product.id].length; i++) {
          await prisma.productImage.create({
            data: {
              url: productImages[product.id][i],
              alt: `${product.name} - фото ${existingImagesCount + i + 1}`,
              isPrimary: existingImagesCount === 0 && i === 0,
              productId: createdProduct.id
            }
          });
        }
      }

    } catch (error) {
      console.error(`❌ Ошибка при создании товара ${product.name}:`, error);
    }
  }

  // Создаем дополнительные товары из original JSON
  console.log('🛍️ Добавляем дополнительные товары...');
  
  // Загружаем оригинальные данные для дополнительных товаров
  const originalDataPath = path.join(process.cwd(), '..', '..', 'kohico_products_updated.json');
  const originalJsonData = fs.readFileSync(originalDataPath, 'utf8');
  const originalData = JSON.parse(originalJsonData);

  // Находим товары, которые есть в original, но нет в import_ready
  const importReadyIds = new Set(data.products.map((p: any) => p.telegram_post_id || p.id.toString()));
  const additionalProducts = originalData.products.filter((p: any) => 
    !importReadyIds.has(p.message_id) && !importReadyIds.has(p.id.toString())
  );

  for (const product of additionalProducts.slice(0, 10)) { // Берем первые 10 дополнительных товаров
    try {
      // Определяем категорию и бренд
      let categorySlug = 'skincare';
      if (product.category === 'Oral Care') categorySlug = 'oral-care';
      if (product.category === 'Hair Care') categorySlug = 'hair-care';
      if (product.category === 'Face Masks') categorySlug = 'face-masks';

      let brandSlug = 'unknown';
      if (product.brand && product.brand !== 'Unknown') {
        brandSlug = createSlug(product.brand);
      }

      const categoryId = categoryMap.get(categorySlug);
      const brandId = brandMap.get(brandSlug) || brandMap.get('sulwhasoo'); // Fallback к Sulwhasoo

      if (!categoryId || !brandId) continue;

      const createdProduct = await prisma.product.create({
        data: {
          sku: `KHC-EXTRA-${product.id.toString().padStart(3, '0')}`,
          name: product.product_name.substring(0, 100), // Обрезаем длинные названия
          slug: createSlug(product.product_name + '-' + product.id),
          shortDescription: product.description?.substring(0, 200),
          description: product.description,
          price: product.price || 1000,
          currency: product.currency || 'RUB',
          volume: product.volume,
          inStock: true,
          isFeatured: false,
          isPromo: product.is_promo || false,
          benefits: [],
          ingredients: [],
          tags: product.product_types || [],
          categoryId: categoryId,
          brandId: brandId,
          telegramPostId: product.message_id
        }
      });

      // Добавляем изображения
      if (product.images && product.images.length > 0) {
        for (let i = 0; i < product.images.length; i++) {
          await prisma.productImage.create({
            data: {
              url: product.images[i],
              alt: `${product.product_name} - изображение ${i + 1}`,
              isPrimary: i === 0,
              productId: createdProduct.id
            }
          });
        }
      }

      console.log(`✅ Дополнительный товар создан: ${product.product_name.substring(0, 50)}...`);

    } catch (error) {
      console.error(`❌ Ошибка при создании дополнительного товара:`, error);
    }
  }

  console.log('🎉 Seed завершен успешно!');
}

main()
  .catch((e) => {
    console.error('❌ Ошибка seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
