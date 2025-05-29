import { 
  createOutline, 
  globeOutline, 
  cardOutline, 
  locationOutline, 
  mailOpenOutline,
  notificationsOutline, 
  settingsOutline, 
  helpCircleOutline, 
  lockClosedOutline
} from 'ionicons/icons';
import { UserProfile, MenuSection } from '../types/profile';

export const userProfileMock: UserProfile = {
  id: '45ty69',
  fullName: 'Luca Fortino',
  email: 'luca.fortino@gmail.com',
  phone: '+39 123 567 8921',
  avatarUrl: '/profile/avatar.png',
  language: 'English'
};

export const menuSections: MenuSection[] = [
  {
    id: 'account',
    items: [
      { icon: createOutline, label: 'Edit profile', route: '/user/edit-profile' },
      { icon: globeOutline, label: 'Language', endText: 'English', route: '/user/language' },
      { icon: cardOutline, label: 'Payment Method', route: '/user/payment-method' },      { icon: locationOutline, label: 'Modify Address', route: '/user/address' },
      { icon: mailOpenOutline, label: 'My orders', route: '/user/tracking' }
    ]
  },
  {
    id: 'settings',
    items: [
      { icon: notificationsOutline, label: 'Notifications', route: '/user/notifications' },
      { icon: settingsOutline, label: 'Settings', route: '/user/settings' }
    ]
  },
  {
    id: 'support',
    items: [
      { icon: helpCircleOutline, label: 'Help & Support', route: '/user/help' },
      { icon: lockClosedOutline, label: 'Privacy policy', route: '/user/privacy' },
      { icon: null, label: 'Switch to Seller account', action: () => console.log('Switch to seller account') }
    ]
  }
];