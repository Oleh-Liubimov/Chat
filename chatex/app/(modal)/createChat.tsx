import {View, Text} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CreateCharForm} from '@/components/forms/CreateCharForm';

const CreateChat = () => {
  return (
    <SafeAreaView
      className="flex-1 px-5 pt-5"
      edges={['left', 'right', 'bottom']}>
      <Text className="text-center text-2xl">CreateChat</Text>
      <CreateCharForm />
    </SafeAreaView>
  );
};

export default CreateChat;
