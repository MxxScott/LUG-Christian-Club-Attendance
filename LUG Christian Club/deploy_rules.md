# Firebase Security Rules Deployment

## Issue
The Firebase security rules have expired, causing "permission-denied" errors when trying to add or read members.

## Solution
The rules have been updated to allow read/write access. You need to deploy these rules to Firebase.

## Steps to Deploy Rules

### Option 1: Using Firebase CLI (Recommended)
1. Install Firebase CLI if you haven't already:
   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```bash
   firebase login
   ```

3. Deploy the rules:
   ```bash
   firebase deploy --only firestore:rules
   ```

### Option 2: Using Firebase Console
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `christian-club-online`
3. Go to Firestore Database
4. Click on "Rules" tab
5. Replace the rules with:
   ```javascript
   rules_version = '2';

   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if true;
       }
     }
   }
   ```
6. Click "Publish"

## Updated Rules
The rules now allow full read/write access to the database, which will fix the permission errors.

## Test After Deployment
1. Try adding a member again
2. Check if members appear in the list
3. Verify attendance tracking works
