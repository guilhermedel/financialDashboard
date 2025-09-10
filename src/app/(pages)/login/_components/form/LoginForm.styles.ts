import { spacing } from "@/config/styles.config";
import { styled } from "styled-components";


export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${spacing.small};
  padding: ${spacing.small};
`;
