import React, { useState, useEffect, useCallback } from 'react';
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonBackButton,
  IonList,
  IonItem,
  IonLabel,
  IonCard,
  IonCardContent,
  IonIcon,
  IonSearchbar,
  IonImg,
  IonSpinner,
  useIonViewWillEnter
} from '@ionic/react';
import { useHistory, useParams } from 'react-router-dom';
import { checkmarkCircle, ellipseOutline } from 'ionicons/icons';
import { TrackingOrder, OrderStatus, OrderStatusIcons } from '@/types/tracking';
import { mockTrackingOrders } from '@/data/trackingData';
import NavBar from '@/components/NavBar';
import './Tracking.css';

// Componente per visualizzare l'elenco degli ordini
const OrderList: React.FC<{
  orders: TrackingOrder[];
  onSelectOrder: (order: TrackingOrder) => void;
}> = ({ orders, onSelectOrder }) => {
  return (
    <IonList className="order-list">
      {orders.map((order) => (        <IonItem 
          key={order.id} 
          detail={true} 
          onClick={() => onSelectOrder(order)}
          className="order-list-item"
          button
        >
          <div className="order-preview">
            <div className="order-image-container">
              {order.products[0] && (
                <img
                  className="order-image"
                  src={order.products[0].imageUrl}
                  alt={order.products[0].name}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/logo_no_text.svg";
                  }}
                />
              )}
            </div>
            <div className="order-details">
              <h3>{order.products[0]?.name || 'Prodotto'}</h3>
              <p>Ordine: {order.id}</p>
              <p>Consegna prevista: {order.expectedDeliveryDate}</p>
              <div className={`order-status order-status-${order.status.toLowerCase().replace(' ', '-')}`}>
                {order.status}
              </div>
            </div>
          </div>
        </IonItem>
      ))}
    </IonList>
  );
};

