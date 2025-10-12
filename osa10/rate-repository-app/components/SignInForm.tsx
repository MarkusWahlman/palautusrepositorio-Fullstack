import { View, TextInput, Button, StyleSheet } from "react-native";
import { CustomText } from "./CustomText";

import { Formik } from "formik";
import * as Yup from "yup";
import useSignIn from "@/hooks/useSignIn";

interface SignInFormValues {
  username: string;
  password: string;
}

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

interface SignInFormProps {
  onSignIn?: (values: SignInFormValues) => void | Promise<void>;
}

const SignInForm = ({ onSignIn }: SignInFormProps) => {
  const [signIn] = useSignIn();

  const handleFormSubmit = async (values: SignInFormValues) => {
    const { username, password } = values;

    try {
      await signIn({ username, password });
      if (onSignIn) {
        await onSignIn(values);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={handleFormSubmit}
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

          <Button title="Sign in" onPress={handleSubmit as any} />
        </View>
      )}
    </Formik>
  );
};

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

export default SignInForm;
