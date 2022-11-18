import react from "react";
import { createPortal } from "react";

const ModalPortal = ({ children }) => {
    const el = document.getElementById("modal");
    return (
        react.createPortal(children, el));
};

export default ModalPortal;