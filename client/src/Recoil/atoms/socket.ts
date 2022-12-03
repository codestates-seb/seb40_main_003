import { atom } from "recoil";

// 안읽은 메시지 갯수
export const noReadNum = atom<number>({
  key: "noReadNum",
  default: 0,
});
