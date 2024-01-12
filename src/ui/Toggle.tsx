import styled, { css } from "styled-components";

const Label = styled.label`
  display: inline-block;
  position: relative;
  height: 2.2rem;
  width: 4.8rem;
`;
const Input = styled.input`
  display: none;
  ${(props) =>
    props.checked &&
    css`
      & + div:before {
        transform: translateX(2.4rem);
      }
    `}
`;

const Slider = styled.div`
  background-color: var(--color-brand-600);
  border-radius: var(--border-radius-round);
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  cursor: pointer;
  transition: 0.4s;

  &:before {
    background-color: var(--color-brand-50);
    border-radius: 50%;
    content: "";
    position: absolute;
    bottom: 0.3rem;
    left: 0.4rem;
    height: 1.6rem;
    width: 1.6rem;
    transition: 0.4s;
  }
`;

interface ToggleProps {
  checked: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  id: string;
}

const Toggle: React.FC<ToggleProps> = ({ checked, onChange, id }) => {
  return (
    <Label htmlFor={id}>
      <Input type="checkbox" id={id} checked={checked} onChange={onChange} />
      <Slider />
    </Label>
  );
};

export default Toggle;
