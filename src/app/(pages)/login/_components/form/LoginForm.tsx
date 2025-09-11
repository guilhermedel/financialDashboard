"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
  Avatar,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { EmailOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginForm() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await login(credentials);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao fazer login");
    }
  };

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setCredentials((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <Card sx={{ minWidth: 400, maxWidth: 500 }}>
      <CardContent sx={{ p: 4 }}>
        <Avatar
          sx={{
            bgcolor: "primary.main",
            width: 80,
            height: 80,
            margin: "0 auto",
            mb: 2,
          }}
        >
          <AccountBalanceOutlinedIcon fontSize="large" />
        </Avatar>

        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          textAlign="center"
        >
          Financial Dashboard
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          textAlign="center"
          sx={{ mb: 3 }}
        >
          Faça login para acessar o dashboard
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <FormControl sx={{ width: "100%", mb: 2 }} variant="outlined">
            <InputLabel htmlFor="email">Email</InputLabel>
            <OutlinedInput
              id="email"
              type="email"
              value={credentials.email}
              onChange={handleChange("email")}
              required
              disabled={isLoading}
              endAdornment={
                <InputAdornment position="end">
                  <EmailOutlined />
                </InputAdornment>
              }
              label="Email"
            />
          </FormControl>

          <FormControl sx={{ width: "100%", mb: 3 }} variant="outlined">
            <InputLabel htmlFor="password">Senha</InputLabel>
            <OutlinedInput
              id="password"
              type={showPassword ? "text" : "password"}
              value={credentials.password}
              onChange={handleChange("password")}
              required
              disabled={isLoading}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    edge="end"
                    disabled={isLoading}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Senha"
            />
          </FormControl>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ height: 48 }}
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Entrar"
            )}
          </Button>
        </Box>

        
      </CardContent>
    </Card>
  );
}
