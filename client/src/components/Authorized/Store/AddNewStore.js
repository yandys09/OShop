import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";

import {
  Box,
  Typography,
  TextField,
  Button,
  TextareaAutosize,
  Grid,
  Avatar,
} from "@mui/material";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import InsertPhotoRoundedIcon from "@mui/icons-material/InsertPhotoRounded";
import PhotoIcon from "@mui/icons-material/Photo";

import {
  addStore,
  resetMutationResult,
  selectStoreMutationResult,
} from "../../../redux/features/storeSlice";

const AddNewStore = () => {
  const dispatch = useDispatch();
  const { loading, success } = useSelector(selectStoreMutationResult);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [previewLogo, setPreviewLogo] = useState("");
  const [logo, setLogo] = useState("");

  const imageHandler = (e) => {
    if (e.target.name === "logo") {
      setLogo(e.target.files);
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setPreviewLogo(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("address", address);
    formData.append("city", city);
    formData.append("zipCode", zipCode);
    formData.append("state", state);
    formData.append("country", country);
    formData.append("email", email);
    formData.append("phone", phone);
    Object.keys(logo).forEach((key) => {
      formData.append(logo.item(key).name, logo.item(key));
    });
    dispatch(addStore({ formData, toast }));
  };
  useEffect(() => {
    if (success) {
      dispatch(resetMutationResult());
      setTitle("");
      setDescription("");
      setAddress("");
      setCity("");
      setZipCode("");
      setCountry("");
      setState("");
      setEmail("");
      setPhone("");
      setPreviewLogo("");
      setLogo("");
    }
  }, [success, dispatch]);

  return (
    <Box
      sx={{ m: "0 auto", marginTop: 2, textAlign: "center", maxWidth: "550px" }}
    >
      <Typography component="div" variant="h5">
        Add new store
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          type="text"
          id="title"
          label="Title"
          name="title"
          margin="normal"
          required
          fullWidth
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          type="text"
          id="description"
          label="Description"
          name="description"
          margin="normal"
          required
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextareaAutosize
          required
          aria-label="address"
          minRows={5}
          placeholder="Address"
          value={address}
          style={{ width: "100%", marginTop: "16px" }}
          onChange={(e) => setAddress(e.target.value)}
        />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              type="text"
              id="city"
              label="City"
              name="city"
              margin="normal"
              required
              fullWidth
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              type="text"
              id="zipCode"
              label="Zip"
              name="zipCode"
              margin="normal"
              required
              fullWidth
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CountryDropdown
              classes="ship-drop-down"
              defaultOptionLabel="Select a country"
              style={{ width: "100%" }}
              value={country}
              valueType="short"
              priorityOptions={["KR", "US", "GB", "CA"]}
              onChange={(e) => setCountry(e)}
            />
          </Grid>
          <Grid item xs={6}>
            <RegionDropdown
              classes="ship-drop-down"
              defaultOptionLabel="Now select a region"
              blankOptionLabel="No country selected"
              style={{ width: "100%" }}
              value={state}
              country={country}
              countryValueType="short"
              onChange={(e) => setState(e)}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              type="email"
              id="email"
              label="Email"
              name="email"
              margin="normal"
              required
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              type="text"
              id="phone"
              label="Phone"
              name="phone"
              margin="normal"
              required
              fullWidth
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Grid>
        </Grid>

        <Grid container style={{ alignItems: "center", margin: "10px 0" }}>
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
              {!previewLogo ? (
                <InsertPhotoRoundedIcon
                  sx={{ height: "60px", width: "60px" }}
                />
              ) : (
                <img
                  alt="avatar"
                  src={previewLogo}
                  style={{ height: "60px", width: "60px", borderRadius: "50%" }}
                />
              )}
            </Avatar>
          </Grid>
          <Grid>
            <Button
              fullWidth
              variant="contained"
              component="label"
              startIcon={<PhotoIcon />}
            >
              <input type="file" hidden name="logo" onChange={imageHandler} />
              Change Profile Picture
            </Button>
          </Grid>
        </Grid>

        <Button
          type="submit"
          fullWidth
          disabled={loading ? true : false}
          variant="contained"
          startIcon={<AddBoxOutlinedIcon />}
          sx={{ mt: 3, mb: 2 }}
        >
          Add Store
        </Button>
      </Box>
    </Box>
  );
};

export default AddNewStore;
