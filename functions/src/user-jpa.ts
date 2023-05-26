import { Firestore } from "firebase-admin/firestore";
import * as functions from "firebase-functions";

import { CustomUser } from "./types/CustomUser";

const CUSTOM_USER_COLLECTION = process.env.CUSTOM_USER_COLLECTION || 'Transaction';

class Jpa {

    public db: Firestore;

    public constructor(db: Firestore) {
        this.db = db;
    }

    public async create(id: string, user: CustomUser) {
        return await this.db.collection(CUSTOM_USER_COLLECTION).doc(id).set(user);
    }

    public async put(id: string, user: CustomUser) {
        const customUserRef = this.db.collection(CUSTOM_USER_COLLECTION).doc(id);
        return await customUserRef.update({ ...user });
    }

    public async getOne(id: string) {

        const customUserRef = this.db.collection(CUSTOM_USER_COLLECTION).doc(id);
        const customUserDoc = await customUserRef.get();

        if (!customUserDoc.exists) {
            throw new functions.https.HttpsError('not-found', 'user not found');
        }

        const customUserInfo = customUserDoc.data();

        return customUserInfo;

    }

    public async getAll(){
        
        const customUsersSnapshot = await this.db.collection(CUSTOM_USER_COLLECTION).get();
        const customUsers: any[] = [];
        
        if (customUsersSnapshot.empty) {
            throw new functions.https.HttpsError('not-found', 'No users found.');
        }  
        
        customUsersSnapshot.forEach((doc) => {
            const customUser = doc.data();
            customUser.id = doc.id;
            customUsers.push(customUser);
        });
    

        return customUsers;

    }

}


export function getJpa(db: Firestore): Jpa {
    return new Jpa(db);
};