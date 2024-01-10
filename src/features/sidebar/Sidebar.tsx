import styled from "styled-components";
import { HiEyeSlash, HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import BoardNav from "../boards/BoardNav";
import Panel from "../../ui/Panel";
import ButtonIcon from "../../ui/ButtonIcon";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { toggleSidebar } from "./sidebarSlice";

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);

  grid-row: 2 / -1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const SidebarOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const SidebarToggleButton = styled.button`
  display: flex;
  align-items: center;
  gap: 1.2rem;

  color: var(--color-grey-600);
  background-color: unset;
  font-size: 1.6rem;
  font-weight: 500;
  border: unset;
  padding: 1.2rem 2.4rem;
  transition: all 0.3s;

  &:hover {
    color: var(--color-grey-800);
  }

  &:focus {
    outline: unset;
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    transition: all 0.3s;
  }
`;

const Sidebar = () => {
  const showSidebar = useAppSelector((state) => state.sidebar.isOpen);
  const dispatch = useAppDispatch();

  return (
    <>
      {showSidebar && (
        <StyledSidebar>
          <BoardNav />
          <SidebarOptions>
            <Panel>
              <ButtonIcon>
                <HiOutlineSun />
              </ButtonIcon>
              <ButtonIcon>
                <HiOutlineMoon />
              </ButtonIcon>
            </Panel>
            <SidebarToggleButton
              onClick={() => dispatch(toggleSidebar(!showSidebar))}
            >
              <HiEyeSlash />
              <span>Hide Sidebar</span>
            </SidebarToggleButton>
          </SidebarOptions>
        </StyledSidebar>
      )}
    </>
  );
};

export default Sidebar;
