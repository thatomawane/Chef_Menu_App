import React from 'react';
import {
  View,
  Text,
  FlatList,
  Switch,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

import { useMenu } from '../context/MenuContext';

const categoryLabels: Record<string, string> = {
  Starter: 'Starter',
  Main: 'Main Course',
  Dessert: 'Dessert',
  Drink: 'Drink',
};

export default function MenuScreen() {
  const { menuItems, deleteMenuItem, toggleAvailability } = useMenu();

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
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.content}
      data={menuItems}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <View>
          <Text style={styles.title}>Manage Menu</Text>
          <Text style={styles.subtitle}>
            Update availability or remove items from your menu.
          </Text>
        </View>
      }
      ListEmptyComponent={
        <Text style={styles.emptyText}>
          No menu items yet. Add one from the Add Item tab.
        </Text>
      }
      renderItem={({ item }) => (
        <View style={styles.card}>
          <View style={styles.cardTop}>
            <View style={styles.cardInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
            </View>
            <Text style={styles.price}>R{item.price}</Text>
          </View>

          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>
              {categoryLabels[item.category] ?? item.category}
            </Text>
          </View>

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
  emptyText: {
    textAlign: 'center',
    color: '#6B7280',
    marginTop: 40,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardInfo: {
    flex: 1,
    paddingRight: 12,
  },
  itemName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3B82F6',
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#E5E7EB',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginTop: 12,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#374151',
  },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  availabilityRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  availabilityText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
  },
  availableText: {
    color: '#16A34A',
  },
  unavailableText: {
    color: '#DC2626',
  },
  deleteButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DC2626',
  },
  deleteButtonText: {
    color: '#DC2626',
    fontSize: 13,
    fontWeight: '600',
  },
});