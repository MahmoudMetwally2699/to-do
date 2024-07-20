import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useColorScheme } from '../../../components/useColorScheme';
import { useNavigation } from '@react-navigation/native';
import { setBlogToEdit } from '../../../store/createSlice'; // Adjust the path if necessary
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Stack } from 'expo-router';


const Show = () => {
  const selectedBlog = useSelector(state => state.blogs.selectedBlog);
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleEdit = () => {
    dispatch(setBlogToEdit(selectedBlog));
    navigation.navigate('blogForm');
  };

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
      {selectedBlog ? (
        <>
          <View style={styles.header}>
            <Text style={[styles.title, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>{selectedBlog.title}</Text>
            <TouchableOpacity onPress={handleEdit} style={styles.editButton}>
              <FontAwesome name="edit" size={24} color={colorScheme === 'dark' ? '#fff' : '#000'} />
            </TouchableOpacity>
          </View>
          <Text style={[styles.content, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>{selectedBlog.content}</Text>
        </>
      ) : (
        <Text style={[styles.title, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>No Blog Selected</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    flex: 1,
    paddingRight: 10,
  },
  editButton: {
    padding: 10,
    borderRadius: 5,
  },
  content: {
    fontSize: 18,
    lineHeight: 26,
    marginTop: 20,
  },
});

export default Show;
