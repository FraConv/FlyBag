export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  avatarUrl: string;
  language: string;
}

export interface MenuItem {
  icon: string;
  label: string;
  endText?: string;
  route?: string;
  action?: () => void;
}

export interface MenuSection {
  id: string;
  items: MenuItem[];
}