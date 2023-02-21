import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  Grid,
} from "@mui/material";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PhotoIcon from "@mui/icons-material/Photo";

const UpdateProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const imageHandler = () => {};
  const handleSubmit = () => {};
  return (
    <Box
      sx={{
        maxWidth: "550px",
        m: "0 auto",
        alignItems: "center",
      }}
    >
      <Box sx={{ m: 1, p: 2, textAlign: "center" }}>
        <Typography component="h1" variant="h6">
          Update Profile
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            type="name"
            id="name"
            label="Name"
            name="name"
            margin="normal"
            autoComplete="name"
            required
            fullWidth
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            type="email"
            id="email"
            label="Email"
            name="email"
            margin="normal"
            autoComplete="email"
            required
            fullWidth
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Grid container style={{ alignItems: "center", margin: "8px 0" }}>
            <Grid item xs>
              <Avatar
                sx={{
                  m: 1,
                  bgcolor: "primary.main",
                  height: "60px",
                  width: "60px",
                  fontSize: "5.35rem",
                }}
              >
                <AccountCircleIcon fontSize="2.5rem" />
              </Avatar>
            </Grid>
            <Grid>
              <Button
                fullWidth
                variant="contained"
                component="label"
                startIcon={<PhotoIcon />}
              >
                <input
                  type="file"
                  hidden
                  name="avatar"
                  onChange={imageHandler}
                />
                Change Profile Picture
              </Button>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Update Profile
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default UpdateProfile;
