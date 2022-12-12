import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { isModalOpen, modalContent } from "../Recoil/atoms/globalModal";

/**전역 모달관리를 위해 개발중인 기능 */
export const useSetModal = (content: string) => {
  const [isOpen, setIsOpen] = useRecoilState(isModalOpen);
  const setContent = useSetRecoilState(modalContent);
  setContent(content)
  setIsOpen(true);
  useEffect(() => {
    if(isOpen){
    setTimeout(() => {
      setIsOpen(false);
    }, 2000)}
  }, [content]);
};
