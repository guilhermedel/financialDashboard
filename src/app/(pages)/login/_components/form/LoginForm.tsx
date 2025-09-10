"use client";
import { useActionState, useState } from "react";
import { loginAction } from "../../actions";
import {
    Avatar,
  Button,
  Card,
  CardContent,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { EmailOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import { FormContainer } from "./LoginForm.styles";
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';

export default function LoginForm() {
  const [state, formAction] = useActionState(loginAction, { ok: false });
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Card>
      <CardContent>
        <FormContainer action={formAction}>
          <Avatar sizes="large" sx={{ bgcolor:'primary.main',width: 80, height: 80, margin: '0 auto' }}>
            <AccountBalanceOutlinedIcon />
          </Avatar>
          <FormControl sx={{ width: "100%", minWidth: 300 }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
            <OutlinedInput
              id="outlined-adornment-email"
              type="text"
              endAdornment={
                <InputAdornment position="end">
                  <EmailOutlined />
                </InputAdornment>
              }
              label="Email"
            />
          </FormControl>
          <FormControl sx={{ width: "100%", minWidth: 300 }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword
                        ? "hide the password"
                        : "display the password"
                    }
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <Button type="submit" variant="contained">
            Login
          </Button>
        </FormContainer>
      </CardContent>
    </Card>
  );
}
