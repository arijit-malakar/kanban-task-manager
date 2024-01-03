import styled from "styled-components";
// import { useDarkMode } from "../context/DarkModeContext";

const StyledLogo = styled.div`
  text-align: left;
`;

const Img = styled.img`
  width: auto;
`;

const Logo = () => {
  //   const { isDarkMode } = useDarkMode();

  //   const src = isDarkMode ? "/logo-dark.png" : "/logo-light.png";
  const src = "/logo-dark.svg";

  return (
    <StyledLogo>
      <Img src={src} alt="Logo" />
    </StyledLogo>
  );
};

export default Logo;
