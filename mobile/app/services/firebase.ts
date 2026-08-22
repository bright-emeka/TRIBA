import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDemoKeyReplaceWithRealKey',
  authDomain: 'triba-app.firebaseapp.com',
  projectId: 'triba-app',
  storageBucket: 'triba-app.appspot.com',
  messagingSenderId: '123456789',
  appId: '1:123456789:android:abcdef123456',
};

export const firebaseApp = {
  auth,
  firestore,
};

export const initializeFirebase = () => {
  if (!firebaseApp.auth().currentUser) {
    console.log('Firebase initialized');
  }
  return firebaseApp;
};

export default firebaseApp;
