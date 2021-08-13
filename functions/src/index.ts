/* eslint-disable object-curly-spacing */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

admin.initializeApp();

// On sign up
exports.processSignUp = functions.auth.user().onCreate(async (user) => {
  // Check if user meets role criteria.
  if (
    user.email &&
    user.email.endsWith('@mekeel.org') &&
    !user.email.substring(0, 2).match(/[0-9]{2}/)
  ) {
    const customClaims = {
      admin: true
    };

    try {
      // Set custom user claims on this newly created user.
      await admin.auth().setCustomUserClaims(user.uid, customClaims);

      // Update real-time database to notify client to force refresh.
      const metadataRef = admin.firestore().doc('metadata/' + user.uid);
      // const metadataRef = admin.database().ref('metadata/' + user.uid);

      // Set the refresh time to the current UTC timestamp.
      // This will be captured on the client to force a token refresh.
      await metadataRef.set({ refreshTime: new Date().getTime() });
    } catch (error) {
      console.log(error);
    }
  }
});
