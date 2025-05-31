import React, { useState, useEffect } from 'react';
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonSpinner,
  IonIcon
} from '@ionic/react';
import { useParams, useHistory } from 'react-router-dom';
import { star } from 'ionicons/icons';
import { Shop, ShopReview } from '@/types/shop';
import { mockShopData } from '@/data/shopData';
import './ShopReviews.css';

interface ShopReviewsParams {
  id?: string;
}

const ShopReviews: React.FC = () => {
  const { id } = useParams<ShopReviewsParams>();
  const [shop, setShop] = useState<Shop | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const history = useHistory();
  useEffect(() => {
    const fetchShop = async () => {
      try {
        setLoading(true);
        setTimeout(() => {
          setShop(mockShopData);
          setLoading(false);
        }, 500);
      } catch (err) {
        setError('Errore nel caricamento delle recensioni');
        setLoading(false);
      }
    };

    fetchShop();
  }, [id]);

  const handleBack = () => {
    history.goBack();
  };

  if (loading) {
    return (
      <IonPage>
        <IonContent className="ion-padding">
          <div className="loading-container">
            <IonSpinner name="crescent" />
            <p>Caricamento recensioni...</p>
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
            <button className="back-button" onClick={handleBack}>Torna indietro</button>
          </div>
        </IonContent>
      </IonPage>
    );
  }
  const extendedReviews: ShopReview[] = [
    ...shop.reviews,
    ...[...Array(3)].map((_, i) => ({
      id: `review-extra-${i + 1}`,
      userName: `User ${i + 4}`,
      rating: 4 + Math.random(),
      comment: "Great shop with unique items. I loved the authentic feel and friendly service.",
      date: `${i + 3} months ago`
    }))
  ];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={`/shop/${id}`} text="" />
          </IonButtons>
          <IonTitle>Reviews</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className="reviews-header ion-padding">
          <h1>{shop.name}</h1>
          <div className="rating-summary">
            <div className="rating-stars">
              <IonIcon icon={star} color="warning" />
            </div>
            <div className="rating-value">
              {shop.rating} • {shop.reviewsCount} reviews
            </div>
          </div>
        </div>

        <div className="reviews-list">
          {extendedReviews.map((review) => (
            <div key={review.id} className="review-item ion-padding">
              <div className="reviewer-info">
                <div className="reviewer-avatar">
                  <img
                    src={review.userAvatar || "/profile/avatar.png"}
                    alt={review.userName}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/profile/avatar.png";
                    }}
                  />
                </div>
                <div className="reviewer-details">
                  <h4>{review.userName}</h4>
                  <p>{review.date}</p>
                </div>
                <div className="review-rating">
                  {review.rating.toFixed(1)}
                </div>
              </div>
              <p className="review-text">{review.comment}</p>
            </div>
          ))}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ShopReviews;
