import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Header from "./ui/Header";
import Sidebar from "./ui/Sidebar";
import Board from "./features/boards/Board";

const StyledApp = styled.div`
  display: grid;
  grid-template-columns: 28rem 1fr;
  /* 1fr if Sidebar is hidden */
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 3.2rem 3rem;
  display: flex;
  overflow: auto;
`;

const App = () => {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Header />
        <Sidebar />
        <Main>
          <Board />
        </Main>
      </StyledApp>
    </>
  );
};

export default App;
