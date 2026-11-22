export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  rentalPrice: number;
  originalPrice?: number;
  rentalPeriod: string;
  stock: number;
  status: 'Available' | 'Rented' | 'Unavailable' | 'Maintenance';
  featured: boolean;
  newArrival: boolean;
  visible: boolean;
  description: string;
  specifications: string;
  accessories: string;
  images: string[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  visible: boolean;
}

export interface PackageItem {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  description: string;
  image: string;
  includedItems: string[];
}

export interface Booking {
  id: string;
  customerName: string;
  phone: string;
  productName: string;
  accessories: string[];
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: 'Pending' | 'Confirmed' | 'Rented' | 'Returned' | 'Cancelled' | 'Rejected';
  createdAt: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface Settings {
  businessName: string;
  owner: string;
  tagline: string;
  address: string;
  callNumber: string;
  whatsappNumber: string;
  email: string;
  googleMaps: string;
  instagram: string;
  facebook: string;
}
