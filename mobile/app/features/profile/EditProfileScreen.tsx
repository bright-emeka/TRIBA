import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import {api} from '../../services/api';
import {User} from '../../types';
import {storage} from '../../utils/storage';
import {isValidEmail, isValidDisplayName, sanitizeInput} from '../../utils/validation';
import Icon from 'react-native-vector-icons/Ionicons';
import {launchImageLibrary} from 'react-native-image-picker';

const fetchUser = async (userId: string): Promise<User> => {
  const response = await api.get(`/users/${userId}`);
  return response.data.data as User;
};

const updateUser = async (userId: string, updates: Partial<User>): Promise<User> => {
  const response = await api.patch(`/users/me`, updates);
  return response.data.data as User;
};

const EditProfileScreen = () => {
  const queryClient = useQueryClient();
  const [userId, setUserId] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [website, setWebsite] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const userData = await storage.getUserData<User>();
    if (userData) {
      setUserId(userData.uid);
      setDisplayName(userData.display_name);
      setEmail(userData.email);
    }
  };

  const {data: user} = useQuery({
    queryKey: ['editUser', userId],
    queryFn: () => fetchUser(userId!),
    enabled: !!userId,
  });

  useEffect(() => {
    if (user) {
      setBio(user.bio || '');
      setLocation(user.location || '');
      setWebsite(user.website || '');
      setAvatarUrl(user.avatar_url || '');
    }
  }, [user]);

  const updateMutation = useMutation({
    mutationFn: (updates: any) => updateUser(userId!, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['user']});
      Alert.alert('Success', 'Profile updated successfully');
    },
  });

  const handleSave = async () => {
    const sanitizedDisplayName = sanitizeInput(displayName);
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedBio = sanitizeInput(bio);
    const sanitizedLocation = sanitizeInput(location);
    const sanitizedWebsite = sanitizeInput(website);

    if (!isValidDisplayName(sanitizedDisplayName)) {
      Alert.alert('Error', 'Display name must be 2-50 characters');
      return;
    }

    if (!isValidEmail(sanitizedEmail)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    try {
      await updateMutation.mutateAsync({
        display_name: sanitizedDisplayName,
        email: sanitizedEmail,
        bio: sanitizedBio,
        location: sanitizedLocation,
        website: sanitizedWebsite,
      });
      await storage.setUserData({...user, display_name: sanitizedDisplayName, email: sanitizedEmail});
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to update profile');
    }
  };

  const handleImagePicker = () => {
    launchImageLibrary({mediaType: 'photo', quality: 0.8}, response => {
      if (response.assets && response.assets[0]) {
        setAvatarUrl(response.assets[0].uri || '');
        Alert.alert('Image Selected', 'Avatar upload coming soon');
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.avatarContainer}>
          {avatarUrl ? (
            <Image source={{uri: avatarUrl}} style={styles.avatar} />
          ) : (
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {displayName?.charAt(0).toUpperCase() || 'U'}
              </Text>
            </View>
          )}
          <TouchableOpacity style={styles.changeAvatarButton} onPress={handleImagePicker}>
            <Icon name="camera-outline" size={20} color="#ffffff" />
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Display Name</Text>
          <TextInput
            style={styles.input}
            value={displayName}
            onChangeText={setDisplayName}
            placeholder="Display Name"
            placeholderTextColor="#9ca3af"
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            placeholderTextColor="#9ca3af"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Bio</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={bio}
            onChangeText={setBio}
            placeholder="Tell us about yourself"
            placeholderTextColor="#9ca3af"
            multiline
            numberOfLines={4}
          />

          <Text style={styles.label}>Location</Text>
          <TextInput
            style={styles.input}
            value={location}
            onChangeText={setLocation}
            placeholder="City, Country"
            placeholderTextColor="#9ca3af"
          />

          <Text style={styles.label}>Website</Text>
          <TextInput
            style={styles.input}
            value={website}
            onChangeText={setWebsite}
            placeholder="https://example.com"
            placeholderTextColor="#9ca3af"
            autoCapitalize="none"
            keyboardType="url"
          />

          <TouchableOpacity
            style={[styles.saveButton, updateMutation.isPending && styles.saveButtonDisabled]}
            onPress={handleSave}
            disabled={updateMutation.isPending}>
            {updateMutation.isPending ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={styles.saveButtonText}>Save Changes</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#6366f1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 36,
    fontWeight: '700',
  },
  changeAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: '35%',
    backgroundColor: '#6366f1',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  form: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 6,
    marginTop: 16,
  },
  input: {
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#111827',
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#6366f1',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 24,
  },
  saveButtonDisabled: {
    opacity: 0.6,
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default EditProfileScreen;
