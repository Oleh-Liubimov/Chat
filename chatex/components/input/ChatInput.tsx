import { View, Text, TouchableOpacity } from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import { COLORS } from "@/constants/Colors";
import { Paperclip, SendHorizontal } from "lucide-react-native";
import { Input, InputField } from "../ui/input";
import { rem } from "@/utils/rn-units";

interface ChatInputProps {
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
  handleSendMessage: () => void;
}
const ChatInput = ({ handleSendMessage, input, setInput }: ChatInputProps) => {
  return (
    <View className="flex-row items-center gap-2 pl-2 bg-gray-300 absolute bottom-0">
      <Paperclip color={COLORS.gray} />
      <Input
        size="lg"
        variant="rounded"
        className="flex-1 gap-5 border-none focus:border-none"
      >
        <InputField
          placeholder="What's new?"
          value={input}
          className="bg-[#FFF] text-black"
          onChangeText={setInput}
        />
      </Input>
      <TouchableOpacity className="pr-3 py-2" onPress={handleSendMessage}>
        <SendHorizontal color={COLORS.gray} size={rem(30)} />
      </TouchableOpacity>
    </View>
  );
};

export default ChatInput;
