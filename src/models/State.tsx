import { atom } from "recoil";
import { localStorageEffect } from "../core/LocalStorageEffect";

export const selectedModelIdState = atom<number | null>({
  key: "selectedModelId",
  default: null,
  effects: [localStorageEffect("selectedModelId")],
});
