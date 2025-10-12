import AsyncStorage from "@react-native-async-storage/async-storage";

class AuthStorage {
  private namespace: string;

  constructor(namespace = "auth") {
    this.namespace = namespace;
  }

  async getAccessToken(): Promise<string | null> {
    try {
      const token = await AsyncStorage.getItem(`${this.namespace}:accessToken`);
      return token;
    } catch (error) {
      console.error("Failed to get access token:", error);
      return null;
    }
  }

  async setAccessToken(accessToken: string): Promise<void> {
    try {
      await AsyncStorage.setItem(`${this.namespace}:accessToken`, accessToken);
    } catch (error) {
      console.error("Failed to save access token:", error);
    }
  }

  async removeAccessToken(): Promise<void> {
    try {
      await AsyncStorage.removeItem(`${this.namespace}:accessToken`);
    } catch (error) {
      console.error("Failed to remove access token:", error);
    }
  }
}

export default AuthStorage;
