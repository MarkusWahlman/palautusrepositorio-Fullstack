import React from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { CustomText } from "@/components/CustomText";
import useSignIn from "@/hooks/useSignIn";

const CREATE_USER = gql`
  mutation CreateUser($user: CreateUserInput!) {
    createUser(user: $user) {
      id
      username
    }
  }
`;

interface SignUpFormValues {
  username: string;
  password: string;
  passwordConfirm: string;
}

interface CreateUserResponse {
  createUser: {
    id: string;
    username: string;
  };
}

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required")
    .min(5, "Username must be at least 5 characters long")
    .max(30, "Username cannot exceed 30 characters"),
  password: Yup.string()
    .required("Password is required")
    .min(5, "Password must be at least 5 characters long")
    .max(50, "Password cannot exceed 50 characters"),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Password confirmation is required"),
});

interface SignUpFormProps {
  onSignUp: (values: SignUpFormValues) => void | Promise<void>;
}

export default function SignUpForm({ onSignUp }: SignUpFormProps) {
  const [createUser] = useMutation<CreateUserResponse>(CREATE_USER);
  const [signIn] = useSignIn();

  const handleSubmit = async (
    values: SignUpFormValues,
    { resetForm }: FormikHelpers<SignUpFormValues>
  ) => {
    const { username, password } = values;

    try {
      await createUser({
        variables: { user: { username, password } },
      });

      await signIn({ username, password });

      if (onSignUp) {
        await onSignUp(values);
      }
      resetForm();
    } catch (e) {
      console.error("Error signing up:", e);
    }
  };

  return (
    <Formik
      initialValues={{ username: "", password: "", passwordConfirm: "" }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <View style={styles.container}>
          <TextInput
            style={[
              styles.input,
              touched.username && errors.username ? styles.inputError : null,
            ]}
            placeholder="Username"
            onChangeText={handleChange("username")}
            onBlur={handleBlur("username")}
            value={values.username}
          />
          {touched.username && errors.username && (
            <CustomText style={styles.errorText}>{errors.username}</CustomText>
          )}

          <TextInput
            style={[
              styles.input,
              touched.password && errors.password ? styles.inputError : null,
            ]}
            placeholder="Password"
            secureTextEntry
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            value={values.password}
          />
          {touched.password && errors.password && (
            <CustomText style={styles.errorText}>{errors.password}</CustomText>
          )}

          <TextInput
            style={[
              styles.input,
              touched.passwordConfirm && errors.passwordConfirm
                ? styles.inputError
                : null,
            ]}
            placeholder="Confirm password"
            secureTextEntry
            onChangeText={handleChange("passwordConfirm")}
            onBlur={handleBlur("passwordConfirm")}
            value={values.passwordConfirm}
          />
          {touched.passwordConfirm && errors.passwordConfirm && (
            <CustomText style={styles.errorText}>
              {errors.passwordConfirm}
            </CustomText>
          )}

          <Button title="Sign up" onPress={handleSubmit as any} />
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
  },
  input: {
    height: 48,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 8,
    paddingHorizontal: 10,
  },
  inputError: {
    borderColor: "#d73a4a",
  },
  errorText: {
    color: "#d73a4a",
    marginBottom: 8,
  },
});
