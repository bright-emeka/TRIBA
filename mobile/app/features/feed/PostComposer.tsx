import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {launchImageLibrary} from 'react-native-image-picker';

interface PostComposerProps {
  onPost: (content: string, visibility: string) => Promise<void>;
}

const PostComposer = ({onPost}: PostComposerProps) => {
  const [content, setContent] = useState('');
  const [visibility, setVisibility] = useState('public');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePost = async () => {
    if (!content.trim()) {
      Alert.alert('Error', 'Please enter some content');
      return;
    }

    setIsSubmitting(true);
    try {
      await onPost(content.trim(), visibility);
      setContent('');
    } catch (error) {
      Alert.alert('Error', 'Failed to create post');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImagePicker = () => {
    launchImageLibrary({mediaType: 'photo', quality: 0.8}, response => {
      if (response.assets && response.assets[0]) {
        Alert.alert('Image Selected', 'Image upload coming soon');
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Create Post</Text>
          <TouchableOpacity
            style={[styles.postButton, (!content.trim() || isSubmitting) && styles.postButtonDisabled]}
            onPress={handlePost}
            disabled={!content.trim() || isSubmitting}>
            <Text style={styles.postButtonText}>
              {isSubmitting ? 'Posting...' : 'Post'}
            </Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.textInput}
          placeholder="What's on your mind?"
          placeholderTextColor="#9ca3af"
          value={content}
          onChangeText={setContent}
          multiline
          numberOfLines={4}
          maxLength={500}
          textAlignVertical="top"
        />

        <View style={styles.footer}>
          <View style={styles.visibilityContainer}>
            <TouchableOpacity
              style={[
                styles.visibilityButton,
                visibility === 'public' && styles.visibilityButtonActive,
              ]}
              onPress={() => setVisibility('public')}>
              <Text
                style={[
                  styles.visibilityText,
                  visibility === 'public' && styles.visibilityTextActive,
                ]}>
                Public
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.visibilityButton,
                visibility === 'followers_only' && styles.visibilityButtonActive,
              ]}
              onPress={() => setVisibility('followers_only')}>
              <Text
                style={[
                  styles.visibilityText,
                  visibility === 'followers_only' && styles.visibilityTextActive,
                ]}>
                Followers
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.imageButton} onPress={handleImagePicker}>
            <Icon name="image-outline" size={22} color="#6366f1" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  inner: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  postButton: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  postButtonDisabled: {
    opacity: 0.5,
  },
  postButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  textInput: {
    fontSize: 16,
    color: '#111827',
    minHeight: 80,
    lineHeight: 22,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  visibilityContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  visibilityButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#f3f4f6',
  },
  visibilityButtonActive: {
    backgroundColor: '#e0e7ff',
  },
  visibilityText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6b7280',
  },
  visibilityTextActive: {
    color: '#6366f1',
  },
  imageButton: {
    padding: 8,
  },
});

export default PostComposer;
