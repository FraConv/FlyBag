// Definizione dei tipi per il tracciamento ordini
import { 
  receiptOutline, 
  constructOutline, 
  carOutline, 
  homeOutline 
} from 'ionicons/icons';

// Enumeratore per lo stato dell'ordine con icone associate
export enum OrderStatus {
  PLACED = 'Order placed',
  IN_PROGRESS = 'In progress',
  SHIPPED = 'Shipped',
  DELIVERED = 'Delivered'
}

// Mapping delle icone per ogni stato
export const OrderStatusIcons = {
  [OrderStatus.PLACED]: receiptOutline,
  [OrderStatus.IN_PROGRESS]: constructOutline,
  [OrderStatus.SHIPPED]: carOutline,
  [OrderStatus.DELIVERED]: homeOutline,
} as const;

// Interfaccia per un prodotto nell'ordine
export interface OrderProduct {
  id: string;
  name: string;
  imageUrl: string;
  quantity: number;
  price: number;
}

// Interfaccia per un evento di tracciamento
export interface TrackingEvent {
  status: OrderStatus;
  date: string;
  location?: string;
  completed: boolean;
}

// Interfaccia principale per l'ordine completo
export interface TrackingOrder {
  id: string;
  trackingId: string;
  orderDate: string;
  expectedDeliveryDate: string;
  products: OrderProduct[];
  status: OrderStatus;
  events: TrackingEvent[];
}
