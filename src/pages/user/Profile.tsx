import React from 'react';
import { 
  IonPage, 
  IonContent, 
  IonButton, 
  IonAvatar, 
  IonText, 
  IonCard, 
  IonItem, 
  IonLabel, 
  IonIcon 
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { add, createOutline } from 'ionicons/icons';
import './Profile.css';

// Importa i dati parametrizzati
import { userProfileMock, menuSections } from '../../data/profileData';
import { MenuItem } from '../../types/profile';

const Profile: React.FC = () => {
  const history = useHistory();
  const user = userProfileMock; // In futuro sarà sostituito con dati da API
  
  const handleItemClick = (item: MenuItem) => {
    if (item.action) {
      item.action();
    } else if (item.route) {
      history.push(item.route);
    }
  };
  
  const handleLogout = () => {
    console.log('Logout');
    // Implementare la logica di logout
  };
  
  const handleDeleteAccount = () => {
    console.log('Delete account');
    // Implementare la logica di eliminazione account
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        {/* Profile ID */}
        <div className="profile-id">ID: {user.id}</div>
        
        {/* Profile Header */}
        <div className="profile-header">
          <div className="avatar-container">
            <IonAvatar className="profile-avatar">
              <img src={user.avatarUrl} alt="Profile" />
            </IonAvatar>
            <div className="edit-icon">
              <IonIcon icon={createOutline} />
            </div>
          </div>
          
          <h1 className="profile-name">{user.fullName}</h1>
          <p className="profile-contact">{user.email} | {user.phone}</p>
          
          <IonButton expand="block" className="add-friend-btn">
            <IonIcon slot="start" icon={add} />
            Add Friend
          </IonButton>
        </div>
        
        {/* Menu Sections - Generati dinamicamente dai dati */}
        {menuSections.map((section) => (
          <IonCard key={section.id} className="profile-card">
            {section.items.map((item, index) => (
              <IonItem 
                key={`${section.id}-${index}`} 
                lines={index === section.items.length - 1 ? "none" : "full"} 
                detail={false}
                className={item.label === 'Switch to Seller account' ? 'seller-switch' : ''}
                onClick={() => handleItemClick(item)}
              >
                {item.icon && <IonIcon icon={item.icon} slot="start" />}
                <IonLabel className={item.label === 'Switch to Seller account' ? 'seller-label' : ''}>
                  {item.label}
                </IonLabel>
                {item.endText && <IonText color="primary" slot="end">{item.endText}</IonText>}
              </IonItem>
            ))}
          </IonCard>
        ))}
        
        {/* Bottom Buttons */}
        <div className="bottom-actions">
          <IonButton expand="block" className="logout-btn" onClick={handleLogout}>
            Log Out
          </IonButton>
          
          <IonButton expand="block" fill="outline" className="delete-btn" onClick={handleDeleteAccount}>
            Delete account
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Profile;