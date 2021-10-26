import { createAsyncThunk } from "@reduxjs/toolkit";
import firebase from "firebase";
import { ISignUpData } from "../../interfaces/ISignupData";
import { ThunkApi } from "../reduxStore";

export const signupUser = createAsyncThunk<ISignUpData, ISignUpData, ThunkApi>(
  "user/signupUser",
  async (userData, { rejectWithValue }) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(userData.email, userData.password)
      .then(async (userCred) => {
        if (!userCred.user) {
          return rejectWithValue("Kan inte skapa konto");
        }
        await userCred.user.updateProfile({ displayName: userData.name });
      });

    return userData;
  }
);

export const loginUser = createAsyncThunk<ILoginData, ILoginData, ThunkApi>(
  "user/loginUser",
  async (userData, { rejectWithValue }) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(userData.email, userData.password)
      .then(async (userCred) => {
        if (!userCred.user) {
          return rejectWithValue("Kan inte logga in");
        }
      });

    return userData;
  }
);
