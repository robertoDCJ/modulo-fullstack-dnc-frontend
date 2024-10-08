"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as S from "./style";

export const LoginForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const onChangeValue = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.data.token);
      setNotification({
        open: true,
        message: `Usuário ${email} autenticado com sucesso!`,
        severity: "success",
      });
      router.push("/dashboard");
    } catch (error) {
      setNotification({
        open: true,
        message: error.response.data.error,
        severity: "error",
      });
    }
  };

  const handleClose = (_, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setNotification({
      open: false,
      message: "",
      severity: "",
    });
  };

  return (
    <>
      <S.Form onSubmit={onSubmit}>
        <S.Typography
          variant="h1"
          color="primary"
          style={{ marginBottom: "64px" }}
        >
          YOURfinance.IO
        </S.Typography>
        <S.TextField
          name="email"
          onChange={onChangeValue}
          label="E-mail"
          variant="outlined"
          color="primary"
          fullWidth
        />
        <S.FormControl fullWidth variant="outlined">
          <S.InputLabel htmlFor="outlined-adornment-password">
            Senha
          </S.InputLabel>
          <S.OutlinedInput
            id="outlined-adornment-password"
            name="password"
            onChange={onChangeValue}
            type={showPassword ? "text" : "password"}
            endAdornment={
              <S.InputAdornment position="end">
                <S.IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <S.VisibilityOff /> : <S.Visibility />}
                </S.IconButton>
              </S.InputAdornment>
            }
            label="Password"
          />
        </S.FormControl>
        <S.Button variant="contained" color="success" type="submit" fullWidth>
          Enviar
        </S.Button>
        <S.Link href="/register">Criar conta</S.Link>
      </S.Form>

      <S.Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <S.Alert
          variant="filled"
          onClose={handleClose}
          severity={notification.severity}
          sx={{ width: "100%" }}
        >
          {notification.message}
        </S.Alert>
      </S.Snackbar>
    </>
  );
};

export default LoginForm;
