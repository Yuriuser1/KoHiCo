
export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  isAdmin: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  products?: Product[];
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  country?: string | null;
  logoUrl?: string | null;
  products?: Product[];
}

export interface ProductImage {
  id: string;
  url: string;
  alt?: string | null;
  isPrimary: boolean;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  slug: string;
  shortDescription?: string | null;
  description?: string | null;
  price: number;
  currency: string;
  volume?: string | null;
  inStock: boolean;
  isFeatured: boolean;
  isPromo: boolean;
  promoText?: string | null;
  benefits: string[];
  ingredients: string[];
  usage?: string | null;
  tags: string[];
  categoryId: string;
  brandId: string;
  telegramPostId?: string | null;
  images: ProductImage[];
  category?: Category;
  brand?: Brand;
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  product: Product;
}

export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
}

export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED'
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED'
}

export interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  product: Product;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  totalAmount: number;
  currency: string;
  customerEmail: string;
  customerPhone: string;
  customerName: string;
  deliveryAddress?: string;
  deliveryCity?: string;
  deliveryPostal?: string;
  deliveryNotes?: string;
  paymentId?: string;
  paymentMethod?: string;
  items: OrderItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface FilterOptions {
  categories: string[];
  brands: string[];
  minPrice: number;
  maxPrice: number;
  inStock: boolean;
  isPromo: boolean;
}
