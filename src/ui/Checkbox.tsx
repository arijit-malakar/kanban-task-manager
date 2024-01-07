import styled, { css } from "styled-components";

interface StyledCheckboxProps {
  checked: boolean;
}

const StyledCheckbox = styled.div<StyledCheckboxProps>`
  display: flex;
  gap: 1.6rem;

  & input[type="checkbox"] {
    height: 1.8rem;
    width: 1.8rem;
    outline-offset: 2px;
    transform-origin: 0;
    accent-color: var(--color-brand-600);
  }

  & input[type="checkbox"]:disabled {
    accent-color: var(--color-brand-600);
  }

  & label {
    font-size: 1.2rem;

    ${(props) =>
      props.checked &&
      css`
        text-decoration: line-through;
      `}
  }
`;

interface CheckboxProps {
  checked: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  id: string;
  children: React.ReactNode;
}

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  id,
  children,
}) => {
  return (
    <StyledCheckbox checked={checked}>
      <input type="checkbox" id={id} checked={checked} onChange={onChange} />
      <label htmlFor={id}>{children}</label>
    </StyledCheckbox>
  );
};

export default Checkbox;
