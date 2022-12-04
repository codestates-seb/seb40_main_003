import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { isModalOpen, modalContent } from "../Recoil/atoms/globalModal";

export const useSetModal = (content: string) => {
  const [isOpen, setIsOpen] = useRecoilState(isModalOpen);
  const setContent = useSetRecoilState(modalContent);
  setContent(content)
  setIsOpen(true);
  useEffect(() => {
    setTimeout(() => {
      setIsOpen(false);
    }, 2000);
  }, [content]);
};
