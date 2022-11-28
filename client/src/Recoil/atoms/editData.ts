import { communityDetailTypes } from './../../types/communityTypes';
import { atom } from "recoil";

export const editDataAtom = atom<communityDetailTypes>({
  key: "editData",
  default: undefined
});