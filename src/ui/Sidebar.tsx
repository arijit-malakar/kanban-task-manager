import styled from "styled-components";
import Button from "./Button";

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);

  grid-row: 2 / -1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

const Sidebar = () => {
  return (
    <StyledSidebar>
      <Button>Board 1</Button>
    </StyledSidebar>
  );
};

export default Sidebar;
