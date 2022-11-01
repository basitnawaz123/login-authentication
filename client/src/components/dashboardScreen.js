import { Button, Container, Grid, Paper } from "@mui/material";
import React, { useState } from "react";
import jwt_decode from "jwt-decode";
import { redirect, useNavigate } from "react-router-dom";

const DashboardScreen = () => {
  const navigate = useNavigate();
  var token = localStorage.getItem("token");
  var data = jwt_decode(token);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
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
            <h2>Welcome to your dashboard</h2>
            <h2>Name: {data.name}</h2>
            <h2>Email: {data.email}</h2>

            <Button onClick={handleLogout} variant="contained">
              Logout
            </Button>
          </Paper>
        </Grid>
      </Container>
    </>
  );
};

export default DashboardScreen;
