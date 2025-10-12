import SingleRepositoryView from "@/components/SingleRepositoryView";
import { useLocalSearchParams } from "expo-router";

export default function SingleRepositoryPage() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return <SingleRepositoryView id={id} />;
}
