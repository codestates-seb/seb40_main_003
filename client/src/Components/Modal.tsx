import React from "react";
import styled from "@emotion/styled";
import { confirmCancel } from "../Const/message";
import {  useRecoilValue } from "recoil";
import { isModalOpen, modalContent } from "../Recoil/atoms/globalModal";

interface ModalDefaultType {
  onClickModal: () => void;
  children: JSX.Element | JSX.Element[];
  confirm?: boolean;
}

const Modal = ({
  onClickModal,
  children,
  confirm = true,
}: ModalDefaultType) => {
  return (
    <ModalContainer>
      <DialogBox>{children}</DialogBox>
      <Backdrop
        onClick={(e: React.MouseEvent) => {
          e.preventDefault();
          if (onClickModal) {
            if (confirm) {
              if (window.confirm(confirmCancel)) {
                onClickModal();
              }
            } else {
              onClickModal();
            }
          }
        }}
      />
    </ModalContainer>
  );
};
// 전역모달
export const GlobalModal = () => {
  const content = useRecoilValue(modalContent);
  const isShow = useRecoilValue(isModalOpen);

  return (
      <AlertBox className={isShow ? "bold" : "hiding "}>{content}</AlertBox>
  );
};

const AlertBox = styled.dialog`

  width: 50vw;
  padding: 32px;
  min-height: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  left :calc(25vw);
  bottom: 58px;
  border:none;
  box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
  border-radius: 24px 0;
  text-align: center;
  box-sizing: border-box;
  background-color: var(--pure-white);
  z-index: 10000;
  color: var(--alert-amber);
  transition-duration: 300ms;
  opacity: 1;
  &.hiding {
    position: absolute;
    left: -500px;
    opacity: 0;
  }
`;

const ModalContainer = styled.div`
  position: fixed;
  display: flex;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const DialogBox = styled.dialog`
  min-width: 280px;
  width: 100%;
  max-width: 400px;
  padding: 32px;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: sticky;
  border: none;
  border-radius: 8px;
  box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
  box-sizing: border-box;
  background-color: white;
  z-index: 10000;
`;

const Backdrop = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.2);
`;

export default Modal;
