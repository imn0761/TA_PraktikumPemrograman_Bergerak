import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const tabs = createBottomTabNavigator();
const Stack = createStackNavigator();

//Halaman Login
const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    navigation.replace('Screen');
  };

  return (
    <View style={styles.loginContainer}>
      <Text style={styles.loginTitle}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

// Menampilkan item pada halaman Home 
const initialItems = [
  {
        id: '1',
        name: 'CIVIC Turbo',
        price: '1500',
        image:
          'https://res.cloudinary.com/mufautoshow/image/upload/f_auto,f_auto/w_1200/v1684329145/moas/news/1684329151_honda-civic-type-r-6-hatchback-sport-nyaris-sempurna.png',
      },
      {
        id: '2',
        name: 'Miata MX',
        price: '1000',
        image:
          'https://i.pinimg.com/564x/49/ec/f5/49ecf59532a2558893d60bdb3c42663c.jpg',
      },
      {
        id: '3',
        name: 'Supra',
        price: '2000',
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtL3NE1qw9CsOuFkX9iIiVFFzb7nC-eN1QdIGcGT-Qxg&s',
      },
  {
    id: '4',
    name: 'Pajero',
    price: '1000',
    image:
      'https://i.pinimg.com/564x/bd/4d/59/bd4d59b9bdf5ff871b8286bb39f62490.jpg',
  },
  {
    id: '5',
    name: 'Hino',
    price: '8000',
    image:
      'https://i.pinimg.com/564x/cb/5e/0f/cb5e0f3a9313b688380ddc274db44091.jpg',
  },
  {
    id: '6',
    name: 'Evora',
    price: '4000',
    image:
      'https://i.pinimg.com/564x/55/67/40/5567408ad8bd3fa201053f5b014b5557.jpg',
  },
  {
    id: '7',
    name: 'Rubiccon',
    price: '5000',
    image: 'https://i.pinimg.com/564x/c5/9e/ed/c59eed2a538e8d5efa8e91fa05ebc7e3.jpg',
  },
  {
    id: '8',
    name: 'Jimmy',
    price: '4500',
    image:
      'https://i.pinimg.com/564x/46/ad/87/46ad875c1c80e04ad3f0d416b3a66805.jpg',
  },
  {
    id: '9',
    name: 'Mercedes',
    price: '2000',
    image:
      'https://i.pinimg.com/564x/50/ea/74/50ea74172f59b53f8d79fc7e0f1d3fd1.jpg',
  },
];

//Penggunaan scroll view pada Home Screen
const HomeScreen = ({ items }) => (
  <ScrollView contentContainerStyle={styles.container}>
  <View style={styles.largeHeaderContainer}>
    <Image
      source={{
        uri: 'https://i.pinimg.com/564x/65/03/dc/6503dc81ea0b4ccf797e4c5398609e45.jpg',
      }}
      style={styles.largeHeaderImage}
    />
    <Text style={[styles.header, { fontFamily: 'sans-serif' }]}>Narin's Store</Text>
    </View>
    <FlatList
      numColumns={3}
      data={items}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginHorizontal: 'auto',
          }}>
          <View style={styles.item}>
            <Image
              source={{ uri: item.image }}
              style={{ width: 100, height: 100, borderRadius: 0}}
            />
            <View>
              <Text>{item.name}</Text>
              <Text>Harga: ${item.price}</Text>
            </View>
          </View>
        </View>
      )}
    />
  </ScrollView>
);

//Halaman Tambah Barang
const TambahScreen = ({ items, addItem, removeItem }) => {
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [newItemImage, setNewItemImage] = useState('');

  const handleAddItem = () => {
    if (newItemName.trim() && newItemPrice.trim() && newItemImage.trim()) {
      addItem(newItemName, newItemPrice, newItemImage);
      setNewItemName('');
      setNewItemPrice('');
      setNewItemImage('');
    }
  };

//Penggunaan ScrollView, TextInput, Button pada halaman Tambah Produk
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nama Produk"
        value={newItemName}
        onChangeText={setNewItemName}
      />
      <TextInput
        style={styles.input}
        placeholder="Harga Produk"
        value={newItemPrice}
        onChangeText={setNewItemPrice}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="URL Gambar Produk"
        value={newItemImage}
        onChangeText={setNewItemImage}
      />
      <Button title="Tambahkan Pr0duk" onPress={handleAddItem} />
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={{ flex: 1 }}>
              <Text>{item.name}</Text>
              <Text>Harga: {item.price}</Text>
            </View>
            <Image
              source={{ uri: item.image }}
              style={{ width: 50, height: 50, borderRadius: 25 }}
            />
            <Button title="Hapus" onPress={() => removeItem(item.id)} />
          </View>
        )}
      />
    </ScrollView>
  );
};

//Halaman Profile
const ProfileScreen = () => (
  <View style={styles.profileContainer}>
    <Image
      source={{ uri: 'https://i.pinimg.com/736x/d3/2f/72/d32f72ffd34767dc206994b7b4d7c5f7.jpg' }}
      style={styles.profileImage}
    />
    <Text style={styles.profileName}>Narin</Text>
  </View>
);

//Halaman Navitagor Utama
const MainNavigator = ({ items, addItem, removeItem }) => {
  return (
    <tabs.Navigator>
      <tabs.Screen
        name="Home"
        children={() => <HomeScreen items={items} />}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="home" color="black" size={25} />
          ),
        }}
      />
      <tabs.Screen
        name="Tambah Produk"
        children={() => (
          <TambahScreen
            items={items}
            addItem={addItem}
            removeItem={removeItem}
          />
        )}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="plus" color="black" size={25} />
          ),
        }}
      />
      <tabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="user" color="black" size={25} />
          ),
        }}
      />
    </tabs.Navigator>
  );
};


//Fungsi untuk menambahkan dan menghapus produk
export default function App() {
  const [items, setItems] = useState(initialItems);

  const addItem = (name, price, image) => {
    setItems([...items, { id: Math.random().toString(), name, price, image }]);
  };

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Screen">
          {() => (
            <MainNavigator
              items={items}
              addItem={addItem}
              removeItem={removeItem}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

//CSS keseluruhan
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  largeHeaderContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

  },
  loginTitle: {
    fontSize: 24,
    marginBottom: 20,
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  largeHeaderImage: {
    width: 150,
    height: 150,
    marginHorizontal: 100,
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  item: {
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    textAlign: 'center',
  },
  profileContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  profileName: {
    marginTop: 20,
    fontSize: 24,
  },
});