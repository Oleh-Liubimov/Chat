import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {useUserStore} from '@/store/useUserStore';
import {router, useLocalSearchParams, useNavigation} from 'expo-router';
import {socket} from '@/socket/socket';
import {MessageList} from '@/components/MessageList';
import {SafeAreaView} from 'react-native-safe-area-context';
import ChatInput from '@/components/input/ChatInput';

export type Message = {
  _id: string;
  username: string;
  messageContent: string;
  createdAt?: string;
};

const ChatScreen = () => {
  const user = useUserStore().user;
  const params = useLocalSearchParams();
  const navigation = useNavigation();

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  useLayoutEffect(() => {
    if (params.roomName) {
      navigation.setOptions({headerTitle: params.roomName});
    }
  }, [params.roomName]);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to socket');
    });

    socket.on('chat-history', (history: Message[]) => {
      setMessages(history);
    });

    socket.on('new-message', (msg: Message) => {
      setMessages(prev => [...prev, msg]);
    });

    return () => {
      socket.on('disconnect', () => {
        console.log('disconnected from socket');
      });
      socket.off('chat-history');
      socket.off('new-message');
    };
  }, []);

  const handleSendMessage = () => {
    if (input.trim()) {
      socket.emit('new-message', {
        user,
        messageContent: input.trim(),
      });
      setInput('');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
      keyboardVerticalOffset={Platform.OS === 'ios' ? -20 : 0}>
      <SafeAreaView
        edges={['left', 'right', 'bottom']}
        className="flex-1 bg-gray-300">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1">
            <View className="flex-1">
              <MessageList messages={messages} />
            </View>
            <ChatInput
              input={input}
              handleSendMessage={handleSendMessage}
              setInput={setInput}
            />
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;
