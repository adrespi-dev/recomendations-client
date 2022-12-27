import { atom, selector } from "recoil";
import { User } from "./User";
import jwt_decode from "jwt-decode";
import { localStorageEffect } from "../core/LocalStorageEffect";

type AuthTokens = { access: string; refresh: string };

export const authTokensState = atom<AuthTokens | null>({
  key: "authTokens",
  default: null,
  effects: [localStorageEffect("authTokens")],
});

export const currentUserState = selector<User | null>({
  key: "currentUser",
  get: async ({ get }) => {
    console.log("Derivando CUrrent User");
    const tokens = get(authTokensState);
    if (!tokens) {
      return null;
    }

    return jwt_decode(tokens.access);
  },
});
