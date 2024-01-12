import styled from "styled-components";
import { HiChevronDown, HiChevronUp } from "react-icons/hi2";
import Heading from "./Heading";
import Logo from "./Logo";
import ModifyBoard from "../features/boards/ModifyBoard";
import AddTask from "../features/tasks/AddTask";
import BoardNav from "../features/boards/BoardNav";
import DarkModeToggle from "../features/dark-mode/DarkModeToggle";
import Menus from "./Menus";
import Modal from "../features/modal/Modal";
import ButtonIcon from "./ButtonIcon";
import { getCurrentBoard } from "../features/boards/boardSlice";
import { setCurrentModal } from "../features/modal/modalSlice";
import { useAppDispatch, useAppSelector } from "../hooks";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  grid-column: span 2;
  display: grid;
  grid-template-columns: 23.2rem 1fr;
  align-items: center;
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
              className="show-mobile"
              onClick={() => dispatch(setCurrentModal("sidebar"))}
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
        <BoardNav />
        <DarkModeToggle />
      </Modal>
    </>
  );
};

export default Header;
