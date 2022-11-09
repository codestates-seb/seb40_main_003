import {atom} from 'recoil'

export interface UserStateType {
  userId: string
  userImage: string
  userNickname: string
}
// nullable한 값에서 인터페이스 사용법
export const userState = atom<UserStateType|null>({
  key:"userState",
  default:null
})