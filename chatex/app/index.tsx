import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { DefaultStyles } from "@/styles/DefaultStyles";
import { useUserStore } from "@/store/useUserStore";
import { router } from "expo-router";
import { rem } from "@/utils/rn-units";
import { login } from "@/api/client/auth/login";

const LoginScreen = () => {
  const [name, setName] = useState("");
  const setUsername = useUserStore((s) => s.setUsername);

  useEffect(() => {
    const checkUser = async () => {
      await useUserStore.getState().loadUsername();
      const user = useUserStore.getState().username;
      if (user) {
        router.replace("/chats");
      }
    };
    checkUser();
  }, []);

  const handleLogin = async () => {
    if (name.trim()) {
      const user = await login({ username: name });
      if (!user) {
        Alert.alert("Failed to login");
      }
      Alert.alert("Successfully logged in");
      setUsername(user.user.username);
      router.push("/chat");
    }
  };
  return (
    <SafeAreaView style={DefaultStyles.flex1}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <View style={styles.container}>
              <Text style={{ fontSize: 40 }}>Login</Text>
              <Text style={{ fontSize: 25 }}>
                Please enter your name for chat
              </Text>
              <View style={styles.container}>
                <TextInput
                  autoFocus
                  autoCorrect={false}
                  style={styles.input}
                  placeholder="Username"
                  value={name}
                  onChangeText={setName}
                />
                <TouchableOpacity onPress={handleLogin} style={styles.button}>
                  <Text>Join chat</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: rem(20),
  },
  input: {
    borderColor: "black",
    borderRadius: rem(12),
    width: "80%",
    borderWidth: rem(1),
    backgroundColor: "white",
    color: "black",
    paddingHorizontal: rem(16),
    paddingVertical: rem(12),
  },
  button: {
    paddingHorizontal: rem(16),
    paddingVertical: rem(12),
    borderRadius: rem(12),
    borderWidth: rem(1),
    textAlign: "center",
    borderColor: "#4287f5",
    backgroundColor: "#4287f5",
  },
});
