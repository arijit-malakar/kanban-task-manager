import React from "react";
import styled from "styled-components";

interface StyledSelectProps {
  type?: string;
}

const StyledSelect = styled.select<StyledSelectProps>`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

interface SelectProps extends React.HTMLProps<HTMLSelectElement> {
  options: {
    value: string;
    label: string;
    id?: number;
  }[];
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (props, ref) => {
    const { options, ...rest } = props;

    return (
      <StyledSelect {...rest} ref={ref}>
        {options.map((option) => (
          <option key={option.id || option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </StyledSelect>
    );
  }
);

export default Select;
