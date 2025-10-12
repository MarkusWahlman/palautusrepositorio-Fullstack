import React from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { useRouter } from "expo-router";
import { CustomText } from "@/components/CustomText";

const CREATE_REVIEW = gql`
  mutation CreateReview($review: CreateReviewInput!) {
    createReview(review: $review) {
      repositoryId
    }
  }
`;

const validationSchema = Yup.object().shape({
  ownerName: Yup.string().required("Repository owner name is required"),
  repositoryName: Yup.string().required("Repository name is required"),
  rating: Yup.number()
    .required("Rating is required")
    .min(0, "Rating must be at least 0")
    .max(100, "Rating cannot be more than 100"),
  text: Yup.string().optional(),
});

interface CreateReviewResponse {
  createReview: {
    repositoryId: string;
  };
}

export default function CreateReviewForm() {
  const router = useRouter();
  const [createReview] = useMutation<CreateReviewResponse>(CREATE_REVIEW);

  const handleSubmit = async (values: any) => {
    const { ownerName, repositoryName, rating, text } = values;

    try {
      const { data } = await createReview({
        variables: {
          review: {
            ownerName,
            repositoryName,
            rating: Number(rating),
            text,
          },
        },
      });

      if (data?.createReview?.repositoryId) {
        router.push(`/repository/${data.createReview.repositoryId}`);
      }
    } catch (e: any) {
      console.error("Error creating review:", e.message);
    }
  };

  return (
    <Formik
      initialValues={{
        ownerName: "",
        repositoryName: "",
        rating: "",
        text: "",
      }}
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
              touched.ownerName && errors.ownerName ? styles.inputError : null,
            ]}
            placeholder="Repository owner name"
            onChangeText={handleChange("ownerName")}
            onBlur={handleBlur("ownerName")}
            value={values.ownerName}
          />
          {touched.ownerName && errors.ownerName && (
            <CustomText style={styles.errorText}>{errors.ownerName}</CustomText>
          )}

          <TextInput
            style={[
              styles.input,
              touched.repositoryName && errors.repositoryName
                ? styles.inputError
                : null,
            ]}
            placeholder="Repository name"
            onChangeText={handleChange("repositoryName")}
            onBlur={handleBlur("repositoryName")}
            value={values.repositoryName}
          />
          {touched.repositoryName && errors.repositoryName && (
            <CustomText style={styles.errorText}>
              {errors.repositoryName}
            </CustomText>
          )}

          <TextInput
            style={[
              styles.input,
              touched.rating && errors.rating ? styles.inputError : null,
            ]}
            placeholder="Rating between 0 and 100"
            keyboardType="numeric"
            onChangeText={handleChange("rating")}
            onBlur={handleBlur("rating")}
            value={values.rating}
          />
          {touched.rating && errors.rating && (
            <CustomText style={styles.errorText}>{errors.rating}</CustomText>
          )}

          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Review (optional)"
            multiline
            onChangeText={handleChange("text")}
            onBlur={handleBlur("text")}
            value={values.text}
          />

          <Button title="Create review" onPress={handleSubmit as any} />
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
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  inputError: {
    borderColor: "#d73a4a",
  },
  errorText: {
    color: "#d73a4a",
    marginBottom: 8,
  },
});