// Componente per la timeline del tracking
const TrackingTimeline: React.FC<{ order: TrackingOrder }> = ({ order }) => {
  // Calcola la percentuale di progresso per la linea continua
  const completedEvents = order.events.filter(event => event.completed).length;
  const totalEvents = order.events.length;
  const progressPercentage = totalEvents > 1 ? ((completedEvents - 1) / (totalEvents - 1)) * 100 : 0;

  return (
    <div 
      className="tracking-timeline"
      style={{
        '--progress-percentage': `${Math.max(0, Math.min(100, progressPercentage))}%`
      } as React.CSSProperties}
    >
      {order.events.map((event, index) => (
        <div key={index} className={`tracking-event ${event.completed ? 'completed' : ''}`}>
          <div className="event-indicator">
            <IonIcon
              icon={event.completed ? checkmarkCircle : ellipseOutline}
              className={`event-icon ${event.completed ? 'completed' : ''}`}
            />
          </div>
          <div className="event-content">
            <div className="event-content-row">
              <div className="event-text">
                <h4>{event.status}</h4>
                {event.date ? (
                  <p>{event.location}, {event.date}</p>
                ) : event.location ? (
                  <p>{event.location}</p>
                ) : (
                  <p>In attesa</p>
                )}
              </div>
              <div className="event-status-icon">
                <IonIcon
                  icon={OrderStatusIcons[event.status]}
                  className={`status-icon ${event.completed ? 'completed' : ''}`}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Componente per visualizzare i dettagli dell'ordine
const OrderDetail: React.FC<{
  order: TrackingOrder;
  onBack: () => void;
}> = ({ order, onBack }) => {
  const handleBackClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onBack();
  };

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={handleBackClick}>
              <img src="/icon (6).svg" alt="Back" />
            </IonButton>
          </IonButtons>
          <IonTitle>Track order</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent>
        <div className="order-detail-content">
          <IonCard className="product-card">
            <IonCardContent>
              <div className="product-info">
                <div className="product-image-container">
                  <img
                    className="product-image"
                    src={order.products[0]?.imageUrl}
                    alt={order.products[0]?.name}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/logo_no_text.svg";
                    }}
                  />
                </div>
                <div className="product-details">
                  <h3>{order.products[0]?.name}</h3>
                  <p>Qty: {order.products[0]?.quantity}</p>
                  <p className="product-price">$ {order.products[0]?.price}</p>
                </div>
              </div>
            </IonCardContent>
          </IonCard>

          <div className="order-info-section">
            <h3>Order Details</h3>
            <div className="order-info-grid">
              <div className="info-row">
                <span>Expected delivery</span>
                <span>{order.expectedDeliveryDate}</span>
              </div>
              <div className="info-row">
                <span>Tracking ID</span>
                <span>{order.trackingId}</span>
              </div>
            </div>
          </div>

          <div className="order-status-section">
            <h3>Order status</h3>
            <TrackingTimeline order={order} />
          </div>
        </div>
      </IonContent>
    </>
  );
};

// Interfaccia per i parametri dell'URL
interface TrackingParams {
  orderId?: string;
}

// Componente principale per la pagina di tracking
const Tracking: React.FC = () => {
  const { orderId } = useParams<TrackingParams>();  const [orders, setOrders] = useState<TrackingOrder[]>([]);
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [orderNotFound, setOrderNotFound] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const history = useHistory();

  // Calcola selectedOrder direttamente dall'URL invece di usare stato separato
  const selectedOrder = orderId && orders.length > 0 
    ? orders.find(o => o.id === orderId) || null 
    : null;
  // Carica i dati all'inizio
  useEffect(() => {
    const loadOrders = () => {
      setIsLoading(true);
      setOrders(mockTrackingOrders);
      setIsLoading(false);
    };

    // Carica solo se non abbiamo già i dati
    if (orders.length === 0) {
      loadOrders();
    }
  }, []); // Dipendenza vuota per caricare solo all'inizio  // Effetto per gestire la selezione dell'ordine basata sull'URL
  useEffect(() => {
    setOrderNotFound(false);
    
    if (orderId && orders.length > 0) {
      const order = orders.find(o => o.id === orderId);
      
      if (!order) {
        // Se l'ordine non viene trovato, mostra il messaggio di errore
        setOrderNotFound(true);
      }
    }
    
    // Reset sempre il flag di navigazione quando l'URL cambia
    setIsNavigating(false);
  }, [orderId, orders]);

  // Reset del flag di navigazione anche quando il componente si monta
  useEffect(() => {
    setIsNavigating(false);
  }, []);

  // Filtra gli ordini in base alla ricerca
  const filteredOrders = orders.filter(order => 
    order.id.toLowerCase().includes(searchText.toLowerCase()) ||
    order.trackingId.toLowerCase().includes(searchText.toLowerCase()) ||
    order.products.some(p => p.name.toLowerCase().includes(searchText.toLowerCase()))
  );  // Gestori degli eventi con useCallback per evitare re-render
  const handleSelectOrder = useCallback((order: TrackingOrder) => {
    if (isNavigating) return;
    
    setIsNavigating(true);
    history.push(`/user/tracking/${order.id}`);
    
    // Reset del flag dopo la navigazione
    setTimeout(() => setIsNavigating(false), 200);
  }, [isNavigating, history]);

  const handleBackToList = useCallback(() => {
    if (isNavigating) return;
    
    setIsNavigating(true);
    history.push('/user/tracking');
    
    // Reset del flag dopo la navigazione
    setTimeout(() => setIsNavigating(false), 200);
  }, [isNavigating, history]);return (
    <IonPage>
      {isLoading ? (
        <IonContent>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <IonSpinner name="crescent" />
          </div>
        </IonContent>
      ) : orderNotFound ? (
        <>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonBackButton defaultHref="/user/tracking" text="" />
              </IonButtons>
              <IonTitle>Ordine non trovato</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center', 
              alignItems: 'center', 
              height: '70vh',
              padding: '20px',
              textAlign: 'center'
            }}>
              <h2>Ordine non trovato</h2>
              <p>L'ordine con ID "{orderId}" non è stato trovato.</p>
              <IonButton 
                fill="solid" 
                color="primary"
                onClick={() => history.push('/user/tracking')}
                style={{ marginTop: '20px' }}
              >
                Torna alla lista ordini
              </IonButton>
            </div>
          </IonContent>
        </>
      ) : selectedOrder ? (
        <OrderDetail order={selectedOrder} onBack={handleBackToList} />
      ) : (
        <>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonBackButton defaultHref="/user/profile" text="" />
              </IonButtons>
              <IonTitle>I miei ordini</IonTitle>
            </IonToolbar>
          </IonHeader>
          
          <IonContent>            <div className="tracking-container">
              <IonSearchbar
                value={searchText}
                onIonChange={e => setSearchText(e.detail.value!)}
                onIonInput={e => setSearchText(e.detail.value!)}
                onIonClear={() => setSearchText('')}
                placeholder="Cerca ordine"
                className="search-bar"
              />
              
              {filteredOrders.length > 0 ? (
                <OrderList orders={filteredOrders} onSelectOrder={handleSelectOrder} />
              ) : (
                <div className="no-orders">
                  <p>Nessun ordine trovato</p>
                </div>
              )}
            </div>
          </IonContent>
          
          <NavBar />
        </>
      )}
    </IonPage>
  );
};

export default Tracking;
