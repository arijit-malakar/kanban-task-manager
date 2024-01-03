import styled from "styled-components";
import BoardNav from "../features/boards/BoardNav";

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);

  grid-row: 2 / -1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

const Label = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1.4px;
  color: var(--color-grey-500);
`;

const Sidebar = () => {
  return (
    <StyledSidebar>
      <Label>All Boards (3)</Label>
      <BoardNav />
    </StyledSidebar>
  );
};

export default Sidebar;
