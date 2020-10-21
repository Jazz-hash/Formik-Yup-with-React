import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";

let signupSchema = Yup.object({
  firstName: Yup.string().required("This field is required."),
  lastName: Yup.string().required("This field is required."),
  email: Yup.string().email().required("This field is required."),
  password: Yup.string()
    .min(6, "Password is too short.")
    .max(20, "Password is too long.")
    .required("This field is required."),
});

const useStyles = makeStyles((theme) => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(6),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Signup = () => {
  const styles = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />

      <div className={styles.paper}>
        <Typography
          className="styled-font"
          align="center"
          component="h1"
          variant="h3"
        >
          Single-Step Form
        </Typography>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
          }}
          validationSchema={signupSchema}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {(formik) => (
            <Form className={styles.form} onSubmit={formik.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Field
                    type="text"
                    as={TextField}
                    variant="outlined"
                    label="First Name"
                    name="firstName"
                    id="firstName"
                    autoFocus
                    fullWidth
                    autoComplete="firstName"
                  />
                  <ErrorMessage
                    name="firstName"
                    render={(msg) => (
                      <span style={{ color: "red" }}>{msg}</span>
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    type="text"
                    as={TextField}
                    variant="outlined"
                    label="Last Name"
                    name="lastName"
                    id="lastName"
                    autoFocus
                    fullWidth
                    autoComplete="lastName"
                  />
                  <ErrorMessage
                    name="lastName"
                    render={(msg) => (
                      <span style={{ color: "red" }}>{msg}</span>
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    type="text"
                    as={TextField}
                    variant="outlined"
                    label="Email"
                    name="email"
                    id="email"
                    autoFocus
                    fullWidth
                    autoComplete="email"
                  />
                  <ErrorMessage
                    name="email"
                    render={(msg) => (
                      <span style={{ color: "red" }}>{msg}</span>
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    type="password"
                    as={TextField}
                    variant="outlined"
                    label="Password"
                    name="password"
                    id="password"
                    autoFocus
                    fullWidth
                    autoComplete="password"
                  />
                  <ErrorMessage
                    name="password"
                    render={(msg) => (
                      <span style={{ color: "red" }}>{msg}</span>
                    )}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={styles.submit}
              >
                Sign Up
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
};

export default Signup;
