
#!/bin/bash
# Скрипт упаковки проекта для деплоя на reg.ru

echo "📦 Создание пакета для деплоя KoHiCo..."

# Создание папки для деплоя
mkdir -p /home/ubuntu/kohico_shop/deploy_package

# Копирование готовой сборки Next.js
echo "🔄 Копирование сборки Next.js..."
cp -r app/.next/static deploy_package/
cp -r app/public deploy_package/

# Создание основных HTML страниц
echo "📄 Создание HTML страниц..."

# Главная страница
cat > deploy_package/index.html << 'EOF'
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <title>KoHiCo - Премиальная корейская косметика</title>
    <meta name="description" content="Официальный интернет-магазин премиальной корейской косметики. Sulwhasoo, The History of Whoo, BonCho, Rejuran, O HUI. Только оригинальные товары с доставкой по России."/>
    <link rel="canonical" href="https://www.kohico.ru"/>
    <link rel="stylesheet" href="/static/css/app/layout.css"/>
</head>
<body>
    <div id="__next">
        <header class="bg-white shadow-sm border-b sticky top-0 z-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-16">
                    <div class="flex items-center">
                        <h1 class="text-2xl font-bold text-pink-600">KoHiCo</h1>
                        <span class="ml-2 text-sm text-gray-500">Premium K-Beauty</span>
                    </div>
                    <nav class="hidden md:flex space-x-8">
                        <a href="/catalog" class="text-gray-700 hover:text-pink-600">Каталог</a>
                        <a href="/brands" class="text-gray-700 hover:text-pink-600">Бренды</a>
                        <a href="/about" class="text-gray-700 hover:text-pink-600">О нас</a>
                        <a href="/contact" class="text-gray-700 hover:text-pink-600">Контакты</a>
                    </nav>
                    <div class="flex items-center space-x-4">
                        <a href="/cart" class="text-gray-700 hover:text-pink-600">Корзина (0)</a>
                        <a href="/auth/signin" class="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700">Войти</a>
                    </div>
                </div>
            </div>
        </header>

        <main>
            <!-- Hero Section -->
            <section class="bg-gradient-to-r from-pink-50 to-purple-50 py-20">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="text-center">
                        <h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                            Премиальная <span class="text-pink-600">корейская косметика</span>
                        </h1>
                        <p class="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                            Откройте секреты K-Beauty с брендами Sulwhasoo, The History of Whoo, BonCho, Rejuran, O HUI. 
                            Только оригинальные товары с доставкой по всей России.
                        </p>
                        <div class="flex flex-col sm:flex-row gap-4 justify-center">
                            <a href="/catalog" class="bg-pink-600 text-white px-8 py-4 text-lg font-semibold rounded-lg hover:bg-pink-700">
                                Смотреть каталог
                            </a>
                            <a href="/brands" class="bg-white text-pink-600 px-8 py-4 text-lg font-semibold rounded-lg border-2 border-pink-600 hover:bg-pink-50">
                                Наши бренды
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Features -->
            <section class="py-20 bg-white">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 class="text-3xl font-bold text-center text-gray-900 mb-16">Почему выбирают KoHiCo</h2>
                    <div class="grid md:grid-cols-3 gap-8">
                        <div class="text-center">
                            <div class="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                ✓
                            </div>
                            <h3 class="text-xl font-semibold mb-4">100% оригинал</h3>
                            <p class="text-gray-600">Работаем только с официальными дистрибьюторами корейских брендов</p>
                        </div>
                        <div class="text-center">
                            <div class="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                🚚
                            </div>
                            <h3 class="text-xl font-semibold mb-4">Быстрая доставка</h3>
                            <p class="text-gray-600">Доставка по России через СДЭК, Почту России и курьерские службы</p>
                        </div>
                        <div class="text-center">
                            <div class="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                💎
                            </div>
                            <h3 class="text-xl font-semibold mb-4">Премиальное качество</h3>
                            <p class="text-gray-600">Лучшие корейские бренды для роскошного ухода за кожей</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>

        <footer class="bg-gray-900 text-white py-12">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid md:grid-cols-4 gap-8">
                    <div>
                        <h3 class="text-lg font-semibold mb-4">KoHiCo</h3>
                        <p class="text-gray-400">Премиальная корейская косметика для истинных ценителей K-Beauty</p>
                    </div>
                    <div>
                        <h3 class="text-lg font-semibold mb-4">Каталог</h3>
                        <ul class="space-y-2 text-gray-400">
                            <li><a href="/catalog">Все товары</a></li>
                            <li><a href="/brands">Бренды</a></li>
                            <li><a href="/catalog?category=skincare">Уход за кожей</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 class="text-lg font-semibold mb-4">Информация</h3>
                        <ul class="space-y-2 text-gray-400">
                            <li><a href="/about">О нас</a></li>
                            <li><a href="/shipping">Доставка</a></li>
                            <li><a href="/returns">Возврат</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 class="text-lg font-semibold mb-4">Контакты</h3>
                        <ul class="space-y-2 text-gray-400">
                            <li>📧 info@kohico.ru</li>
                            <li>📱 Telegram: @KoHiCo</li>
                            <li>📍 Россия</li>
                        </ul>
                    </div>
                </div>
                <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                    <p>&copy; 2025 KoHiCo. Все права защищены.</p>
                </div>
            </div>
        </footer>
    </div>
