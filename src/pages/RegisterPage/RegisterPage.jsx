import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import * as Yup from "yup";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";

const validationSchema = Yup.object({
  name: Yup.string().required("Required to fill"),
  email: Yup.string().email("Invalid email").required("Required to fill"),
  password: Yup.string().min(6, "Too short").required("Required to fill"),
});

const RegisterPage = () => {
  const dispatch = useDispatch();

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await dispatch(register(values)).unwrap();
      resetForm();
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="80vh"
    >
      <Paper elevation={3} sx={{ p: 4, width: 400, mx: "auto", mt: 4 }}>
        <Typography variant="h5" mb={2} align="center">
          Register
        </Typography>
        <Formik
          initialValues={{ name: "", email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Box display="flex" flexDirection="column" gap={2}>
                <Field
                  as={TextField}
                  name="name"
                  label="Name"
                  autoFocus
                  variant="outlined"
                  fullWidth
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  style={{ color: "red" }}
                />

                <Field
                  as={TextField}
                  name="email"
                  label="Email"
                  variant="outlined"
                  fullWidth
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  style={{ color: "red" }}
                />

                <Field
                  as={TextField}
                  name="password"
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  style={{ color: "red" }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Registering..." : "Register"}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
};

export default RegisterPage;
