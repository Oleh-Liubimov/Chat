import { FlatList, View } from "react-native";
import React from "react";
import { Message } from "@/app/chat";
import { SingleMessage } from "./Message";

interface MessageListProps {
  messages: Message[];
}

export const MessageList = ({ messages }: MessageListProps) => {
  return (
    <View className="flex-1 h-full bg-white">
      <FlatList
        data={messages}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => item._id ?? index.toString()}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 16 }}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item }) => <SingleMessage msg={item} />}
      />
    </View>
  );
};
