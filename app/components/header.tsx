
"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ShoppingCart, 
  User, 
  Search, 
  Menu, 
  Heart, 
  Package,
  Settings,
  LogOut,
  ShoppingBag
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

export function Header() {
  const { data: session } = useSession() || {};
  const router = useRouter();
  const [cartItemsCount] = useState(0); // TODO: Подключить к реальной корзине

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Логотип */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <ShoppingBag className="h-8 w-8 text-pink-600" />
              <span className="text-xl font-bold text-gray-900">KoHiCo</span>
            </Link>
          </div>

          {/* Навигация - десктоп */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/catalog" className="text-gray-900 hover:text-pink-600 transition-colors">
              Каталог
            </Link>
            <Link href="/brands" className="text-gray-900 hover:text-pink-600 transition-colors">
              Бренды
            </Link>
            <Link href="/about" className="text-gray-900 hover:text-pink-600 transition-colors">
              О нас
            </Link>
            <Link href="/contact" className="text-gray-900 hover:text-pink-600 transition-colors">
              Контакты
            </Link>
          </nav>

          {/* Действия справа */}
          <div className="flex items-center space-x-4">
            
            {/* Поиск */}
            <Button variant="ghost" size="sm">
              <Search className="h-5 w-5" />
            </Button>

            {/* Корзина */}
            <Button variant="ghost" size="sm" className="relative" asChild>
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
                {cartItemsCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
                  >
                    {cartItemsCount}
                  </Badge>
                )}
              </Link>
            </Button>

            {/* Пользователь */}
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    Привет, {session.user?.name || 'Пользователь'}!
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Профиль
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/orders" className="flex items-center cursor-pointer">
                      <Package className="mr-2 h-4 w-4" />
                      Заказы
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/wishlist" className="flex items-center cursor-pointer">
                      <Heart className="mr-2 h-4 w-4" />
                      Избранное
                    </Link>
                  </DropdownMenuItem>
                  {(session.user as any)?.isAdmin && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/admin" className="flex items-center cursor-pointer">
                          <Settings className="mr-2 h-4 w-4" />
                          Админ-панель
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="cursor-pointer text-red-600"
                    onClick={() => signOut()}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Выйти
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/auth/signin">Войти</Link>
                </Button>
                <Button variant="default" size="sm" asChild>
                  <Link href="/auth/signup">Регистрация</Link>
                </Button>
              </div>
            )}

            {/* Мобильное меню */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>Меню</SheetTitle>
                  <SheetDescription>
                    Навигация по сайту
                  </SheetDescription>
                </SheetHeader>
                <div className="flex flex-col space-y-4 mt-6">
                  <Link href="/catalog" className="text-lg">Каталог</Link>
                  <Link href="/brands" className="text-lg">Бренды</Link>
                  <Link href="/about" className="text-lg">О нас</Link>
                  <Link href="/contact" className="text-lg">Контакты</Link>
                  
                  {!session ? (
                    <>
                      <hr />
                      <Link href="/auth/signin" className="text-lg">Войти</Link>
                      <Link href="/auth/signup" className="text-lg">Регистрация</Link>
                    </>
                  ) : (
                    <>
                      <hr />
                      <Link href="/profile" className="text-lg">Профиль</Link>
                      <Link href="/orders" className="text-lg">Заказы</Link>
                      {(session.user as any)?.isAdmin && (
                        <Link href="/admin" className="text-lg">Админ-панель</Link>
                      )}
                      <button 
                        onClick={() => signOut()}
                        className="text-lg text-left text-red-600"
                      >
                        Выйти
                      </button>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
