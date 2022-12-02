import { atom } from "recoil";

// 로그인 정보 저장 상태
export interface UserStateType {
  memberId: string
  image: string
  nickname: string
  accessToken?: string
  refreshToken?: string;
}

export const userState = atom({
  key: "modal",
  default: null
});