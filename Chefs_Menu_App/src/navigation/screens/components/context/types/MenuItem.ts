
export type Category = 'Starter' | 'Main' | 'Dessert' | 'Drink';

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: string;
  category: Category;
  available: boolean;
};
