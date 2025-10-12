import { View, StyleSheet } from "react-native";
import { CustomText } from "@/components/CustomText";
import { format } from "date-fns";
import { Review, MyReview } from "@/types/Repository";

interface ReviewItemProps {
  review: MyReview | Review;
}

const ReviewItem = ({ review }: ReviewItemProps) => {
  const { text, rating, createdAt } = review;
  const formattedDate = format(new Date(createdAt), "dd.MM.yyyy");

  const isMyReview = !("user" in review);
  const name = isMyReview ? review.repository.fullName : review.user.username;

  return (
    <View style={styles.reviewContainer}>
      <View style={styles.ratingContainer}>
        <CustomText style={styles.ratingText}>{rating}</CustomText>
      </View>
      <View style={styles.reviewContent}>
        <CustomText style={styles.username}>{name}</CustomText>
        <CustomText style={styles.date}>{formattedDate}</CustomText>
        <CustomText style={styles.reviewText}>{text}</CustomText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  reviewContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 15,
  },
  ratingContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#0366d6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  ratingText: {
    color: "#0366d6",
    fontWeight: "bold",
  },
  reviewContent: {
    flex: 1,
  },
  username: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  date: {
    color: "#586069",
    marginBottom: 6,
  },
  reviewText: {
    color: "#24292e",
  },
});

export default ReviewItem;
