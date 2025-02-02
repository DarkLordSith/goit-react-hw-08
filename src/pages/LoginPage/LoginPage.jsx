import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { login } from "../../redux/auth/operations";
import { toast } from "react-hot-toast";
import * as Yup from "yup";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Required to fill"),
  password: Yup.string().min(6, "Too short").required("Required to fill"),
});

const LoginPage = () => {
  const dispatch = useDispatch();

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await dispatch(login(values)).unwrap();
      toast.success("Login successful!");
      resetForm();
    } catch (error) {
      toast.error("Invalid email or password!");
      console.error("Login failed:", error);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="80vh"
    >
      <Paper elevation={3} sx={{ p: 4, width: 400 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Box display="flex" flexDirection="column" gap={2}>
                <Field
                  as={TextField}
                  name="email"
                  label="Email"
                  autoFocus
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
                  {isSubmitting ? "Logging in..." : "Login"}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
};

export default LoginPage;
