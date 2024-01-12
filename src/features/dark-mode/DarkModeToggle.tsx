import { useEffect } from "react";
import styled from "styled-components";
import { HiMoon, HiSun } from "react-icons/hi2";
import Toggle from "../../ui/Toggle";
import Panel from "../../ui/Panel";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { toggleDarkMode } from "./darkModeSlice";

const DarkModeItems = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  & svg {
    width: 2.2rem;
    height: 2.2rem;
    color: var(--color-grey-500);
  }
`;

const DarkModeToggle = () => {
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark-mode");
      document.documentElement.classList.remove("light-mode");
    } else {
      document.documentElement.classList.add("light-mode");
      document.documentElement.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  return (
    <Panel>
      <DarkModeItems>
        <HiSun />
        <Toggle
          id="toggle-dark-theme"
          checked={isDarkMode}
          onChange={() => dispatch(toggleDarkMode(!isDarkMode))}
        />
        <HiMoon />
      </DarkModeItems>
    </Panel>
  );
};

export default DarkModeToggle;
