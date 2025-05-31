import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

interface GoogleMapProps {
  lat: number;
  lng: number;
  zoom?: number;
  width?: string;
  height?: string;
  className?: string;
  markerTitle?: string;
  onMapClick?: () => void;
}

const GoogleMap: React.FC<GoogleMapProps> = ({
  lat,
  lng,
  zoom = 15,
  width = '100%',
  height = '200px',
  className = '',
  markerTitle = 'Posizione',
  onMapClick
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapError, setMapError] = useState(false);

  useEffect(() => {
    const initMap = async () => {
      try {
        // API Key di Google Maps (sostituisci con la tua)
        const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY_HERE';
        
        const loader = new Loader({
          apiKey: API_KEY,
          version: 'weekly',
          libraries: ['places']
        });

        const { Map } = await loader.importLibrary('maps');
        const { AdvancedMarkerElement } = await loader.importLibrary('marker');        if (mapRef.current) {          const map = new Map(mapRef.current, {
            center: { lat, lng },
            zoom,
            mapId: 'flybag_shop_map', // ID per abilitare advanced markers
            // Disabilita tutti i controlli UI
            disableDefaultUI: true,
            // Riabilita solo zoom e pan
            zoomControl: false,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: false,
            // Riabilita gesti per zoom e pan
            gestureHandling: 'cooperative',
            // Disabilita click sui POI
            clickableIcons: false,
            styles: [
              // Stile personalizzato per nascondere POI e disabilitare interazioni
              {
                featureType: 'poi',
                elementType: 'labels',
                stylers: [{ visibility: 'off' }]
              },
              {
                featureType: 'poi',
                elementType: 'geometry',
                stylers: [{ visibility: 'simplified' }]
              },
              {
                featureType: 'poi.business',
                stylers: [{ visibility: 'off' }]
              },
              {
                featureType: 'poi.attraction',
                stylers: [{ visibility: 'off' }]
              },
              {
                featureType: 'poi.government',
                stylers: [{ visibility: 'off' }]
              },
              {
                featureType: 'poi.medical',
                stylers: [{ visibility: 'off' }]
              },
              {
                featureType: 'poi.park',
                stylers: [{ visibility: 'off' }]
              },
              {
                featureType: 'poi.place_of_worship',
                stylers: [{ visibility: 'off' }]
              },
              {
                featureType: 'poi.school',
                stylers: [{ visibility: 'off' }]
              },
              {
                featureType: 'poi.sports_complex',
                stylers: [{ visibility: 'off' }]
              }
            ]
          });

          // Aggiungi marker personalizzato
          const marker = new AdvancedMarkerElement({
            map,
            position: { lat, lng },
            title: markerTitle,
          });

          // Aggiungi click listener se fornito
          if (onMapClick) {
            map.addListener('click', onMapClick);
          }
        }
      } catch (error) {
        console.error('Errore nel caricamento di Google Maps:', error);
        setMapError(true);
      }
    };

    initMap();
  }, [lat, lng, zoom, markerTitle, onMapClick]);

  if (mapError) {
    // Fallback: mappa sfocata se Google Maps non funziona
    return (
      <div 
        className={`map-fallback ${className}`}
        style={{ width, height, position: 'relative', cursor: 'pointer' }}
        onClick={onMapClick}
      >
        <img
          src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=400&h=200&fit=crop&crop=center&auto=format&q=30&blur=2"
          alt="Map fallback"
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover',
            borderRadius: '12px',
            filter: 'blur(1px) brightness(0.8)'
          }}
        />
        <div style={{
          position: 'absolute',
          bottom: '16px',
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'white',
          background: 'rgba(0, 196, 147, 0.9)',
          padding: '8px 16px',
          borderRadius: '20px',
          fontSize: '14px',
          fontWeight: '600'
        }}>
          📍 {markerTitle}
        </div>
      </div>
    );
  }
  return (
    <div style={{ position: 'relative' }}>
      <div 
        ref={mapRef} 
        className={className}
        style={{ width, height, borderRadius: '12px' }}
      />
      <style>
        {`
          /* Nasconde tutti i controlli testuali di Google Maps */
          .gm-style-cc {
            display: none !important;
          }
          
          /* Nasconde i link delle scorciatoie da tastiera */
          .gm-style .gm-style-cc > div {
            display: none !important;
          }
          
          /* Nasconde l'attributo "Dati mappa" */
          .gm-style .gm-style-cc a {
            display: none !important;
          }
          
          /* Nasconde tutti i controlli della mappa */
          .gm-style .gmnoprint {
            display: none !important;
          }
          
          /* Nasconde eventuali altri controlli di testo */
          .gm-style .gm-style-mtc {
            display: none !important;
          }
        `}
      </style>
    </div>
  );
};

export default GoogleMap;
