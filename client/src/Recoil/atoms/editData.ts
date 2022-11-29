import { communityDetailTypes } from './../../types/communityTypes';
import { atom } from "recoil";

export const editDataAtom = atom<communityDetailTypes | null>({
  key: "editData",
  default: null
});