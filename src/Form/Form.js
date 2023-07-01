import React from "react";
import { useFormik } from "formik";
import "./Form.css";
import * as yup from "yup";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  Radio,
  FormControlLabel,
  Checkbox,
  Button,
  Alert,
} from "@mui/material";

const validationSchema = yup.object({
  name: yup
    .string()
    .matches(/^[^0-9]*$/, "Name should not contain a number")
    .required("Name is required"),
  address: yup.string().required("Address is required"),
  country: yup.string().required("Country is required"),
  gender: yup.string().required("Gender is required"),
  hobbies: yup.array().min(1, "Select at least one hobby/interest"),
});

const countries = [
  "Australia",
  "Canada",
  "England",
  "India",
  "Jamaica",
  "Pakistan",
  "USA",
  "Other",
];

const genders = ["Male", "Female", "Other"];

const hobbiesOptions = [
  "Collecting",
  "Reading",
  "Painting",
  "Travelling",
  "Cooking",
  "Sports",
  "Gardening",
  "Others",
];

const Form = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      country: "",
      gender: "",
      hobbies: [],
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div className="outer-form">
      <div className="title">FORM-FILLER</div>
      <div className="form-container">
        <form onSubmit={formik.handleSubmit} className="form">
          <div className="form-element">
            <p className="heading">Name</p>
            <TextField
              fullWidth
              id="name"
              className="form-element"
              name="name"
              label="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              inputProps={{
                style: {
                  backgroundColor: "#f7f7f7",
                },
              }}
            />
          </div>
          {formik.touched.name && formik.errors.name && (
            <Alert severity="error">{formik.errors.name}</Alert>
          )}
          <div className="form-element">
            <p className="heading">Address</p>
            <TextField
              fullWidth
              id="address"
              className="form-element"
              name="address"
              label="Address"
              value={formik.values.address}
              onChange={formik.handleChange}
              inputProps={{
                style: {
                  backgroundColor: "#f7f7f7",
                },
              }}
              multiline
              rows={3}
            />
          </div>
          {formik.touched.address && formik.errors.address && (
            <Alert severity="error">{formik.errors.address}</Alert>
          )}
          <div className="form-element">
            <p className="heading">Country</p>
            <FormControl fullWidth>
              <InputLabel id="country-label">Country</InputLabel>
              <Select
                labelId="country-label"
                id="country"
                name="country"
                label="Country"
                value={formik.values.country}
                onChange={formik.handleChange}
                error={formik.touched.country && Boolean(formik.errors.country)}
                style={{ backgroundColor: "#f7f7f7" }}
              >
                {countries.map((country) => (
                  <MenuItem key={country} value={country}>
                    {country}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          {formik.touched.country && formik.errors.country && (
            <Alert severity="error">{formik.errors.country}</Alert>
          )}

          <div className="form-element">
            <p className="heading">Gender</p>
            <FormControl component="fieldset">
              <RadioGroup
                row
                aria-label="gender"
                name="gender"
                value={formik.values.gender}
                onChange={formik.handleChange}
              >
                {genders.map((gender) => (
                  <FormControlLabel
                    key={gender}
                    value={gender}
                    control={<Radio />}
                    label={gender}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </div>
          {formik.touched.gender && formik.errors.gender && (
            <Alert severity="error">{formik.errors.gender}</Alert>
          )}

          <div className="form-element">
            <p className="heading">Hobbies/Interests</p>
            <FormControl fullWidth>
              <InputLabel id="hobbies-label">Hobbies</InputLabel>
              <Select
                labelId="hobbies-label"
                label="Hobbies"
                id="hobbies"
                name="hobbies"
                multiple
                value={formik.values.hobbies}
                onChange={formik.handleChange}
                error={formik.touched.hobbies && Boolean(formik.errors.hobbies)}
                renderValue={(selected) => selected.join(", ")}
                style={{ backgroundColor: "#f7f7f7" }}
              >
                {hobbiesOptions.map((hobby) => (
                  <MenuItem key={hobby} value={hobby}>
                    <Checkbox checked={formik.values.hobbies.includes(hobby)} />
                    {hobby}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          {formik.touched.hobbies && formik.errors.hobbies && (
            <Alert severity="error">{formik.errors.hobbies}</Alert>
          )}
          <div>
            <Button color="primary" variant="contained" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
