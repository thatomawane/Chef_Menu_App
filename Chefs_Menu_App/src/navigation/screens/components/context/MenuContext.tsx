
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from 'react';

import { MenuItem } from '../types/MenuItem';

// Initial menu data
const initialMenu: MenuItem[] = [
  {
    id: '1',
    name: 'Chicken Burger',
    description: 'Grilled chicken burger',
    price: '65',
    category: 'Starter',
    available: true,
  },
  {
    id: '2',
    name: 'Beef Steak',
    description: 'Grilled beef steak',
    price: '120',
    category: 'Main',
    available: false,
  },
  {
    id: '3',
    name: 'Chocolate Cake',
    description: 'Rich chocolate cake',
    price: '45',
    category: 'Dessert',
    available: true,
  },
  {
    id: '4',
    name: 'Fresh Lemonade',
    description: 'Freshly squeezed lemonade',
    price: '25',
    category: 'Drink',
    available: true,
  },
];

// Define context functions
type MenuContextType = {
  menuItems: MenuItem[];
  addMenuItem: (item: MenuItem) => void;
  updateMenuItem: (item: MenuItem) => void;
  deleteMenuItem: (id: string) => void;
  toggleAvailability: (id: string) => void;
};

const MenuContext = createContext<MenuContextType | undefined>(
  undefined
);

// Provider
export const MenuProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(
    initialMenu
  );

  // Add item
  const addMenuItem = (item: MenuItem) => {
    setMenuItems(previous => [...previous, item]);
  };

  // Update item
  const updateMenuItem = (updatedItem: MenuItem) => {
    setMenuItems(previous =>
      previous.map(item =>
        item.id === updatedItem.id ? updatedItem : item
      )
    );
  };

  // Delete item
  const deleteMenuItem = (id: string) => {
    setMenuItems(previous =>
      previous.filter(item => item.id !== id)
    );
  };

  // Toggle availability
  const toggleAvailability = (id: string) => {
    setMenuItems(previous =>
      previous.map(item =>
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
};

// Custom hook
export const useMenu = () => {
  const context = useContext(MenuContext);

  if (!context) {
    throw new Error(
      'useMenu must be used inside MenuProvider'
    );
  }

  return context;
};
