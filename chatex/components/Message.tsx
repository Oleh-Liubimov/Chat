import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Message } from "@/app/chat";
import { useUserStore } from "@/store/useUserStore";

interface MessageProps {
  msg: Message;
}
export const SingleMessage = ({ msg }: MessageProps) => {
  const username = useUserStore().username;
  const isMyMessage = username === msg.username;
  return (
    <View
      style={[
        styles.messageWrapper,
        isMyMessage ? styles.myMessage : styles.otherMessage,
      ]}
    >
      <View
        style={[
          styles.bubble,
          isMyMessage ? styles.myBubble : styles.otherBubble,
        ]}
      >
        {!isMyMessage && <Text style={styles.username}>{msg.username}</Text>}
        <Text style={styles.text}>{msg.messageContent}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  messageWrapper: {
    width: "100%",
    paddingHorizontal: 10,
    marginVertical: 4,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  myMessage: {
    justifyContent: "flex-end",
  },
  otherMessage: {
    justifyContent: "flex-start",
  },
  bubble: {
    maxWidth: "80%",
    padding: 10,
    borderRadius: 16,
  },
  myBubble: {
    backgroundColor: "#dcf8c6",
    borderTopRightRadius: 0,
  },
  otherBubble: {
    backgroundColor: "#f1f1f1",
    borderTopLeftRadius: 0,
  },
  username: {
    fontSize: 12,
    color: "#555",
    marginBottom: 4,
    fontWeight: "600",
  },
  text: {
    fontSize: 16,
    color: "#000",
  },
});
