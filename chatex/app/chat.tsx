import {
  FlatList,
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
import { useUserStore } from "@/store/useUserStore";
import { router } from "expo-router";
import { socket } from "@/socket/socket";
import { rem } from "@/utils/rn-units";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MessageList } from "@/components/MessageList";
import { SafeAreaView } from "react-native-safe-area-context";
import { DefaultStyles } from "@/styles/DefaultStyles";
import { SingleMessage } from "@/components/Message";
import { Input, InputField, InputSlot } from "@/components/ui/input";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { SendHorizontal } from "lucide-react-native";

export type Message = {
  _id: string;
  username: string;
  messageContent: string;
  createdAt?: string;
};

const ChatScreen = () => {
  const username = useUserStore((s) => s.username);

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const seeUsername = async () => {
    console.log(await AsyncStorage.getItem("username"));
  };

  useEffect(() => {
    seeUsername();
  });

  useEffect(() => {
    if (!username) {
      router.replace("/");
      return;
    }

    socket.on("connect", () => {
      console.log("Connected to socket");
    });

    socket.on("chat-history", (history: Message[]) => {
      setMessages(history);
    });

    socket.on("new-message", (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.on("disconnect", () => {
        console.log("disconnected from socket");
      });
      socket.off("chat-history");
      socket.off("new-message");
    };
  }, []);

  const handleSendMessage = () => {
    if (input.trim()) {
      socket.emit("new-message", {
        username,
        messageContent: input.trim(),
      });
      setInput("");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <SafeAreaView
        style={[DefaultStyles.flex1, { backgroundColor: "#011b45" }]}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Text
              style={{ fontSize: rem(25), color: "white", textAlign: "center" }}
            >
              Chat
            </Text>
            <View style={DefaultStyles.flex1}>
              <MessageList messages={messages} />
            </View>
            <View className="flex-row items-center gap-2">
              <Input size="lg" className="flex-1">
                <InputField
                  placeholder="What's new?"
                  value={input}
                  onChangeText={setInput}
                />
                <TouchableOpacity className="px-3 py-2">
                  <SendHorizontal color="#4287f5" size={rem(30)} />
                </TouchableOpacity>
              </Input>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: rem(26),
    paddingBottom: rem(10),
  },
});
