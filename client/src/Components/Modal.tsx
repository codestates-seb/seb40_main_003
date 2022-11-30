import React from "react";
import styled from "@emotion/styled";
import { confirmCancel } from "../Const/message";

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
