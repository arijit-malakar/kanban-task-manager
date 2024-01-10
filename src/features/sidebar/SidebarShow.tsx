import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { HiEye } from "react-icons/hi2";
import { toggleSidebar } from "./sidebarSlice";

const ShowButton = styled.button`
  position: fixed;
  bottom: 3.2rem;
  left: 0;
  display: flex;
  align-items: center;

  color: var(--color-brand-50);
  background-color: var(--color-brand-600);
  border: unset;
  border-radius: var(--border-radius-semi);
  padding: 1rem 1.6rem;
  transition: all 0.3s;

  &:hover {
    background-color: var(--color-brand-500);
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

const SidebarShow = () => {
  const showSidebar = useAppSelector((state) => state.sidebar.isOpen);
  const dispatch = useAppDispatch();

  if (showSidebar) return null;

  return (
    <ShowButton onClick={() => dispatch(toggleSidebar(!showSidebar))}>
      <HiEye />
    </ShowButton>
  );
};

export default SidebarShow;
