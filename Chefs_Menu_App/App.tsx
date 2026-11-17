import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  StyleSheet,
  SafeAreaView,
  Switch,
  Alert,
  ScrollView,
} from 'react-native';

import { Picker } from '@react-native-picker/picker';

// Types of menu items
type Category = 'Starter' | 'Main' | 'Dessert' | 'Drink';

type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: string;
  category: Category;
  available: boolean;
};




const Menu: MenuItem[] = [
  {
    id: '1',
    name: 'Chicken Burger',
    description: 'descriptionx1',
    price:'Rx',
    category: 'Starter',
    available: true,
  },
  {
    id: '2',
    name: 'Beef Steak',
    description: 'descriptionx2',
    price: 'Rx',
    category: 'Main',
    available: false,
  },
  {
    id: '3',
    name: 'Chocolate Cake',
    description: 'descriptionx3',
    price: 'Rx',
    category: 'Dessert',
    available: true,
  },
  {
    id: '4',
    name: 'Fresh Lemonade',
    description: 'descriptionx4',
    price: 'Rx',
    category: 'Drink',
    available: false,
  },
];

export default function App() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(Menu);
  const [screen, setScreen] = useState<
    'home' | 'add' | 'details' | 'edit'
  >('home');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<
    'All' | Category
  >('All');
  
  // Form state 
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState<Category>('Main');
  const [available, setAvailable] = useState(true);


  // Reset the form to default 
  const resetForm = () => {
    setName('');
    setDescription('');
    setPrice('');
    setCategory('Main');
    setAvailable(true);
  };


  // Add a new menu item to the list
  const addMenuItem = () => {

    if (!name.trim() || !description.trim() || !price.trim()) {
      Alert.alert(
        'Missing information',
        'Please complete all the fields.'
      );
      return;
    }

    const newItem: MenuItem = {
      id: Date.now().toString(),
      name: name.trim(),
      description: description.trim(),
      price: price.trim(),
      category,
      available,
    };

    setMenuItems([...menuItems, newItem]);

    resetForm();
    setScreen('home');
  };


  // Update a menu item
  const updateMenuItem = () => {

    if (!selectedItem) return;

    if (!name.trim() || !description.trim() || !price.trim()) {
      Alert.alert(
        'Missing information',
        'Please complete all the fields.'
      );
      return;
    }

    const updatedItem: MenuItem = {
      ...selectedItem,
      name: name.trim(),
      description: description.trim(),
      price: price.trim(),
      category,
      available,
    };

    setMenuItems(
      menuItems.map(item =>
        item.id === selectedItem.id
          ? updatedItem
          : item
      )
    );

    setSelectedItem(updatedItem);
    setScreen('details');
  };


  // Delete a menu item
  const deleteMenuItem = (item: MenuItem) => {

    Alert.alert(
      'Delete menu item',
      `Are you sure you want to delete ${item.name}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setMenuItems(
              menuItems.filter(menuItem => menuItem.id !== item.id)
            );

            setSelectedItem(null);
            setScreen('home');
          },
        },
      ]
    );
  };


  
  // Meal availability 
  const openDetails = (item: MenuItem) => {setSelectedItem(item);setScreen('details');};

  const openEdit = (item: MenuItem) => {

    setSelectedItem(item);

    setName(item.name);
    setDescription(item.description);
    setPrice(item.price);
    setCategory(item.category);
    setAvailable(item.available);

    setScreen('edit');
  };

  // Filter menu items
  const filteredItems = menuItems.filter(item => {

    const matchesSearch =
      item.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      item.description
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesCategory =
      categoryFilter === 'All' ||
      item.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });


  // Back to home screen
  const renderHome = () => (
    <SafeAreaView style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.title}>
          Restaurant Menu
        </Text>
      </View>

      // SEARCH BAR

      <TextInput
        style={styles.search}
        placeholder="Search menu.."
        value={search}
        onChangeText={setSearch}/>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScroll}>

        {['All', 'Starter', 'Main', 'Dessert', 'Drink'].map(
          item => (

            <Pressable
              key={item}
              onPress={() =>
                setCategoryFilter(item as 'All' | Category)
              }
              style={[
                styles.categoryButton,
                categoryFilter === item &&
                  styles.categoryButtonActive,
              ]}
            >

              <Text
                style={[
                  styles.categoryText,
                  categoryFilter === item &&
                    styles.categoryTextActive,
                ]}
              >
                {item}
              </Text>

            </Pressable>

          )
        )}

      </ScrollView>
      <FlatList
        data={filteredItems}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}

        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No menu items found.
          </Text>
        }

        renderItem={({ item }) => (

          <Pressable
            style={styles.menuCard}
            onPress={() => openDetails(item)}>

            <View style={styles.cardTop}>
              <Text style={styles.itemName}>
                {item.name}
              </Text>
              <Text style={styles.price}>
                R{item.price}
              </Text>
            </View>

            <Text style={styles.itemCategory}>
              {item.category}
            </Text>

            <Text
              style={[
                styles.availability,
                item.available
                  ? styles.available
                  : styles.unavailable,
              ]}>
              {item.available
                ? 'Available'
                : 'Unavailable'}
            </Text>
          </Pressable>
        )}/>
      <Pressable
        style={styles.addButton}
        onPress={() => {
          resetForm();
          setScreen('add');
        }}>

        <Text style={styles.addButtonText}>
          + Add new meal
        </Text>
      </Pressable>

    </SafeAreaView>

  );


  // Edit or add new item screen
  const renderForm = (isEditing: boolean) => (

    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.formContainer}>
        <Text style={styles.title}>
          {isEditing
            ? 'Edit  Item'
            : 'Add  Item'}
        </Text>

        <Text style={styles.label}>
          Dish name
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter dish name"
          value={name}
          onChangeText={setName}/>

        <Text style={styles.label}>
          Description
        </Text>

        <TextInput
          style={[
            styles.input,
            styles.descriptionInput,
          ]}
          placeholder=""
          value={description}
          onChangeText={setDescription}
          multiline/>

        <Text style={styles.label}>
          Price
        </Text>

        <TextInput
          style={styles.input}
          placeholder=""
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"/>

        <Text style={styles.label}>
          Category
        </Text>

        <View style={styles.pickerContainer}>

          <Picker
            selectedValue={category}
            onValueChange={value =>
              setCategory(value as Category)
            } >
            <Picker.Item label="Starter" value="Starter"/>
            <Picker.Item label="Main" value="Main" />
            <Picker.Item label="Dessert" value="Dessert"/>
            <Picker.Item label="Drink" value="Drink" />
          </Picker>

        </View>

        <View style={styles.switchRow}>

          <View>

            <Text style={styles.label}>
              Availability
            </Text>

          </View>

          <Switch
            value={available}
            onValueChange={setAvailable}/>

        </View>

        <Pressable
          style={styles.primaryButton}
          onPress={
            isEditing
              ? updateMenuItem
              : addMenuItem
          }
        >

          <Text style={styles.primaryButtonText}>
            {isEditing
              ? 'Save changes'
              : 'Save item'}
          </Text>

        </Pressable>

        <Pressable
          style={styles.secondaryButton}
          onPress={() =>
            setScreen(
              isEditing
                ? 'details'
                : 'home'
            )
          } >

          <Text style={styles.secondaryButtonText}>
            Cancel
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>

  );

  const renderDetails = () => {

    if (!selectedItem) {
      return null;
    }

    function toggleAvailability(selectedItem: MenuItem): void {
      throw new Error('Function not implemented.');
    }

    return (

      <SafeAreaView style={styles.container}>

        <ScrollView
          contentContainerStyle={styles.detailsContainer}
        >
          <Pressable
            style={styles.backButton}
            onPress={() => setScreen('home')}
          >

            <Text style={styles.backButtonText}>
              <Text style={{ fontSize: 18 }}>
                {'< '}
              </Text>
              Back to menu
            </Text>
          </Pressable>
          <Text style={styles.title}>
            Details
          </Text>
          <View style={styles.detailsCard}>

            <Text style={styles.detailsName}>
              {selectedItem.name}
            </Text>

            <Text style={styles.detailsCategory}>
              {selectedItem.category}
            </Text>

            <Text style={styles.detailsPrice}>
              R{selectedItem.price}
            </Text>

            <Text
              style={[
                styles.availability,
                selectedItem.available
                  ? styles.available
                  : styles.unavailable,
              ]}
            >
              {selectedItem.available
                ? 'Available'
                : 'Unavailable'}
            </Text>


            <View style={styles.divider} />


            <Text style={styles.detailLabel}>
              Description
            </Text>

            <Text style={styles.detailText}>
              {selectedItem.description}
            </Text>

          </View>

          <Pressable
            style={styles.primaryButton}
            onPress={() =>
              openEdit(selectedItem)
            }
          >

            <Text style={styles.primaryButtonText}>
              Edit 
            </Text>

          </Pressable>


         

          <Pressable
            style={styles.secondaryButton}
            onPress={() =>
              toggleAvailability(selectedItem)
            }
          >

            <Text style={styles.secondaryButtonText}>
              {selectedItem.available
                ? 'Unavailable'
                : 'Mark available'}
            </Text>

          </Pressable>

          <Pressable
            style={styles.deleteButton}
            onPress={() =>
              deleteMenuItem(selectedItem)
            }
          >

            <Text style={styles.deleteButtonText}>
              Delete this item
            </Text>

          </Pressable>

        </ScrollView>

      </SafeAreaView>

    );
  };

    
  if (screen === 'home') {
    return renderHome();
  }

  if (screen === 'add') {
    return renderForm(false);
  }

  if (screen === 'edit') {
    return renderForm(true);
  }

  if (screen === 'details') {
    return renderDetails();
  }

  return null;
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },

  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },

  title: {
    fontSize: 40,
    fontWeight: '700',
    fontFamily: 'Bold',
    color: '#1F2937',
    marginBottom: 5,
  },

  subtitle: {
    fontSize: 14,
    color: '#6B7280',
  },

  search: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 10,
    paddingHorizontal: 15,
    paddingVertical: 13,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    fontSize: 15,
  },

  categoryScroll: {
    paddingLeft: 20,
    marginTop: 15,
    maxHeight: 45,
  },

  categoryButton: {
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 20,
    backgroundColor: '#E5E7EB',
    marginRight: 8,
  },

  categoryButtonActive: {
    backgroundColor: '#3B82F6',
  },

  categoryText: {
    color: '#374151',
    fontWeight: '600',
  },

  categoryTextActive: {
    color: '#FFFFFF',
  },

  list: {
    padding: 20,
    paddingBottom: 100,
  },

  menuCard: {
    backgroundColor: '#FFFFFF',
    padding: 17,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  itemName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1F2937',
    flex: 1,
  },

  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
  },

  itemCategory: {
    marginTop: 5,
    fontSize: 13,
    color: '#6B7280',
  },

  availability: {
    marginTop: 8,
    fontWeight: '600',
    fontSize: 13,
  },

  available: {
    color: '#16A34A',
  },

  unavailable: {
    color: '#DC2626',
  },

  addButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#F97316',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
  },

  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  formContainer: {
    padding: 20,
    paddingBottom: 40,
  },

  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#374151',
    marginTop: 18,
    marginBottom: 7,
  },

  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 9,
    paddingHorizontal: 13,
    paddingVertical: 13,
    fontSize: 15,
  },

  descriptionInput: {
    minHeight: 90,
    textAlignVertical: 'top',
  },

  pickerContainer: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 9,
    overflow: 'hidden',
  },

  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },

  helperText: {
    color: '#6B7280',
    fontSize: 12,
  },

  primaryButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 15,
    borderRadius: 9,
    alignItems: 'center',
    marginTop: 12,
  },

  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },

  secondaryButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    paddingVertical: 15,
    borderRadius: 9,
    alignItems: 'center',
    marginTop: 10,
  },

  secondaryButtonText: {
    color: '#374151',
    fontSize: 15,
    fontWeight: '700',
  },

  deleteButton: {
    backgroundColor: '#FEE2E2',
    paddingVertical: 15,
    borderRadius: 9,
    alignItems: 'center',
    marginTop: 10,
  },

  deleteButtonText: {
    color: '#DC2626',
    fontSize: 15,
    fontWeight: '700',
  },

  backButton: {
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 5,
  },

  backButtonText: {
    color: '#3B82F6',
    fontWeight: '600',
  },

  detailsContainer: {
    padding: 20,
  },

  detailsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  detailsName: {
    fontSize: 40,
    fontWeight: '700',
    color: '#1F2937',
  },

  detailsCategory: {
    marginTop: 6,
    color: '#6B7280',
    fontSize: 14,
  },

  detailsPrice: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 12,
    color: '#1F2937',
  },

  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 18,
  },

  detailLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 6,
  },

  detailText: {
    fontSize: 15,
    color: '#4B5563',
    lineHeight: 22,
  },

  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    color: '#6B7280',
  },

});