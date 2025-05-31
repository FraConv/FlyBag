import React, { useState, useEffect } from 'react';
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonSearchbar,
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
  IonList,
  IonThumbnail,
  IonSpinner,
  IonRefresher,
  IonRefresherContent,
  IonIcon,
  IonChip
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { star, locationOutline, timeOutline } from 'ionicons/icons';
import { Shop } from '@/types/shop';
import { mockShopData } from '@/data/shopData';
import NavBar from '@/components/NavBar';
import './ShopList.css';

const ShopList: React.FC = () => {
  const [shops, setShops] = useState<Shop[]>([]);
  const [filteredShops, setFilteredShops] = useState<Shop[]>([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const fetchShops = async () => {
      try {
        setLoading(true);
        setTimeout(() => {
          const shopArray = Array(5).fill(null).map((_, index) => ({
            ...mockShopData,
            id: `shop-${index + 1}`,
            name: index === 0 ? mockShopData.name : `Shop ${index + 1}`,
          }));
          
          setShops(shopArray);
          setFilteredShops(shopArray);
          setLoading(false);
        }, 500);
      } catch (err) {
        console.error('Errore nel caricamento dei negozi', err);
        setLoading(false);
      }
    };

    fetchShops();
  }, []);

  const handleSearch = (e: CustomEvent) => {
    const text = e.detail.value?.toLowerCase() || '';
    setSearchText(text);
    
    if (text === '') {
      setFilteredShops(shops);
    } else {
      const filtered = shops.filter(shop => 
        shop.name.toLowerCase().includes(text) ||
        shop.type.toLowerCase().includes(text) ||
        shop.description.toLowerCase().includes(text)
      );
      setFilteredShops(filtered);
    }
  };
  const handleRefresh = (event: CustomEvent) => {
    setTimeout(() => {
      setFilteredShops(shops);
      setSearchText('');
      event.detail.complete();
    }, 1000);
  };

  const openShopDetail = (shopId: string) => {
    history.push(`/shop/${shopId}`);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/user/profile" text="" />
          </IonButtons>
          <IonTitle>Shops</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        
        <div className="shop-list-container">
          <IonSearchbar
            value={searchText}
            onIonInput={handleSearch}
            placeholder="Search shops"
            className="shop-search"
            showClearButton="always"
          />

          {loading ? (
            <div className="loading-container">
              <IonSpinner name="crescent" />
              <p>Loading shops...</p>
            </div>
          ) : filteredShops.length > 0 ? (
            <div className="shops-grid">
              {filteredShops.map((shop) => (
                <IonCard 
                  key={shop.id} 
                  className="shop-card"
                  onClick={() => openShopDetail(shop.id)}
                >
                  <div className="shop-image-container">
                    <img 
                      src={shop.images[0]} 
                      alt={shop.name}
                      className="shop-image"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/logo_no_text.svg";
                      }}
                    />
                    <div className={`shop-status-badge ${shop.isOpen ? 'open' : 'closed'}`}>
                      {shop.isOpen ? 'Open' : 'Closed'}
                    </div>
                  </div>
                  
                  <IonCardContent>
                    <div className="shop-title">{shop.name}</div>
                    <div className="shop-subtitle">{shop.type}</div>
                    
                    <div className="shop-rating">
                      <IonIcon icon={star} color="warning" />
                      <span>{shop.rating}</span>
                      <span className="review-count">({shop.reviewsCount} reviews)</span>
                    </div>
                    
                    <div className="shop-info">
                      <div className="shop-info-item">
                        <IonIcon icon={locationOutline} />
                        <span>{shop.location.area}</span>
                      </div>
                      {shop.isOpen && (
                        <div className="shop-info-item">
                          <IonIcon icon={timeOutline} />
                          <span>Until {shop.timeTable.workingDays?.split('-')[1]}</span>
                        </div>
                      )}
                    </div>
                  </IonCardContent>
                </IonCard>
              ))}
            </div>
          ) : (
            <div className="no-shops-container">
              <p>No shops found matching "{searchText}"</p>
            </div>
          )}
        </div>
      </IonContent>

      <NavBar />
    </IonPage>
  );
};

export default ShopList;
