import React from "react";
import { View, Text, Image, StyleSheet, Button, Linking } from "react-native";
import { Repository } from "../types/Repository";

const formatCount = (count: number): string => {
  return count >= 1000 ? `${(count / 1000).toFixed(1)}k` : `${count}`;
};

interface RepositoryItemProps extends Repository {
  githubLink?: string | null;
}

const RepositoryItem = ({
  fullName,
  description,
  language,
  forksCount,
  stargazersCount,
  ratingAverage,
  reviewCount,
  ownerAvatarUrl,
  githubLink = null,
}: RepositoryItemProps) => {
  return (
    <View style={styles.container} testID="repositoryItem">
      <View style={styles.topSection}>
        <Image style={styles.avatar} source={{ uri: ownerAvatarUrl }} />
        <View style={styles.infoContainer}>
          <Text style={styles.fullName}>{fullName}</Text>
          <Text style={styles.description}>{description}</Text>
          <View style={styles.languageTag}>
            <Text style={styles.languageText}>{language}</Text>
          </View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <StatItem label="Stars" value={formatCount(stargazersCount)} />
        <StatItem label="Forks" value={formatCount(forksCount)} />
        <StatItem label="Reviews" value={reviewCount.toString()} />
        <StatItem label="Rating" value={ratingAverage.toString()} />
      </View>

      {!!githubLink && (
        <View style={styles.githubButton}>
          <Button
            title="Open in GitHub"
            onPress={() => Linking.openURL(githubLink)}
          />
        </View>
      )}
    </View>
  );
};

const StatItem = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.statItem}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  topSection: {
    flexDirection: "row",
    marginBottom: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
  },
  fullName: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  description: {
    color: "#586069",
    marginBottom: 6,
  },
  languageTag: {
    alignSelf: "flex-start",
    backgroundColor: "#0366d6",
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 6,
  },
  languageText: {
    color: "white",
    fontSize: 12,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontWeight: "bold",
  },
  statLabel: {
    color: "#586069",
  },
  githubButton: {
    marginTop: 20,
  },
});

export default RepositoryItem;
