
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';

import { useMenu } from '../context/MenuContext';
import type { Category } from '../types/MenuItem';

const categories: { label: string; value: Category }[] = [
  { label: 'Starter', value: 'Starter' },
  { label: 'Main Course', value: 'Main' },
  { label: 'Dessert', value: 'Dessert' },
  { label: 'Drink', value: 'Drink' },
];

export default function AddMenuItemScreen() {
  const { addMenuItem } = useMenu();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState<Category>('Starter');

  const handleAddItem = () => {
    const trimmedName = name.trim();
    const trimmedDescription = description.trim();
    const numericPrice = Number(price);

    if (!trimmedName || !trimmedDescription || !price.trim()) {
      Alert.alert('Missing information', 'Please complete all fields.');
      return;
    }

    if (!Number.isFinite(numericPrice) || numericPrice <= 0) {
      Alert.alert('Invalid price', 'Enter a valid price greater than R0.');
      return;
    }

    addMenuItem({
      id: Date.now().toString(),
      name: trimmedName,
      description: trimmedDescription,
      price: numericPrice.toString(),
      category,
      available: true,
    });

    Alert.alert('Success', `${trimmedName} has been added to your menu.`);

    setName('');
    setDescription('');
    setPrice('');
    setCategory('Starter');
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>Add Menu Item</Text>
      <Text style={styles.subtitle}>
        Add a new dish or drink to your restaurant menu.
      </Text>

      <Text style={styles.label}>Item Name</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Grilled Chicken"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.descriptionInput]}
        placeholder="Describe the menu item..."
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text style={styles.label}>Price (R)</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. 85.00"
        value={price}
        onChangeText={setPrice}
        keyboardType="decimal-pad"
      />

      <Text style={styles.label}>Select Course</Text>

      <View style={styles.categoryContainer}>
        {categories.map((item) => (
          <TouchableOpacity
            key={item.value}
            style={[
              styles.categoryButton,
              category === item.value && styles.selectedCategory,
            ]}
            onPress={() => setCategory(item.value)}
          >
            <Text
              style={[
                styles.categoryText,
                category === item.value && styles.selectedCategoryText,
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddItem}
      >
        <Text style={styles.addButtonText}>Add Menu Item</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
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
    marginBottom: 24,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    padding: 14,
    fontSize: 15,
    marginBottom: 20,
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 28,
  },
  categoryButton: {
    backgroundColor: '#E5E7EB',
    paddingVertical: 11,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  selectedCategory: {
    backgroundColor: '#3B82F6',
  },
  categoryText: {
    color: '#374151',
    fontWeight: '500',
  },
  selectedCategoryText: {
    color: '#FFFFFF',
  },
  addButton: {
    backgroundColor: '#3B82F6',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
