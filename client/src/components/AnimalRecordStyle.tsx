import styled from "styled-components";

export const FormContainer = styled.div`
  max-width: 600px;
  margin: auto;
  background-color: rgba(255, 255, 255, 0.85);
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 0 15px rgba(0,0,0,0.1);
`;
export const Textarea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  resize: vertical;
  min-height: 80px;
`; 

export const Field = styled.div`
  margin-bottom: 1rem;
`;

export const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #4a2e19;
`;

export  const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

export  const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

export  const Button = styled.button`
  background-color: #4a2e19;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 10px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  display: block;
  margin: 1rem auto 0 auto;

  &:hover {
    background-color: #d9a7b5;
    color: #4a2e19;
  }
`;
export const FieldsetTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: bold;
  margin: 1.5rem 0 1rem;
  color: #4a2e19;
  border-bottom: 1px solid #ddd;
  padding-bottom: 0.25rem;
`;
export const AnimalCard = styled.div`
  background: #FFF5E1;
  padding: 1rem;
  border-radius: 12px;
  margin-top: 1rem;
  text-align: center;
`;