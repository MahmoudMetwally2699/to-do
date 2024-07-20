import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addBlog, updateBlog } from '../../../store/createSlice'; // Adjust the path if necessary
import { useNavigation } from '@react-navigation/native';
import { useColorScheme } from '../../../components/useColorScheme';
import { Stack } from 'expo-router';

const BlogForm = () => {
  const blogToEdit = useSelector(state => state.blogs.blogToEdit);
  const blogs = useSelector(state => state.blogs.list);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const colorScheme = useColorScheme();

  useEffect(() => {
    if (blogToEdit) {
      setTitle(blogToEdit.title);
      setContent(blogToEdit.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [blogToEdit]);

  const handleSaveBlog = () => {
    if (title.trim() && content.trim()) {
      if (blogToEdit) {
        const index = blogs.findIndex(blog => blog.title === blogToEdit.title);
        dispatch(updateBlog({ index, title, content }));
      } else {
        dispatch(addBlog({ title, content }));
      }
      navigation.navigate('index'); // Navigate back to Home page after saving
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#333' : '#fff' }]}>
        <Stack.Screen
        options={{
          title: 'Note Form',
          headerStyle: { backgroundColor: '#f4511e' },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
        }}
      />
      <Text style={[styles.label, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>Blog Title</Text>
      <TextInput
        style={[styles.input, { backgroundColor: colorScheme === 'dark' ? '#444' : '#f9f9f9', color: colorScheme === 'dark' ? '#fff' : '#000' }]}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter blog title"
        placeholderTextColor={colorScheme === 'dark' ? '#ccc' : '#888'}
      />
      <Text style={[styles.label, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>Blog Content</Text>
      <TextInput
        style={[styles.input, styles.textArea, { backgroundColor: colorScheme === 'dark' ? '#444' : '#f9f9f9', color: colorScheme === 'dark' ? '#fff' : '#000' }]}
        value={content}
        onChangeText={setContent}
        placeholder="Enter blog content"
        placeholderTextColor={colorScheme === 'dark' ? '#ccc' : '#888'}
        multiline
      />
      <TouchableOpacity
        style={[styles.button, { backgroundColor: colorScheme === 'dark' ? '#555' : '#007BFF' }]}
        onPress={handleSaveBlog}
      >
        <Text style={styles.buttonText}>Save Blog</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BlogForm;
