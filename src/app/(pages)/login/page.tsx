import { Container } from "@mui/material";
import LoginForm from './_components/form/LoginForm';

export default function LoginPage() {
  return (
    <Container sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <LoginForm />
    </Container>
  );
}