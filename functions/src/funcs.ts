import * as admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import { info } from "firebase-functions/logger";
import { check_admin,check_auth } from "./utils/global-checker";

import { CustomUser } from "./types/CustomUser";
import { Response } from "./types/Response";
import { getJpa } from "./user-jpa";
import { UserRole } from "./enum/user-role";
import { UserRequest } from "./types/UserRequest";


const app = admin.initializeApp();
const db = getFirestore(app);
db.settings({ ignoreUndefinedProperties: true });
const userJPA = getJpa(db);

const getProfile = async (user: CustomUser, context:any) => {

    let _user: any;
    const authUser = await check_auth(context);
    

}

const updateUser = async (user: CustomUser, context: any){

}

const getAllUsers = async (context: any) => {

    let _users: any;
    const resp = new Response();

    await check_admin(userJPA, context);
    _users = await userJPA.getAll();
    resp.message = "List of avalaible users";
    resp.body = _users;

    return resp;

}

const userCreationByAdmin = async (user: UserRequest, context: any) => {

    const userRecord = await admin.auth().createUser({
        email: user.email,
        password: user.password,
    });

    const customUser: CustomUser = {
        firstname: user.firstname,
        name: user.name,
        country: user.country,
        city: user.city,
        phone: user.phone,
        status: true,
        userId: userRecord.uid,
        role: user.role
    }

    

    let _user: any;
    const resp = new Response();
    await check_admin(userJPA, context);

    _user = await userJPA.create(customUser.userId, customUser);
    resp.message = "user created";
    resp.body = _user.id;


    return resp;


}

const userSubscription = async (user: CustomUser) => {

    const customUser: CustomUser = {
        firstname: user.firstname,
        name: user.name,
        country: user.country,
        city: user.city,
        phone: user.phone,
        status: true,
        userId: user.userId,
        role: UserRole.User,
    }

    let _user: any;
    const resp = new Response();

    _user = await userJPA.create(customUser.userId, customUser);
    resp.message = "user created";
    resp.body = _user.id;


    return resp;

}