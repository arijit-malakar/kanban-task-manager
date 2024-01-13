import styled from "styled-components";
import { HiChevronDown, HiChevronUp } from "react-icons/hi2";
import Heading from "./Heading";
import Logo from "./Logo";
import ModifyBoard from "../features/boards/ModifyBoard";
import CreateBoardForm from "../features/boards/CreateBoardForm";
import AddTask from "../features/tasks/AddTask";
import SidebarModal from "../features/sidebar/SidebarModal";
import Menus from "./Menus";
import Modal from "../features/modal/Modal";
import ButtonIcon from "./ButtonIcon";
import { getCurrentBoard } from "../features/boards/boardSlice";
import { setCurrentModal } from "../features/modal/modalSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { toggleSidebar } from "../features/sidebar/sidebarSlice";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  grid-column: span 2;
  display: grid;
  grid-template-columns: 23.2rem 1fr;
  align-items: center;

  @media (max-width: 767px) {
    grid-template-columns: auto 1fr;
    padding: 1.8rem 3.2rem;
    gap: 1.8rem;
  }

  @media (max-width: 480px) {
    padding: 2rem 2.4rem;
  }

  @media (max-width: 390px) {
    padding: 2rem;
  }
`;

const HeaderItems = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderOptions = styled.div`
  display: flex;
  align-items: center;

  & h3 {
    width: 19.6rem;

    @media (max-width: 480px) {
      width: 13.2rem;
    }
  }
`;

const Header = () => {
  const dispatch = useAppDispatch();
  const board = useAppSelector(getCurrentBoard);
  const modal = useAppSelector((state) => state.modal.modalName);

  return (
    <>
      <StyledHeader>
        <Logo />
        <HeaderItems>
          <HeaderOptions>
            <Heading as="h3">{board?.name}</Heading>
            <ButtonIcon
              className="toggle-board"
              onClick={() => {
                dispatch(toggleSidebar(false));
                dispatch(setCurrentModal("sidebar"));
              }}
            >
              {modal === "sidebar" ? <HiChevronUp /> : <HiChevronDown />}
            </ButtonIcon>
          </HeaderOptions>
          <HeaderOptions>
            <AddTask />
            <Menus>
              <ModifyBoard />
            </Menus>
          </HeaderOptions>
        </HeaderItems>
      </StyledHeader>

      <Modal name="sidebar">
        <SidebarModal />
      </Modal>

      <Modal name="board-form">
        <CreateBoardForm />
      </Modal>
    </>
  );
};

export default Header;
