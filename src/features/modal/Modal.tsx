import { createPortal } from "react-dom";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { setCurrentModal } from "./modalSlice";

interface StyledModalProps {
  ref: React.RefObject<HTMLDivElement>;
}

const StyledModal = styled.div<StyledModalProps>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 2.4rem 2.8rem;
  transition: all 0.5s;
  max-height: 95%;
  overflow-y: auto;

  @media (max-width: 767px) {
    max-height: 85%;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

interface ModalProps {
  children: React.ReactNode;
  name: string;
  prevModal?: string;
}

const Modal: React.FC<ModalProps> = ({ children, name, prevModal }) => {
  const modalName = useAppSelector((state) => state.modal.modalName);
  const dispatch = useAppDispatch();
  const modalRef = useOutsideClick(() => {
    dispatch(setCurrentModal(prevModal || ""));
  });

  if (!modalName || modalName !== name) return null;

  return createPortal(
    <Overlay>
      <StyledModal ref={modalRef}>{children}</StyledModal>
    </Overlay>,
    document.body
  );
};

export default Modal;
