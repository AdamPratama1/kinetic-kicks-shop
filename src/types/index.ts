export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  description: string;
  colors: ProductColor[];
  sizes: number[];
  category: string;
  featured: boolean;
  new: boolean;
}

export interface ProductColor {
  name: string;
  hex: string;
  meshColor: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: ProductColor;
  selectedSize: number;
}

export interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
  paymentMethod: 'card' | 'paypal' | 'applepay';
}