</body>
</html>
EOF

# .htaccess файл
cat > deploy_package/.htaccess << 'EOF'
RewriteEngine On

# Поддержка Next.js роутинга
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ /index.html [L]

# Принудительное использование HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Кэширование статических файлов
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 month"
  ExpiresByType image/jpeg "access plus 1 month"
  ExpiresByType image/gif "access plus 1 month"
  ExpiresByType image/png "access plus 1 month"
  ExpiresByType image/webp "access plus 1 month"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/pdf "access plus 1 month"
  ExpiresByType text/javascript "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>

# Сжатие файлов
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/plain
  AddOutputFilterByType DEFLATE text/html
  AddOutputFilterByType DEFLATE text/xml
  AddOutputFilterByType DEFLATE text/css
  AddOutputFilterByType DEFLATE application/xml
  AddOutputFilterByType DEFLATE application/xhtml+xml
  AddOutputFilterByType DEFLATE application/rss+xml
  AddOutputFilterByType DEFLATE application/javascript
  AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Безопасность
<IfModule mod_headers.c>
  Header always set X-Content-Type-Options nosniff
  Header always set X-Frame-Options DENY
  Header always set X-XSS-Protection "1; mode=block"
  Header always set Strict-Transport-Security "max-age=63072000; includeSubDomains; preload"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>
EOF

# Создание sitemap.xml
cat > deploy_package/sitemap.xml << 'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.kohico.ru/</loc>
    <lastmod>2025-08-24</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.kohico.ru/catalog</loc>
    <lastmod>2025-08-24</lastmod>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.kohico.ru/brands</loc>
    <lastmod>2025-08-24</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.kohico.ru/about</loc>
    <lastmod>2025-08-24</lastmod>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://www.kohico.ru/contact</loc>
    <lastmod>2025-08-24</lastmod>
    <priority>0.6</priority>
  </url>
</urlset>
EOF

# robots.txt
cat > deploy_package/robots.txt << 'EOF'
User-agent: *
Allow: /

Sitemap: https://www.kohico.ru/sitemap.xml
EOF

echo "✅ Пакет для деплоя готов в папке deploy_package/"
echo "📁 Загрузите содержимое папки deploy_package в public_html на reg.ru"
echo "🌐 Домен: https://www.kohico.ru"
echo ""
echo "🚀 Следующие шаги:"
echo "1. Подключиться к панели управления reg.ru"
echo "2. Открыть файловый менеджер"
echo "3. Загрузить все файлы из deploy_package/ в public_html/"
echo "4. Настроить SSL сертификат"
echo "5. Проверить работу сайта"
