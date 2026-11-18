import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Switch,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

import { useMenu } from '../context/MenuContext';

const filters = [
  { label: 'All', value: 'All' },
  { label: 'Starters', value: 'Starter' },
  { label: 'Mains', value: 'Main' },
  { label: 'Desserts', value: 'Dessert' },
  { label: 'Drinks', value: 'Drink' },
];

export default function MenuScreen() {
  const { menuItems, deleteMenuItem, toggleAvailability } = useMenu();

  const [search, setSearch] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  const visibleItems = menuItems.filter((item) => {
    const matchesCategory =
      selectedFilter === 'All' || item.category === selectedFilter;
    const query = search.trim().toLowerCase();
    const matchesSearch =
      !query ||
      item.name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  const confirmDelete = (id: string, name: string) => {
    Alert.alert('Delete item', `Remove ${name} from your menu?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => deleteMenuItem(id),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Restaurant Menu</Text>

        <TextInput
          style={styles.searchInput}
          placeholder="Search menu items..."
          value={search}
          onChangeText={setSearch}
        />

        <Text style={styles.sectionLabel}>Categories</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.chipRow}
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.value}
              style={[
                styles.chip,
                selectedFilter === filter.value && styles.chipSelected,
              ]}
              onPress={() => setSelectedFilter(filter.value)}
            >
              <Text
                style={[
                  styles.chipText,
                  selectedFilter === filter.value && styles.chipTextSelected,
                ]}
              >
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.menuItemsTitle}>Menu items</Text>
      </View>

      <FlatList
        data={visibleItems}
        keyExtractor={(item) => item.id}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No menu items found.</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>R{item.price}</Text>

            <View style={styles.cardBottom}>
              <View style={styles.availabilityRow}>
                <Switch
                  value={item.available}
                  onValueChange={() => toggleAvailability(item.id)}
                  trackColor={{ false: '#FCA5A5', true: '#86EFAC' }}
                  thumbColor={item.available ? '#16A34A' : '#DC2626'}
                />
                <Text
                  style={[
                    styles.availabilityText,
                    item.available ? styles.availableText : styles.unavailableText,
                  ]}
                >
                  {item.available ? 'Available' : 'Not Available'}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => confirmDelete(item.id, item.name)}
              >
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
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    fontSize: 14,
    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
  },
  chipRow: {
    gap: 8,
    paddingBottom: 4,
  },
  chip: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingVertical: 7,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  chipSelected: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  chipText: {
    fontSize: 13,
    color: '#374151',
    fontWeight: '500',
  },
  chipTextSelected: {
    color: '#FFFFFF',
  },
  menuItemsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 16,
    marginBottom: 10,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  emptyText: {
    textAlign: 'center',
    color: '#6B7280',
    marginTop: 30,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  itemName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  itemPrice: {
    fontSize: 14,
    color: '#374151',
    marginTop: 6,
    marginLeft: 8,
  },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  availabilityRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  availabilityText: {
    marginLeft: 6,
    fontSize: 13,
    fontWeight: '600',
  },
  availableText: {
    color: '#16A34A',
  },
  unavailableText: {
    color: '#DC2626',
  },
  deleteButton: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DC2626',
  },
  deleteButtonText: {
    color: '#DC2626',
    fontSize: 12,
    fontWeight: '600',
  },
});