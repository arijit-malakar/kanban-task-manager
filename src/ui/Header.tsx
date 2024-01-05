import styled from "styled-components";
import Heading from "./Heading";
import Button from "./Button";
import Logo from "./Logo";
import Menus from "./Menus";
import ModifyBoard from "../features/boards/ModifyBoard";
import { useAppSelector } from "../hooks";
import { getCurrentBoard } from "../features/boards/boardSlice";

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
`;

const Header = () => {
  const board = useAppSelector(getCurrentBoard);

  return (
    <StyledHeader>
      <Logo />
      <HeaderItems>
        <Heading as="h3">{board?.name}</Heading>
        <HeaderOptions>
          <Button variation="primary">+ Add New Task</Button>

          <Menus>
            <ModifyBoard />
          </Menus>
        </HeaderOptions>
      </HeaderItems>
    </StyledHeader>
  );
};

export default Header;
