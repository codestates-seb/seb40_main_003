import { communityDetailTypes } from './../../types/communityTypes';
import { atom } from "recoil";
import { ProductDetailDataType } from "../../types/productTypes";

export const editDataAtom = atom<communityDetailTypes | null>({
  key: "editData",
  default: null
});

export const productEditDataAtom = atom<ProductDetailDataType | null>({
  key: "productEditData",
  default: null
});