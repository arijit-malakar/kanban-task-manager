import styled, { css } from "styled-components";

interface ButtonNavProps {
  active?: boolean;
  variation: "primary" | "secondary";
}

const ButtonNav = styled.button<ButtonNavProps>`
  display: flex;
  align-items: center;
  gap: 1.2rem;

  background-color: unset;
  font-size: 1.6rem;
  font-weight: 500;
  border: unset;
  padding: 1.2rem 2.4rem;
  transition: all 0.3s;

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    transition: all 0.3s;
  }

  ${(props) =>
    props.variation === "primary" &&
    css`
      color: var(--color-grey-600);
      border-radius: var(--border-radius-semi);

      & span {
        width: 17.2rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        line-height: 1.4;
        overflow: hidden;
        text-align: left;
      }
    `}

  &:hover {
    ${(props) =>
      !props.active &&
      props.variation === "primary" &&
      css`
        color: var(--color-grey-800);
        background-color: var(--color-brand-200);
      `}
  }

  ${(props) =>
    props.active &&
    css`
      color: var(--color-brand-50);
      background-color: var(--color-brand-600);
    `}

  ${(props) =>
    props.variation === "secondary" &&
    css`
      color: var(--color-brand-600);

      &:hover {
        color: var(--color-brand-500);
      }

      &:focus {
        outline: unset;
      }
    `}
`;

export default ButtonNav;
