
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useMenu } from '../context/MenuContext';

export default function DashboardScreen() {
  const { menuItems } = useMenu();

  const totalItems = menuItems.length;

  const totalPrice = menuItems.reduce(
    (sum, item) => sum + Number(item.price || 0),
    0
  );

  const averagePrice =
    totalItems > 0 ? totalPrice / totalItems : 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chef's Menu Manager</Text>
      <Text style={styles.subtitle}>Dashboard Overview</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Total Menu Items</Text>
        <Text style={styles.value}>{totalItems}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Average Menu Price</Text>
        <Text style={styles.value}>
          R{averagePrice.toFixed(2)}
        </Text>
      </View>
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
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
  },
  label: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  value: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3B82F6',
  },
});
