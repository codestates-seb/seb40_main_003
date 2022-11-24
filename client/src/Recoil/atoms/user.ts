import {atom} from 'recoil'

// 로그인 정보 저장 상태
export interface UserStateType {
  userId: string
  userImage: string
  userNickname: string
  accessToken?: string
  refreshToken?: string
}

export const userState = atom<UserStateType|null>({
  key:"userState",
  default:null
})


// 유저 role 저장 상태
export const userRole = atom<boolean>({
  key:"userRole",
  default:false
})