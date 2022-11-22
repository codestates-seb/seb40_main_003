import { atom } from "recoil";

// 로그인 정보 저장 상태
export interface UserStateType {
  memberId: string|null;
  image: string|null;
  nickname: string|null;
  accessToken?: string|null;
  refreshToken?: string|null;
}

export const userState = atom<UserStateType>({
  key: "userState",
  default: {
    memberId: null,
    image: null,
    nickname: null,
    accessToken: null,
    refreshToken: null,
  },
});

// 유저 role 저장 상태
export const userRole = atom<boolean>({
  key: "userRole",
  default: false,
});
