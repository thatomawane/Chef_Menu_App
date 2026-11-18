
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from 'react';

import type { MenuItem } from '../types/MenuItem';

type MenuContextType = {
  menuItems: MenuItem[];
  addMenuItem: (item: MenuItem) => void;
  updateMenuItem: (updatedItem: MenuItem) => void;
  deleteMenuItem: (id: string) => void;
  toggleAvailability: (id: string) => void;
};

const initialMenu: MenuItem[] = [
  // STARTERS
  {
    id: '1',
    name: 'Chicken Burger',
    description:
      'A juicy grilled chicken patty topped with fresh lettuce, tomato and creamy mayonnaise, served in a toasted burger bun.',
    price: '65',
    category: 'Starter',
    available: true,
  },
  {
    id: '2',
    name: 'Crispy Chicken Wings',
    description:
      'Golden-fried chicken wings coated in a smoky BBQ glaze and served with a creamy dipping sauce.',
    price: '55',
    category: 'Starter',
    available: true,
  },
  {
    id: '3',
    name: 'Loaded Nachos',
    description:
      'Crunchy tortilla chips topped with melted cheese, fresh salsa, jalapeños and sour cream.',
    price: '60',
    category: 'Starter',
    available: true,
  },
  {
    id: '4',
    name: 'Golden Calamari',
    description:
      'Tender calamari rings lightly coated in seasoned crumbs and fried until golden, served with lemon and tartar sauce.',
    price: '75',
    category: 'Starter',
    available: true,
  },

  // MAIN COURSES
  {
    id: '5',
    name: 'Beef Steak',
    description:
      'A tender, perfectly grilled beef steak seasoned with herbs and spices, served with crispy chips and seasonal vegetables.',
    price: '120',
    category: 'Main',
    available: true,
  },
  {
    id: '6',
    name: 'Grilled Chicken Breast',
    description:
      'Juicy grilled chicken breast seasoned with herbs and spices, served with creamy mashed potatoes and seasonal vegetables.',
    price: '95',
    category: 'Main',
    available: true,
  },
  {
    id: '7',
    name: 'Beef Lasagne',
    description:
      'Layers of pasta filled with rich minced beef sauce, creamy béchamel and melted cheese, baked until golden.',
    price: '110',
    category: 'Main',
    available: true,
  },
  {
    id: '8',
    name: 'Chicken Alfredo Pasta',
    description:
      'Pasta tossed in a smooth garlic cream sauce with grilled chicken and a sprinkle of parmesan cheese.',
    price: '105',
    category: 'Main',
    available: true,
  },
  {
    id: '9',
    name: 'Fish and Chips',
    description:
      'Crispy battered fish served with golden chips, fresh lemon and homemade tartar sauce.',
    price: '100',
    category: 'Main',
    available: true,
  },
  {
    id: '10',
    name: 'Pepperoni Pizza',
    description:
      'Freshly baked pizza topped with tomato sauce, mozzarella cheese and slices of spicy pepperoni.',
    price: '115',
    category: 'Main',
    available: true,
  },

  // DESSERTS
  {
    id: '11',
    name: 'Chocolate Cake',
    description:
      'A soft and rich chocolate cake layered with smooth chocolate icing, perfect for anyone with a sweet tooth.',
    price: '45',
    category: 'Dessert',
    available: true,
  },
  {
    id: '12',
    name: 'Chocolate Brownie',
    description:
      'A rich, fudgy chocolate brownie served warm with a scoop of creamy vanilla ice cream.',
    price: '50',
    category: 'Dessert',
    available: true,
  },
  {
    id: '13',
    name: 'Strawberry Cheesecake',
    description:
      'Smooth, creamy cheesecake on a buttery biscuit base, finished with a sweet strawberry topping.',
    price: '55',
    category: 'Dessert',
    available: true,
  },
  {
    id: '14',
    name: 'Classic Tiramisu',
    description:
      'Coffee-soaked sponge fingers layered with light mascarpone cream and dusted with cocoa powder.',
    price: '60',
    category: 'Dessert',
    available: true,
  },
  {
    id: '15',
    name: 'Vanilla Ice Cream Sundae',
    description:
      'Three scoops of vanilla ice cream topped with chocolate sauce, crushed nuts and a cherry.',
    price: '45',
    category: 'Dessert',
    available: true,
  },

  // DRINKS
  {
    id: '16',
    name: 'Fresh Lemonade',
    description:
      'A refreshing homemade lemonade prepared with freshly squeezed lemons, water and a touch of sweetness.',
    price: '25',
    category: 'Drink',
    available: true,
  },
];

const MenuContext = createContext<MenuContextType | undefined>(undefined);

type MenuProviderProps = {
  children: ReactNode;
};

export function MenuProvider({ children }: MenuProviderProps) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenu);

  const addMenuItem = (item: MenuItem) => {
    setMenuItems((currentItems) => [...currentItems, item]);
  };

  const updateMenuItem = (updatedItem: MenuItem) => {
    setMenuItems((currentItems) =>
      currentItems.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      )
    );
  };

  const deleteMenuItem = (id: string) => {
    setMenuItems((currentItems) =>
      currentItems.filter((item) => item.id !== id)
    );
  };

  const toggleAvailability = (id: string) => {
    setMenuItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id
          ? { ...item, available: !item.available }
          : item
      )
    );
  };

  return (
    <MenuContext.Provider
      value={{
        menuItems,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        toggleAvailability,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  const context = useContext(MenuContext);

  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider');
  }

  return context;
}
