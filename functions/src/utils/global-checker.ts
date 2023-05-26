import * as functions from "firebase-functions";
// import * as admin from "firebase-admin";
import { UserRole } from "../enum/user-role";

// const app = admin.initializeApp();
// const db = getFirestore();
// db.settings({ ignoreUndefinedProperties: true });
// const userJPA = getJpa(db);

const check_auth = (context: any) => {
    if (!context.auth) { throw new functions.https.HttpsError('failed-precondition', 'Missing Authentification'); }
}

const check_role = (context: any) => {
    if (!context.auth) { throw new functions.https.HttpsError('failed-precondition', 'Missing Authentification'); }
}

const check = (context: any) => {
    check_auth(context);
    check_role(context);
}

const check_admin = async (jpa: any, context: any) => {
    
    if (context.auth) {
        const uid = context.auth.uid;

        // Retrieve the custom_user document for the authenticated user
        const customUserSnapshot = await jpa.getOne(uid); 
        
        // await admin.firestore().collection('custom_user').doc(uid).get();

        if (!customUserSnapshot?.exists) {
            throw new functions.https.HttpsError('not-found', 'User not found.');
        }

        const customUser = customUserSnapshot.data();

        if (customUser.role !== UserRole.Admin) {
            throw new functions.https.HttpsError('permission-denied', 'User does not have permission to create a user.');
        }
    }

}

export { check_auth, check_role, check,check_admin };


