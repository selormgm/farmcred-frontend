export interface Product {
  id: number;
  name: string;
  imageURL: string;
  price: number;
  description: string;
  farmerName: string;
  category: "Grains" | "Tubers" | "Vegetables" | "Fruits";
  quantity?: string;
  delivery?: string;
  stock?: number;
};

export interface SendMessageInput{
  
}

export interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
  farmerName: string;
  description: string;
}

export interface CartState {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  isInCart: (id: number) => boolean;
  updateQuantity: (id: number, delta: number) => void; // optional
}

export interface BuyerOrders{
  id: number;
  name: string;
  image: string;
  price: number;
  status: "Delivered | Out for Delivery | Preparing";
}

export interface BuyerProfile{
    account_id: number;
    full_name: string;
    phone_number: number;
    email: string;
    country: string;
    region: string;
    receive_level_notifications: boolean;
    receive_sms_notifications: boolean;
    receive_email_notifications: boolean;
}

export interface BuyerTransaction{
  id: number;
  account_party_full_name: string;
  buyer_full_name: string;
  farmer_full_name: string;
  name: string;
  date: string;
  category: string;
  status: 'income' | 'expense';
  amount: number;
  desccription: string;
  created_at: string;
  updated_at: string;
  account_party: number;
  buyer: number;
}

export interface ApiFilters {
  category?: string;
  status?: string;
  type?: string;
  date_from?: string;
  date_to?: string;
}

export interface CreateListingInput{
  
}