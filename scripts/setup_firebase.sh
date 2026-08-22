#!/bin/bash
# Firebase project setup script

echo "Setting up Firebase for TRIBA..."

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo "Firebase CLI not found. Install from https://firebase.google.com/docs/cli"
    exit 1
fi

# Initialize Firebase project
echo "Initialize your Firebase project at https://console.firebase.google.com"
echo "Then run: firebase use --add"

echo "Enable Authentication providers:"
echo "  - Email/Password"
echo "  - Google"

echo "Create Firestore database in production mode"

echo "Create Storage bucket for media uploads"

echo "Set up Firebase Admin SDK:"
echo "  - Go to Project Settings > Service Accounts"
echo "  - Generate new private key"
echo "  - Save to backend/.env as GOOGLE_APPLICATION_CREDENTIALS"
