// firebase.js
const admin = require('firebase-admin');

// Load your service account key JSON file
const serviceAccount = require('./googleServices.json'); 
// Make sure this file is downloaded from Firebase Console → Project Settings → Service Accounts

// Initialize the Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://<your-project-id>.firebaseio.com" // replace with your Firebase project URL
});

// Export the initialized admin instance
module.exports = admin;
