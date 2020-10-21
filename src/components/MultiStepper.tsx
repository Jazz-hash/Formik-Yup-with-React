import {
  Box,
  Button,
  Card,
  CardContent,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import { Field, Form, Formik, FormikConfig, FormikValues } from "formik";
import { CheckboxWithLabel, TextField } from "formik-material-ui";
import React from "react";
import { mixed, number, object } from "yup";

const sleep = (time: number) =>
  new Promise((accept) => setTimeout(accept, time));

const MultiStepper = () => {
  return (
    <Card>
      <CardContent style={{ margin: "40px" }}>
        <Typography
          className="styled-font"
          align="center"
          component="h1"
          variant="h3"
        >
          Multi-Step Form
        </Typography>
        <FormikStepper
          initialValues={{
            firstName: "",
            lastName: "",
            millionaire: false,
            money: 0,
            description: "",
          }}
          onSubmit={async (values) => {
            await sleep(3000);
            console.log(values);
          }}
        >
          <FormikStep label="Personal Date">
            <Box paddingBottom={2}>
              <Field
                fullWidth
                name="firstName"
                component={TextField}
                label="First Name"
              ></Field>
            </Box>

            <Box paddingBottom={2}>
              <Field
                name="lastName"
                fullWidth
                component={TextField}
                label="Last Name"
              ></Field>
            </Box>

            <Box paddingBottom={2}>
              <Field
                name="millionaire"
                component={CheckboxWithLabel}
                type="checkbox"
                Label={{ label: "Millionaire" }}
              ></Field>
            </Box>
          </FormikStep>
          <FormikStep
            label="Bank Accounts"
            validationSchema={object({
              money: mixed().when("millionaire", {
                is: true,
                then: number()
                  .required()
                  .min(
                    1_000_000,
                    "As you said you're a millionaire, you should have atleast 1 million pounds."
                  ),
                otherwise: number().required(),
              }),
            })}
          >
            <Box paddingBottom={2}>
              <Field
                name="money"
                fullWidth
                component={TextField}
                type="number"
                label="All the money I have"
              ></Field>
            </Box>
          </FormikStep>
          <FormikStep label="More Infomation">
            <Box paddingBottom={2}>
              <Field
                fullWidth
                name="description"
                component={TextField}
                label="Description"
              ></Field>
            </Box>
          </FormikStep>
        </FormikStepper>
      </CardContent>
    </Card>
  );
};

export interface FormikStepProps
  extends Pick<FormikConfig<FormikValues>, "children" | "validationSchema"> {
  label: string;
}
export function FormikStep({ children }: FormikStepProps) {
  return <>{children}</>;
}

export function FormikStepper({
  children,
  ...props
}: FormikConfig<FormikValues>) {
  const childrenArray = React.Children.toArray(children) as React.ReactElement<
    FormikStepProps
  >[];
  const [step, setStep] = React.useState(0);
  const currentChild = childrenArray[step] as React.ReactElement<
    FormikStepProps
  >;
  const [completed, setCompleted] = React.useState(false);

  function isLastStep() {
    return step === childrenArray.length - 1;
  }

  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={async (values, helpers) => {
        if (isLastStep()) {
          await props.onSubmit(values, helpers);
          setCompleted(true);
        } else {
          setStep((step) => step + 1);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form autoComplete="off">
          <Stepper alternativeLabel activeStep={step}>
            {childrenArray.map((child, index) => (
              <Step
                key={child.props.label}
                completed={step > index || completed}
              >
                <StepLabel>{child.props.label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {currentChild}
          {step > 0 && (
            <Button
              disabled={isSubmitting}
              color="primary"
              variant="contained"
              onClick={() => setStep((step) => step - 1)}
              style={{ marginRight: "5px" }}
            >
              Back
            </Button>
          )}
          <Button
            startIcon={isSubmitting && <CircularProgress size="1rem" />}
            disabled={isSubmitting}
            color="primary"
            variant="contained"
            type="submit"
          >
            {isSubmitting ? "Submitting" : isLastStep() ? "Submit" : "Next"}
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default MultiStepper;
