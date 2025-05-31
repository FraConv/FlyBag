import React, { useState, useEffect } from 'react';
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonImg,
  IonButton,
  IonIcon,
  IonCard,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonChip,
  IonLabel,
  IonSpinner,
  IonItem,
  IonToast,
  useIonViewWillEnter
} from '@ionic/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useParams, useHistory } from 'react-router-dom';
import { 
  logoInstagram, 
  globeOutline, 
  chevronForwardOutline,
  starOutline,
  star,
  shareSocialOutline,
  checkmarkOutline
} from 'ionicons/icons';
import { Shop, ShopItem, ShopReview } from '@/types/shop';
import { mockShopData } from '@/data/shopData';
import GoogleMap from '@/components/GoogleMap';
import { Share } from '@capacitor/share';
import './ShopDetail.css';

interface ShopDetailParams {
  id?: string;
}

const ShopDetail: React.FC = () => {
  const { id } = useParams<ShopDetailParams>();
  const [shop, setShop] = useState<Shop | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showSuccessToast, setShowSuccessToast] = useState<boolean>(false);
  const [showErrorToast, setShowErrorToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');  const history = useHistory();

  useEffect(() => {
    const fetchShop = async () => {
      try {
        setLoading(true);
        setTimeout(() => {
          setShop(mockShopData);
          setLoading(false);
        }, 500);
      } catch (err) {
        setError('Errore nel caricamento dei dati del negozio');
        setLoading(false);
      }
    };

    fetchShop();
  }, [id]);

  const handleBack = () => {
    history.goBack();
  };

  const handleViewAllReviews = () => {
    if (shop) {
      history.push(`/shop/${shop.id}/reviews`);
    }
  };  const handleOpenMaps = () => {
    if (shop) {
      window.open(
        `https://www.google.com/maps?q=${shop.location.coordinates.lat},${shop.location.coordinates.lng}`,
        '_blank'
      );
    }
  };

  const handleShare = async () => {
    if (!shop) return;

    const shareText = `🛍️ ${shop.name} - Scoperto su FlyBag!

🌟 Ho trovato questo incredibile negozio su FlyBag! "${shop.name}" - ${shop.type}

⭐ ${shop.rating}/5 con ${shop.reviewsCount} recensioni
📍 ${shop.location.area}

${shop.description.substring(0, 100)}${shop.description.length > 100 ? '...' : ''}

Scopri di più su FlyBag: ${window.location.origin}/shop/${shop.id}`;    try {
      if ((window as any).Capacitor && (window as any).Capacitor.isNativePlatform) {
        await Share.share({
          text: shareText,
          dialogTitle: 'Condividi il negozio'
        });
        setToastMessage('Condiviso con successo!');
        setShowSuccessToast(true);
        return;
      }
      if (navigator.share) {
        await navigator.share({
          text: shareText
        });
        setToastMessage('Condiviso con successo!');
        setShowSuccessToast(true);
      } else {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(shareText);
          setToastMessage('Link copiato negli appunti! 📋');
          setShowSuccessToast(true);
        } else {
          prompt('Copia questo testo per condividere:', shareText);
        }
      }
    } catch (error) {
      console.error('Errore durante la condivisione:', error);
      setToastMessage('Impossibile condividere in questo momento');
      setShowErrorToast(true);
    }
  };

  if (loading) {
    return (
      <IonPage>
        <IonContent className="ion-padding">
          <div className="loading-container">
            <IonSpinner name="crescent" />
            <p>Caricamento negozio...</p>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  if (error || !shop) {
    return (
      <IonPage>
        <IonContent className="ion-padding">
          <div className="error-container">
            <h2>Errore</h2>
            <p>{error || 'Negozio non trovato'}</p>
            <IonButton onClick={handleBack}>Torna indietro</IonButton>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>      <IonHeader className="shop-header">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/shops" text="" />
          </IonButtons>
          <IonTitle>{shop.name}</IonTitle>
          <IonButtons slot="end">
            <div className={`shop-status ${shop.isOpen ? 'open' : 'closed'}`}>
              {shop.isOpen ? 'Open' : 'Closed'}
            </div>
          </IonButtons>
        </IonToolbar>
      </IonHeader>      <IonContent fullscreen>
        <div className="shop-image-container">
          <Swiper
            modules={[Pagination]}
            spaceBetween={0}
            slidesPerView={1}
            pagination={{ 
              clickable: true,
              bulletClass: 'swiper-pagination-bullet custom-bullet',
              bulletActiveClass: 'swiper-pagination-bullet-active custom-bullet-active'
            }}
            className="shop-images-swiper"
          >
            {shop.images.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  src={image}
                  alt={`${shop.name} - Immagine ${index + 1}`}
                  className="shop-main-image"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/logo_no_text.svg";
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <button className="share-button" onClick={handleShare}>
            <IonIcon icon={shareSocialOutline} className="share-icon" />
          </button>
        </div>

        <div className="shop-info ion-padding-horizontal ion-padding-top">
          <div className="shop-title-section">
            <h1>{shop.name}</h1>
            <p className="shop-type">{shop.type}</p>
          </div>        </div>

        <div className="shop-description ion-padding">
          <p>{shop.description}</p>
        </div>

        <div className="featured-section ion-padding">
          <h2>Featured items</h2>
          <div className="featured-items-grid">
            {shop.featuredItems.map((item) => (
              <div key={item.id} className="featured-item">
                <div className="item-image-container">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/logo_no_text.svg";
                    }}
                  />
                </div>
                <h4>{item.name}</h4>
                <p>{item.price}€</p>
              </div>
            ))}
          </div>        </div>

        <div className="time-table ion-padding">
          <h2>Time table</h2>
          <div className="time-row">
            <span>Mon - Sat</span>
            <span>{shop.timeTable.workingDays}</span>
          </div>
          <div className="time-row">
            <span>Sun</span>
            <span>{shop.timeTable.weekend}</span>
          </div>
        </div>

        <div className="owner-section ion-padding">
          <div className="owner-info">
            <div className="owner-avatar">
              <img
                src={shop.owner.avatar || "/profile/avatar.png"}
                alt={shop.owner.name}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/profile/avatar.png";
                }}
              />
            </div>
            <div className="owner-details">
              <h3>{shop.owner.name}</h3>
              <p>Owner from {shop.owner.since}</p>
            </div>
          </div>
          <div className="owner-social">
            {shop.owner.contacts?.instagram && (
              <IonButton fill="clear" className="social-button">
                <IonIcon icon={logoInstagram} slot="icon-only" />
              </IonButton>
            )}
            {shop.owner.contacts?.website && (
              <IonButton fill="clear" className="social-button">
                <IonIcon icon={globeOutline} slot="icon-only" />
              </IonButton>
            )}          </div>
        </div>

        <div className="location-section ion-padding">
          <h2>Where is the shop</h2>
          <div className="google-map-container">
            <GoogleMap
              lat={shop.location.coordinates.lat}
              lng={shop.location.coordinates.lng}
              zoom={15}
              height="200px"
              className="shop-location-map"
              markerTitle={shop.name}
              onMapClick={handleOpenMaps}
            />
            <div className="location-address">
              <p>{shop.location.area}</p>
              <span>Tocca la mappa per aprire Google Maps</span>
            </div>
          </div>
        </div>

        <div className="reviews-section ion-padding">
          <div className="reviews-header">
            <div className="rating-summary">
              <div className="rating-stars">
                <IonIcon icon={star} color="warning" />
              </div>
              <div className="rating-value">
                {shop.rating} • {shop.reviewsCount} reviews
              </div>
            </div>          </div>

          {shop.reviews.length > 0 && (
            <div className="featured-review">
              <p className="review-text">{shop.reviews[0].comment}</p>
              <IonButton fill="clear" className="show-more-btn" onClick={handleViewAllReviews}>
                Show more <IonIcon icon={chevronForwardOutline} />
              </IonButton>
              
              <div className="reviewer-info">
                <div className="reviewer-avatar">
                  <img
                    src={shop.reviews[0].userAvatar || "/profile/avatar.png"}
                    alt={shop.reviews[0].userName}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/profile/avatar.png";
                    }}
                  />
                </div>
                <div className="reviewer-details">
                  <h4>{shop.reviews[0].userName}</h4>
                  <p>{shop.reviews[0].date}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </IonContent>

      <IonToast
        isOpen={showSuccessToast}
        onDidDismiss={() => setShowSuccessToast(false)}
        message={toastMessage}
        duration={2000}
        position="bottom"
        color="success"
        buttons={[
          {
            text: '✓',
            role: 'cancel'
          }
        ]}
      />
      
      <IonToast
        isOpen={showErrorToast}
        onDidDismiss={() => setShowErrorToast(false)}
        message={toastMessage}
        duration={2000}
        position="bottom"
        color="danger"
        buttons={[
          {
            text: '✗',
            role: 'cancel'
          }
        ]}
      />
    </IonPage>
  );
};

export default ShopDetail;
