
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

import { useMenu } from '../context/MenuContext';
import type { Category } from '../types/MenuItem';

type FilterCategory = Category | 'All';

const categories: { label: string; value: FilterCategory }[] = [
  { label: 'All', value: 'All' },
  { label: 'Starter', value: 'Starter' },
  { label: 'Main Course', value: 'Main' },
  { label: 'Dessert', value: 'Dessert' },
  { label: 'Drink', value: 'Drink' },
];

export default function MenuScreen() {
  const handleDeleteItem = (id: string, name: string) => {
  Alert.alert(
    'Delete Menu Item',
    `Are you sure you want to delete ${name}?`,
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          deleteMenuItem(id);
        },
      },
    ]
  );
};
  const { menuItems, deleteMenuItem } = useMenu();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] =
    useState<FilterCategory>('All');

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' ||
      item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Menu</Text>
      <Text style={styles.subtitle}>
        View and manage your restaurant's menu items.
      </Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Search menu items..."
        value={search}
        onChangeText={setSearch}
      />

      <Text style={styles.sectionTitle}>Filter by course</Text>

      <View style={styles.filterContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.value}
            style={[
              styles.filterButton,
              selectedCategory === category.value &&
                styles.activeFilter,
            ]}
            onPress={() => setSelectedCategory(category.value)}
          >
            <Text
              style={[
                styles.filterText,
                selectedCategory === category.value &&
                  styles.activeFilterText,
              ]}
            >
              {category.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.resultCount}>
        {filteredItems.length} menu item(s)
      </Text>

      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No menu items found. Try another search or filter.
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.menuCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.price}>
                R{Number(item.price).toFixed(2)}
              </Text>
            </View>

            <Text style={styles.description}>
              {item.description}
            </Text>
            
            <View style={styles.cardFooter}>
              <Text style={styles.category}>
                {item.category === 'Main' ? 'Main Course' : item.category}
                </Text>
                
                <Text style={[styles.availability,!item.available && styles.unavailable,]}>
                  {item.available ? 'Available' : 'Unavailable'}
                  </Text>
                  
                  <TouchableOpacity style={styles.deleteButton}
                  onPress={() => handleDeleteItem(item.id, item.name)}>
                    <Text style={styles.deleteButtonText}>Delete</Text>
                    </TouchableOpacity>
                    </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 20,
    fontSize: 15,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 18,
  },
  filterButton: {
    paddingVertical: 9,
    paddingHorizontal: 13,
    borderRadius: 20,
    backgroundColor: '#E5E7EB',
  },
  activeFilter: {
    backgroundColor: '#3B82F6',
  },
  filterText: {
    color: '#374151',
    fontSize: 13,
  },
  activeFilterText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  resultCount: {
    color: '#6B7280',
    fontSize: 13,
    marginBottom: 12,
  },
  listContent: {
    paddingBottom: 20,
  },
  menuCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1F2937',
    flex: 1,
    marginRight: 10,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3B82F6',
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  category: {
    color: '#374151',
    fontSize: 13,
    fontWeight: '600',
  },
  availability: {
    color: '#16A34A',
    fontSize: 13,
    fontWeight: '600',
  },
  unavailable: {
    color: '#DC2626',
  },
  emptyText: {
    textAlign: 'center',
    color: '#6B7280',
    marginTop: 30,
  },
});
