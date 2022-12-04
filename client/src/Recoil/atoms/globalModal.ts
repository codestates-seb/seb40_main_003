import { atom } from "recoil";

export const isModalOpen = atom<boolean>({
  key: "modalState",
  default: false
});

export const modalContent = atom<string>({
    key:"modalContent",
    default:"알람창"
})
