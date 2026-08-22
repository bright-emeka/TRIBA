import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import {User, UserRole} from '../types';
import api from './api';

export const authService = {
  async login(email: string, password: string): Promise<{user: User; token: string}> {
    const credential = await auth().signInWithEmailAndPassword(email, password);
    const firebaseUser = credential.user;
    if (!firebaseUser) {
      throw new Error('Login failed');
    }

    const token = await firebaseUser.getIdToken();
    await AsyncStorage.setItem('auth_token', token);

    const userData = await authService.getCurrentUser();
    return {user: userData, token};
  },

  async register(email: string, password: string, username: string, displayName: string): Promise<{user: User; token: string}> {
    const credential = await auth().createUserWithEmailAndPassword(email, password);
    const firebaseUser = credential.user;
    if (!firebaseUser) {
      throw new Error('Registration failed');
    }

    await firebaseUser.updateProfile({displayName});

    const token = await firebaseUser.getIdToken();
    await AsyncStorage.setItem('auth_token', token);

    const syncData = await api.post('/auth/sync', {
      uid: firebaseUser.uid,
      email,
      username,
      display_name: displayName,
    });

    const user: User = {
      uid: firebaseUser.uid,
      email,
      username,
      display_name: displayName,
      role: syncData.data?.data?.role || 'user',
      is_suspended: syncData.data?.data?.is_suspended || false,
      followers_count: 0,
      following_count: 0,
      posts_count: 0,
      last_active_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    await AsyncStorage.setItem('user_data', JSON.stringify(user));
    return {user, token};
  },

  async logout(): Promise<void> {
    await auth().signOut();
    await AsyncStorage.removeItem('auth_token');
    await AsyncStorage.removeItem('user_data');
  },

  async getToken(): Promise<string | null> {
    const firebaseUser = auth().currentUser;
    if (firebaseUser) {
      const token = await firebaseUser.getIdToken();
      await AsyncStorage.setItem('auth_token', token);
      return token;
    }
    return AsyncStorage.getItem('auth_token');
  },

  async getCurrentUser(): Promise<User> {
    const firebaseUser = auth().currentUser;
    if (!firebaseUser) {
      throw new Error('No authenticated user');
    }

    const response = await api.get('/auth/me');
    return response.data.data as User;
  },

  onAuthChange(callback: (user: any) => void): () => void {
    const subscriber = auth().onAuthStateChanged(callback);
    return () => subscriber();
  },

  async sendPasswordReset(email: string): Promise<void> {
    await auth().sendPasswordResetEmail(email);
  },
};
