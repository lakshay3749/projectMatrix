const admin = require('firebase-admin');

// Parse JSON from environment variable
const serviceAccount = JSON.parse(process.env.GOOGLE_SERVICES_JSON);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://<your-project-id>.firebaseio.com" // replace with your Firebase project URL
});

module.exports = admin;
