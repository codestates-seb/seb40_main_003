import { atom } from "recoil";

// 로그인 정보 저장 상태
export interface UserStateType {
  memberId: string
  image: string
  nickname: string
  accessToken?: string
  refreshToken?: string;
}

export const userState = atom<UserStateType|null>({
  key: "userState",
  default: null
});

// 유저 role 저장 상태
export const isExpert = atom<boolean>({
  key: "isExpert",
  default: false,
});