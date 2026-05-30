import React, { useState } from "react";
import { Typography, TextField, Button, Box, Paper, Alert, Divider } from "@mui/material";
import { useForm } from "react-hook-form";
import { postModel } from "../../lib/fetchModelData";

function LoginRegister({ onLogin }) {
  const [loginError, setLoginError] = useState("");
  const [regError, setRegError] = useState("");
  const [regSuccess, setRegSuccess] = useState("");

  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm({
    defaultValues: {
      login_name: "",
      password: "",
    },
  });

  const {
    register: registerField,
    handleSubmit: handleRegisterSubmit,
    watch,
    reset,
    formState: { errors: registerErrors },
  } = useForm({
    defaultValues: {
      login_name: "",
      password: "",
      confirmPassword: "",
      first_name: "",
      last_name: "",
      location: "",
      description: "",
      occupation: "",
    },
  });

  const onSubmitLogin = (data) => {
    setLoginError("");
    postModel("/admin/login", data)
      .then((res) => onLogin(res.data))
      .catch((err) => setLoginError(err.message));
  };

  const onSubmitRegister = ({ confirmPassword, ...data }) => {
    setRegError("");
    setRegSuccess("");
    postModel("/admin/register", data)
      .then(() => {
        setRegSuccess("Registration successful. Please log in.");
        reset();
      })
      .catch((err) => setRegError(err.message));
  };

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 4 }}>
      <Paper component="form" sx={{ p: 4, mb: 3 }} onSubmit={handleLoginSubmit(onSubmitLogin)}>
        <Typography variant="h5" gutterBottom>Login</Typography>
        {loginError && <Alert severity="error" sx={{ mb: 2 }}>{loginError}</Alert>}
        <TextField
          label="Login Name"
          fullWidth
          sx={{ mb: 2 }}
          error={Boolean(loginErrors.login_name)}
          helperText={loginErrors.login_name?.message}
          {...registerLogin("login_name", { required: "Login name is required" })}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          sx={{ mb: 2 }}
          error={Boolean(loginErrors.password)}
          helperText={loginErrors.password?.message}
          {...registerLogin("password", { required: "Password is required" })}
        />
        <Button type="submit" variant="contained" fullWidth>Login</Button>
      </Paper>

      <Divider sx={{ mb: 3 }}>OR</Divider>

      <Paper component="form" sx={{ p: 4 }} onSubmit={handleRegisterSubmit(onSubmitRegister)}>
        <Typography variant="h5" gutterBottom>Register New Account</Typography>
        {regError && <Alert severity="error" sx={{ mb: 2 }}>{regError}</Alert>}
        {regSuccess && <Alert severity="success" sx={{ mb: 2 }}>{regSuccess}</Alert>}
        <TextField
          label="Login Name *"
          fullWidth
          sx={{ mb: 2 }}
          error={Boolean(registerErrors.login_name)}
          helperText={registerErrors.login_name?.message}
          {...registerField("login_name", { required: "Login name is required" })}
        />
        <TextField
          label="Password *"
          type="password"
          fullWidth
          sx={{ mb: 2 }}
          error={Boolean(registerErrors.password)}
          helperText={registerErrors.password?.message}
          {...registerField("password", { required: "Password is required" })}
        />
        <TextField
          label="Confirm Password *"
          type="password"
          fullWidth
          sx={{ mb: 2 }}
          error={Boolean(registerErrors.confirmPassword)}
          helperText={registerErrors.confirmPassword?.message}
          {...registerField("confirmPassword", {
            required: "Confirm password is required",
            validate: (value) => value === watch("password") || "Passwords do not match",
          })}
        />
        <TextField
          label="First Name *"
          fullWidth
          sx={{ mb: 2 }}
          error={Boolean(registerErrors.first_name)}
          helperText={registerErrors.first_name?.message}
          {...registerField("first_name", { required: "First name is required" })}
        />
        <TextField
          label="Last Name *"
          fullWidth
          sx={{ mb: 2 }}
          error={Boolean(registerErrors.last_name)}
          helperText={registerErrors.last_name?.message}
          {...registerField("last_name", { required: "Last name is required" })}
        />
        <TextField label="Location" fullWidth sx={{ mb: 2 }} {...registerField("location")} />
        <TextField label="Description" fullWidth sx={{ mb: 2 }} {...registerField("description")} />
        <TextField label="Occupation" fullWidth sx={{ mb: 2 }} {...registerField("occupation")} />
        <Button type="submit" variant="outlined" fullWidth>Register Me</Button>
      </Paper>
    </Box>
  );
}

export default LoginRegister;
