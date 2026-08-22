# TRIBA Mobile

Production-ready React Native Android app for the TRIBA social media platform.

## Prerequisites

- Node.js >= 18
- JDK 17
- Android SDK 34
- React Native CLI

## Setup

```bash
# Install dependencies
npm install

# iOS (not supported for production)
npm run ios

# Android
npm run android
```

## Build for Release

```bash
# Generate bundle
npm run bundle

# Build release APK/AAB
cd android
./gradlew assembleRelease

# For AAB (Google Play)
./gradlew bundleRelease
```

The release build outputs will be in:
- `android/app/build/outputs/apk/release/` for APK
- `android/app/build/outputs/bundle/release/` for AAB

## Configuration

1. Update `app/services/firebase.ts` with your Firebase config
2. Update `app/services/api.ts` with your backend API URL
3. Add your `google-services.json` to `android/app/`
4. Update signing config in `android/gradle.properties` for production

## Project Structure

```
mobile/
  app/
    components/       # Reusable UI components
    features/         # Feature screens
      auth/          # Login, Register, ForgotPassword
      feed/          # Feed, PostCard, PostComposer
      posts/         # PostDetail
      comments/      # CommentSection
      chat/          # AI Chat
      notifications/ # Notifications
      profile/       # Profile, EditProfile
      search/        # Search
      admin/         # Admin Dashboard
    navigation/      # React Navigation setup
    services/        # API, Auth, Firebase
    store/           # Zustand state management
    types/           # TypeScript interfaces
    utils/           # Helpers
  android/           # Android native config
```

## Tech Stack

- React Native 0.73
- TypeScript
- React Navigation 6
- Firebase Auth & Firestore
- TanStack Query
- Axios
- Zustand
