export interface TeaRekzItem {
  name: string;
  price?: number;
  description: string;
  icon?: string;
}

export interface TeaRekzSection {
  name: string;
  icon: string;
  color: string;
  basePrice?: number;
  description?: string;
  items: TeaRekzItem[];
}

export interface TeaRekzCustomization {
  ice: {
    icon: string;
    options: string[];
  };
  sweetness: {
    icon: string;
    options: string[];
  };
}

export interface TeaRekzLogo {
  name: string;
  subtitle: string;
  icon: string;
}

export interface TeaRekzMenu {
  name: string;
  guid: string;
  description: string;
  logo: TeaRekzLogo;
  sections: TeaRekzSection[];
  customization: TeaRekzCustomization;
}
