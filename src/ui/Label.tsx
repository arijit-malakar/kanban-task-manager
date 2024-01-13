import styled from "styled-components";

const Label = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1.4px;
  color: var(--color-grey-500);
  min-height: 1.5em;
  display: flex;
  gap: 0.4rem;

  & span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export default Label;
