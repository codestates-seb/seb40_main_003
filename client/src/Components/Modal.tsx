import React from "react";
import styled from "@emotion/styled";

interface ModalDefaultType {
  onClickModal: () => void;
  children: string;
}

function Modal({ onClickModal, children }: ModalDefaultType) {
  return (
    <ModalContainer>
      <DialogBox>{children}</DialogBox>
      <Backdrop
        onClick={(e: React.MouseEvent) => {
          e.preventDefault();

          if (onClickModal) {
            onClickModal();
          }
        }}
      />
    </ModalContainer>
  );
}

const ModalContainer = styled.div`
  position: absolute;
  display: flex;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const DialogBox = styled.dialog`
    width: 320px;
    height: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: fixed;
    border: none;
    left: calc(50% - 160px);
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
