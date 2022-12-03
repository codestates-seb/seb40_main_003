import { atom } from "recoil";

export interface CurrentPageType {
  title: string;
}
// nullable한 값에서 인터페이스 사용법
export const currentPage = atom<CurrentPageType>({
  key: "currentPage",
  default: { title: "플랜트하이커" },
});
