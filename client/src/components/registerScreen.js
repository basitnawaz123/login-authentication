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

const RegistrationScreen = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [transition, setTransition] = useState(undefined);
  const [error, setError] = useState("");
  const [values, setValues] = useState({
    name: "",
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
      .post("http://localhost:5000/api/user", {
        name: values.name,
        email: values.email,
        password: values.password,
      })
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          setLoading(false);
          setOpen(true);
          setError(res.data.message);
        }
      })
      .catch((err) => {
        setOpen(true);
        setLoading(false);
        setError(err.message);
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
                Register
              </Typography>
            </Grid>
            <Grid item>
              <form onSubmit={handleSubmit}>
                <Grid container direction="column" spacing={2}>
                  <Grid item>
                    <TextField
                      type="text"
                      placeholder="Name"
                      fullWidth
                      name="name"
                      variant="outlined"
                      label="Name"
                      autoFocus
                      value={values.name}
                      onChange={handleChange("name")}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      type="email"
                      placeholder="Email"
                      fullWidth={true}
                      name="email"
                      variant="outlined"
                      label="Email"
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
                      Register
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

export default RegistrationScreen;
