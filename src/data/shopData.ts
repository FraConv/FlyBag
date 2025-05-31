// Dati di esempio per il negozio
import { Shop } from '@/types/shop';

export const mockShopData: Shop = {
  id: 'shop-1',
  name: 'Da Pasquale',
  type: 'Souvenir Shop',  images: [
    '/shops/shop-pasquale.jpg',
    '/shops/shop-interior-1.jpg',
    '/shops/shop-interior-2.jpg',
    '/shops/shop-exterior.jpg',
    '/shops/shop-products.jpg'
  ],
  description: "Discover the authenticity of Apulian craftsmanship! At Bari Handmade Souvenirs, you'll find unique handmade products, perfect as gifts or keepsakes from your trip to Puglia.",
  isOpen: true,
  rating: 4.95,
  reviewsCount: 22,
  featuredItems: [
    {
      id: 'item-1',
      name: 'Item Name',
      price: 26,
      imageUrl: '/shops/product-bottle.jpg',
      description: 'Authentic Italian liquor'
    },
    {
      id: 'item-4',
      name: 'Item Name',
      price: 26,
      imageUrl: '/shops/product-bottle.jpg',
      description: 'Authentic Italian liquor'
    },
    {
      id: 'item-5',
      name: 'Item Name',
      price: 26,
      imageUrl: '/shops/product-bottle.jpg',
      description: 'Authentic Italian liquor'
    },
    {
      id: 'item-2',
      name: 'Item Name',
      price: 26,
      imageUrl: '/shops/product-magnet.jpg',
      description: 'Bari souvenir magnet'
    },
    {
      id: 'item-3',
      name: 'Item Name',
      price: 26,
      imageUrl: '/shops/product-mug.jpg',
      description: 'Decorative ceramic mug'
    }
  ],
  timeTable: {
    workingDays: '09:00 AM - 07:30 PM',
    weekend: 'Closed',
  },
  owner: {
    id: 'owner-1',
    name: 'Pasquale Aquila',
    since: '2012',
    avatar: '/shops/owner-pasquale.jpg',
    contacts: {
      instagram: 'pasquale_souvenirs',
      website: 'www.dapasuqale.com'
    }
  },
  location: {
    address: 'Via Strada Vecchia 23',
    city: 'Bari',
    area: 'BARI VECCHIA',
    zipCode: '70121',
    coordinates: {
      lat: 41.1277,
      lng: 16.8718
    }
  },
  reviews: [
    {
      id: 'review-1',
      userName: 'Emma',
      userAvatar: '/shops/user-emma.jpg',
      rating: 5,
      comment: "We were only sad not to stay longer. We hope to be back to explore Nantes some more and would love to stay at Golwen's place again, if they'll have us! :)",
      date: '3 weeks ago'
    },
    {
      id: 'review-2',
      userName: 'Marco',
      userAvatar: '/shops/user-marco.jpg',
      rating: 5,
      comment: "Great place to buy authentic souvenirs. Pasquale was very helpful!",
      date: '1 month ago'
    },
    {
      id: 'review-3',
      userName: 'Sophia',
      rating: 4.5,
      comment: "Beautiful handcrafted items. A bit expensive but worth it.",
      date: '2 months ago'
    }
  ]
};
