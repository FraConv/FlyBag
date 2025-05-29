// Dati di esempio per il tracciamento degli ordini
import { OrderStatus, TrackingEvent, TrackingOrder } from '../types/tracking';

// Dati di esempio per simulare una risposta API
export const mockTrackingOrders: TrackingOrder[] = [
  {
    id: 'ORD-001',
    trackingId: 'BRT35678492',
    orderDate: '14 Apr 2025 03:23 PM',
    expectedDeliveryDate: '22 May 2025',
    status: OrderStatus.IN_PROGRESS,
    products: [
      {
        id: 'PROD-001',
        name: 'Tazza turistica',
        imageUrl: '/assets/products/tazza-turistica.png',
        quantity: 1,
        price: 32
      }
    ],
    events: [
      {
        status: OrderStatus.PLACED,
        date: '14 Apr 2025 03:23 PM',
        location: 'Pienza',
        completed: true
      },
      {
        status: OrderStatus.IN_PROGRESS,
        date: '14 Apr 2025 03:23 PM',
        location: 'Pienza',
        completed: true
      },
      {
        status: OrderStatus.SHIPPED,
        date: '',
        completed: false
      },
      {
        status: OrderStatus.DELIVERED,
        date: '',
        location: 'Expected: 22 May 2025',
        completed: false
      }
    ]
  },
  {
    id: 'ORD-002',
    trackingId: 'BRT45678123',
    orderDate: '30 Apr 2025 11:45 AM',
    expectedDeliveryDate: '15 Jun 2025',
    status: OrderStatus.PLACED,
    products: [
      {
        id: 'PROD-002',
        name: 'Maglietta ricordo',
        imageUrl: '/assets/products/maglietta-ricordo.png',
        quantity: 2,
        price: 25.50
      }
    ],
    events: [
      {
        status: OrderStatus.PLACED,
        date: '30 Apr 2025 11:45 AM',
        location: 'Roma',
        completed: true
      },
      {
        status: OrderStatus.IN_PROGRESS,
        date: '',
        completed: false
      },
      {
        status: OrderStatus.SHIPPED,
        date: '',
        completed: false
      },
      {
        status: OrderStatus.DELIVERED,
        date: '',
        location: 'Expected: 15 Jun 2025',
        completed: false
      }
    ]
  },
  {
    id: 'ORD-003',
    trackingId: 'BRT98765432',
    orderDate: '05 May 2025 09:30 AM',
    expectedDeliveryDate: '12 May 2025',
    status: OrderStatus.SHIPPED,
    products: [
      {
        id: 'PROD-003',
        name: 'Portachiavi souvenir',
        imageUrl: '/assets/products/portachiavi.png',
        quantity: 3,
        price: 8.99
      },
      {
        id: 'PROD-004',
        name: 'Cartolina Roma',
        imageUrl: '/assets/products/cartolina.png',
        quantity: 5,
        price: 2.50
      }
    ],
    events: [
      {
        status: OrderStatus.PLACED,
        date: '05 May 2025 09:30 AM',
        location: 'Firenze',
        completed: true
      },
      {
        status: OrderStatus.IN_PROGRESS,
        date: '06 May 2025 10:15 AM',
        location: 'Firenze',
        completed: true
      },
      {
        status: OrderStatus.SHIPPED,
        date: '08 May 2025 08:45 AM',
        location: 'Centro di smistamento',
        completed: true
      },
      {
        status: OrderStatus.DELIVERED,
        date: '',
        location: 'Expected: 12 May 2025',
        completed: false
      }
    ]
  }
];
