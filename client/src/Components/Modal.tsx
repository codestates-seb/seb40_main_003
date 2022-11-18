import React from "react";
import styled from '@emotion/styled'

const Background = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    left: 0;
    top: 0;
    text-align: center;
`;

const Content = styled.div`
    height: 100%;
    width: 950px;
    margin-top: 70px;
    position: relative;
    overflow: scroll;
    background: #141414;
`;

const Modal = ({ onClose }) => {

return (
    <Background>
        <Content>
  {/* //  ... modal 안의 contents 코드 ... */}
        </ Content>
    </Background>
);
};

export default Modal;