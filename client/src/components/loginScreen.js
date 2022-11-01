import {
  Container,
  Grid,
  Paper,
  Snackbar,
  Alert,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginScreen = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [transition, setTransition] = useState(undefined);
  const [error, setError] = useState("");
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (prop) => (e) => {
    setValues({ ...values, [prop]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("http://localhost:5000/api/user/login", {
        email: values.email,
        password: values.password,
      })
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          setLoading(false);
          localStorage.setItem("token", res.data.token);
          navigate("/dashboard");
        }
      })
      .catch((err) => {
        setOpen(true);
        setLoading(false);
        setError(err.response.data.error);
      });
  };

  return (
    <>
      <Container maxWidth="sm">
        <Grid container direction="column" justify="center" spacing={2}>
          <Paper
            sx={{ marginTop: 15, padding: 4 }}
            variant="elevation"
            elevation={2}
          >
            <Grid item>
              <Snackbar
                open={open}
                onClose={() => setOpen(false)}
                TransitionComponent={transition}
                key={transition ? transition.name : ""}
              >
                <Alert severity="error">{error}!</Alert>
              </Snackbar>

              <Typography
                variant="h4"
                align="center"
                color="textPrimary"
                gutterBottom={true}
              >
                Login
              </Typography>
            </Grid>
            <Grid item>
              <form onSubmit={handleSubmit}>
                <Grid container direction="column" spacing={2}>
                  <Grid item>
                    <TextField
                      type="email"
                      placeholder="Email"
                      fullWidth={true}
                      name="email"
                      variant="outlined"
                      label="Email"
                      required={true}
                      autoFocus
                      value={values.email}
                      onChange={handleChange("email")}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      type="password"
                      placeholder="Password"
                      fullWidth={true}
                      name="password"
                      variant="outlined"
                      label="Password"
                      required={true}
                      autoFocus
                      value={values.password}
                      onChange={handleChange("password")}
                    />
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      fullWidth={true}
                    >
                      Login
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Paper>
        </Grid>
      </Container>
    </>
  );
};

export default LoginScreen;
