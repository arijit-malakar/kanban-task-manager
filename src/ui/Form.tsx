import styled from "styled-components";

const Form = styled.form`
  padding: 0.4rem 1rem;
  width: 40rem;
  overflow: hidden;
  font-size: 1.4rem;

  @media (max-width: 480px) {
    width: 34rem;
  }

  @media (max-width: 425px) {
    width: 32rem;
  }

  @media (max-width: 390px) {
    width: 30rem;
  }
`;

export default Form;
