import styled from "styled-components";
import { useAppSelector } from "../hooks";
// import { useDarkMode } from "../context/DarkModeContext";

const StyledLogo = styled.div`
  display: flex;
`;

const Img = styled.img`
  width: auto;

  @media (max-width: 767px) {
    content: url("/logo-mobile.svg");
  }
`;

const Logo = () => {
  const { isDarkMode } = useAppSelector((state) => state.darkMode);

  const src = isDarkMode ? "/logo-light.svg" : "/logo-dark.svg";

  return (
    <StyledLogo>
      <Img src={src} alt="Logo" />
    </StyledLogo>
  );
};

export default Logo;
