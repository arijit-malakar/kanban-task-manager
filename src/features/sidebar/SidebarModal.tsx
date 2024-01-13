import styled from "styled-components";
import BoardNav from "../boards/BoardNav";
import DarkModeToggle from "../dark-mode/DarkModeToggle";

const StyledSidebarModal = styled.div`
  width: 24rem;
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
`;

const SidebarModal = () => {
  return (
    <StyledSidebarModal>
      <BoardNav />
      <DarkModeToggle />
    </StyledSidebarModal>
  );
};

export default SidebarModal;
