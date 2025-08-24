
import Link from "next/link";
import { Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Информация о магазине */}
          <div>
            <h3 className="text-lg font-semibold mb-4">KoHiCo</h3>
            <p className="text-gray-300 mb-4 text-sm">
              Премиальная корейская косметика. Только оригинальные товары от ведущих K-beauty брендов.
            </p>
            <div className="flex space-x-4">
              <Instagram className="h-5 w-5 text-gray-300 hover:text-pink-400 cursor-pointer transition-colors" />
              <Facebook className="h-5 w-5 text-gray-300 hover:text-pink-400 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Категории */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Категории</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/catalog?category=skincare" className="text-gray-300 hover:text-white transition-colors">
                  Уход за лицом
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=oral-care" className="text-gray-300 hover:text-white transition-colors">
                  Уход за полостью рта
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=hair-care" className="text-gray-300 hover:text-white transition-colors">
                  Уход за волосами
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=face-masks" className="text-gray-300 hover:text-white transition-colors">
                  Маски для лица
                </Link>
              </li>
            </ul>
          </div>

          {/* Бренды */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Бренды</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/catalog?brand=sulwhasoo" className="text-gray-300 hover:text-white transition-colors">
                  Sulwhasoo
                </Link>
              </li>
              <li>
                <Link href="/catalog?brand=the-history-of-whoo" className="text-gray-300 hover:text-white transition-colors">
                  The History of Whoo
                </Link>
              </li>
              <li>
                <Link href="/catalog?brand=boncho" className="text-gray-300 hover:text-white transition-colors">
                  BonCho
                </Link>
              </li>
              <li>
                <Link href="/catalog?brand=rejuran" className="text-gray-300 hover:text-white transition-colors">
                  Rejuran
                </Link>
              </li>
              <li>
                <Link href="/catalog?brand=o-hui" className="text-gray-300 hover:text-white transition-colors">
                  O HUI
                </Link>
              </li>
            </ul>
          </div>

          {/* Контакты */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Контакты</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-pink-400" />
                <span className="text-gray-300">+7 (900) 000-00-00</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-pink-400" />
                <span className="text-gray-300">info@kohico.ru</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-pink-400" />
                <span className="text-gray-300">Москва, Россия</span>
              </div>
            </div>
          </div>
        </div>

        <hr className="my-8 border-gray-700" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">
            © 2025 KoHiCo. Все права защищены.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/shipping" className="text-gray-300 hover:text-white text-sm transition-colors">
              Доставка
            </Link>
            <Link href="/returns" className="text-gray-300 hover:text-white text-sm transition-colors">
              Возврат
            </Link>
            <Link href="/contact" className="text-gray-300 hover:text-white text-sm transition-colors">
              Поддержка
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
