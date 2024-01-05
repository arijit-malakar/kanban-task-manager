import styled from "styled-components";

const StyledFormRowMultiple = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const FieldRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

interface FormRowMultipleProps {
  label?: string;
  labelFor?: string;
  error?: string;
  children: React.ReactNode;
}

const FormRowMultiple: React.FC<FormRowMultipleProps> = ({
  label,
  labelFor,
  error,
  children,
}) => {
  return (
    <StyledFormRowMultiple>
      {label && <Label htmlFor={labelFor}>{label}</Label>}
      <FieldRow>{children}</FieldRow>
      {error && <Error>{error}</Error>}
    </StyledFormRowMultiple>
  );
};

export default FormRowMultiple;
