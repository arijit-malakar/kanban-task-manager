import styled, { css } from "styled-components";

const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 600;
    `}

  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 600;
    `}

    ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 2rem;
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      @media (max-width: 480px) {
        font-size: 1.6rem;
      }
    `}

    ${(props) =>
    props.as === "h4" &&
    css`
      font-size: 1.8rem;
      font-weight: 600;
    `}

  line-height: 1.4;
`;

export default Heading;
