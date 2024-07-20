import React from 'react';
import { View, Text, FlatList, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { deleteBlog, selectBlog, clearBlogToEdit } from '../../../store/createSlice'; // Adjust the path if necessary
import { useColorScheme } from '../../../components/useColorScheme';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { Stack } from 'expo-router';

const Home = () => {
  const blogs = useSelector(state => state.blogs.list);
  const dispatch = useDispatch();
  const colorScheme = useColorScheme();
  const navigation = useNavigation();

  return (
    <View style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#333' : '#fff' }]}>
      <Stack.Screen
        options={{
          title: 'Notes',
          headerStyle: { backgroundColor: '#f4511e' },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
        }}
      />
      <TouchableOpacity 
        style={[styles.addButton, { backgroundColor: colorScheme === 'dark' ? '#555' : '#007BFF' }]} 
        onPress={() => {
          dispatch(clearBlogToEdit());
          navigation.navigate('blogForm');
        }}
      >
        <Text style={styles.addButtonText}>Add Notes</Text>
      </TouchableOpacity>
      <FlatList
        data={blogs}
        keyExtractor={(item) => item.title}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => {
            dispatch(selectBlog(item));
            navigation.navigate('show');
          }}>
            <View style={[styles.blogItem, { backgroundColor: colorScheme === 'dark' ? '#444' : '#f9f9f9' }]}>
              <Text style={[styles.blogText, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>
                {item.title}
              </Text>
              <TouchableOpacity onPress={() => dispatch(deleteBlog(index))}>
                <FontAwesome name="trash" size={24} color={colorScheme === 'dark' ? '#fff' : '#000'} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  addButton: {
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  blogItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    elevation: 1, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 2 }, // For iOS shadow
    shadowOpacity: 0.1, // For iOS shadow
    shadowRadius: 2, // For iOS shadow
  },
  blogText: {
    fontSize: 16,
    flex: 1,
  },
});

export default Home;
