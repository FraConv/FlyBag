// Definizione dei tipi per la pagina del negozio

export interface ShopItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description?: string;
  category?: string;
}

export interface ShopReview {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: string;
}

export interface ShopOwner {
  id: string;
  name: string;
  since: string;
  avatar?: string;
  contacts?: {
    instagram?: string;
    website?: string;
    phone?: string;
    email?: string;
  };
}

export interface ShopTimeTable {
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
  saturday?: string;
  sunday?: string;
  // In alternativa, per un formato più generico:
  workingDays?: string;
  weekend?: string;
  holidays?: string;
}

export interface ShopLocation {
  address: string;
  city: string;
  area?: string;
  zipCode?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface Shop {
  id: string;
  name: string;
  type: string; // es: "Souvenir Shop"
  images: string[];
  description: string;
  isOpen: boolean;
  rating: number;
  reviewsCount: number;
  featuredItems: ShopItem[];
  timeTable: ShopTimeTable;
  owner: ShopOwner;
  location: ShopLocation;
  reviews: ShopReview[];
}
