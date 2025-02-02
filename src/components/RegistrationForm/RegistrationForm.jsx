import { Formik, Form, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import * as Yup from "yup";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { toast } from "react-hot-toast";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password too short")
    .required("Password is required"),
});

const StyledError = styled(ErrorMessage)({
  color: "red",
  fontSize: "0.875rem",
  marginTop: "4px",
});

const RegistrationForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await dispatch(register(values)).unwrap();
      resetForm();
      toast.success("Registration successful!");
    } catch (error) {
      if (error.code === 11000) {
        toast.error(
          "This email is already registered. Please use another one."
        );
      } else {
        toast.error("Registration failed. Please try again.");
      }
      console.error("Registration failed:", error);
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{ padding: 4, maxWidth: 400, margin: "auto", mt: 5 }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Create Account
      </Typography>
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, values, isSubmitting }) => (
          <Form>
            <Box display="flex" flexDirection="column" gap={3}>
              <div>
                <TextField
                  label="Name"
                  name="name"
                  fullWidth
                  value={values.name}
                  onChange={handleChange}
                  variant="outlined"
                />
                <StyledError name="name" component="div" />
              </div>

              <div>
                <TextField
                  label="Email"
                  name="email"
                  fullWidth
                  value={values.email}
                  onChange={handleChange}
                  variant="outlined"
                />
                <StyledError name="email" component="div" />
              </div>

              <div>
                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  fullWidth
                  value={values.password}
                  onChange={handleChange}
                  variant="outlined"
                />
                <StyledError name="password" component="div" />
              </div>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={isSubmitting}
              >
                {isSubmitting ? "Registering..." : "Register"}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Paper>
  );
};

export default RegistrationForm;
