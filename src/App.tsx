import styled, { StyleSheetManager, css } from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Header from "./ui/Header";
import Sidebar from "./features/sidebar/Sidebar";
import Board from "./features/boards/Board";
import { useAppSelector } from "./hooks";
import SidebarShow from "./features/sidebar/SidebarShow";

interface StyledAppProps {
  showSidebar: boolean;
}

const StyledApp = styled.div<StyledAppProps>`
  display: grid;
  ${(props) =>
    props.showSidebar
      ? css`
          grid-template-columns: 28rem 1fr;
        `
      : css`
          grid-template-columns: 1fr;
        `}
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 3.2rem 3rem;
  display: flex;
  overflow: auto;
  position: relative;
`;

const App = () => {
  const showSidebar = useAppSelector((state) => state.sidebar.isOpen);

  return (
    <>
      <GlobalStyles />
      <StyleSheetManager shouldForwardProp={(prop) => prop !== "showSidebar"}>
        <StyledApp showSidebar={showSidebar}>
          <Header />
          <Sidebar />
          <Main>
            <Board />
            <SidebarShow />
          </Main>
        </StyledApp>
      </StyleSheetManager>
    </>
  );
};

export default App;
