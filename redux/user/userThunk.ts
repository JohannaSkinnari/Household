import { createAsyncThunk } from "@reduxjs/toolkit";
import firebase from "firebase";
import { ICreateMember, IMember } from "../../interfaces/IMember";
import { ISignUpData } from "../../interfaces/ISignupData";
import { IUser } from "../../interfaces/IUser";
import { ThunkApi } from "../reduxStore";

export const createNewUser = createAsyncThunk<
  ISignUpData,
  ISignUpData,
  ThunkApi
>("user/createNewUser", async (userData, { rejectWithValue }) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(userData.email, userData.password)
    .then(async (userCred) => {
      if (!userCred.user) {
        return rejectWithValue("Could not create account");
      }
      await userCred.user.updateProfile({ displayName: userData.name });

      // const id = userCred.user.uid;
      // const user: IMember = {
      //   id: id,
      //   name: userData.name,
      //   email: userData.email,
      // };
      // await firebase.firestore().collection("/member").doc(id).set(user);
    });

  return userData;
});
// const response = firebase.auth().currentUser;
// if (response !== null) {
//   const user: IUser = {
//     id: response.uid,
//     name: response.displayName as string,
//     email: response.email,
//   };
//   await firebase.firestore().collection("/users").doc(response.uid).set(user);
// }

//   if (response.user) {

//     const user: IUser = {
//       id: response.user.uid,
//       name: response.user.displayName,
//       email: response.user.email,
//     };
//     await firebase
//       .firestore()
//       .collection("/user")
//       .doc(response.user.uid)
//       .set(user);

// }

// const user = firebase.auth().currentUser;

// user?.updateProfile({
//   displayName: userData.name,
// });
// await firebase.createUserWithEmailAndPassword(
//   userData.email,
//   userData.password
// );
// const user = await firebase.currentUser;
// user.updateProfile({
//   displayName: userData.name,
// });
//await auth.firestore().collection("/user").doc(user.uid).set(user);
