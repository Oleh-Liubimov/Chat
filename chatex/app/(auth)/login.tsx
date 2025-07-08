import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUserStore } from "@/store/useUserStore";
import { router } from "expo-router";
import { rem } from "@/utils/rn-units";
import { login } from "@/api/client/auth/login";
import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
  const [name, setName] = useState("");
  const setUser = useUserStore().setUser;

  const handleLogin = async () => {
    if (!name) {
      Alert.alert("Please enter some username");
    }

    if (name.trim()) {
      const response = await login({ username: name });
      await AsyncStorage.setItem("accessToken", response.accessToken);

      setUser(response.user);
      router.replace("/");
    }
  };
  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1 w-full justify-center items-center gap-4">
            <View style={styles.container}>
              <Text style={{ fontSize: 40 }}>Login</Text>
              <Text style={{ fontSize: 25 }}>
                Please enter your name for chat
              </Text>
              <View style={styles.container}>
                <Input>
                  <InputField
                    autoFocus
                    autoCorrect={false}
                    value={name}
                    onChangeText={setName}
                    placeholder="Please enter a username"
                  />
                </Input>
                <Button onPress={handleLogin}>
                  <ButtonText>Join chat</ButtonText>
                </Button>
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
