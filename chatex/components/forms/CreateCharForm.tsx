import {View} from 'react-native';
import React from 'react';
import {VStack} from '../ui/vstack';
import {Input, InputField} from '../ui/input';
import {Text} from '../ui/text';
import {ImagePicker} from '../imagePicker/ImagePicker';
import {useForm, Controller} from 'react-hook-form';
import {Button, ButtonText} from '../ui/button';
import {useUserStore} from '@/store/useUserStore';
import {createRoom} from '@/api/client/rooms/createRoom';
import {router} from 'expo-router';

type FormValues = {
  name: string;
  description?: string;
  imageUrl?: string | null;
  members?: string[] | null;
  createdBy: string;
  type: 'private' | 'public';
};

export const CreateCharForm = () => {
  const user = useUserStore().user;
  const {control, handleSubmit} = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      description: '',
      imageUrl: null,
      members: [user?.userId],
      createdBy: user?.userId,
      type: 'private',
    },
  });

  const onSubmit = async (data: FormValues) => {
    const response = await createRoom(data);
    console.log(response);
    router.push('/');
  };
  return (
    <VStack className="gap-5">
      <VStack>
        <Text>Chat name</Text>
        <Controller
          control={control}
          name="name"
          render={({field: {value, onChange}}) => (
            <Input variant="rounded" size="lg">
              <InputField value={value} onChangeText={onChange} />
            </Input>
          )}
        />
      </VStack>
      <VStack>
        <Text>Chat description</Text>
        <Controller
          control={control}
          name="description"
          render={({field: {value, onChange}}) => (
            <Input variant="rounded" size="lg">
              <InputField value={value} onChangeText={onChange} />
            </Input>
          )}
        />
      </VStack>
      <VStack>
        <Text>Pick image for chat</Text>
        <Controller
          control={control}
          name="imageUrl"
          render={({field: {value, onChange}}) => (
            <ImagePicker value={value} onChange={onChange} />
          )}
        />
      </VStack>

      <VStack>
        <Button
          onPress={handleSubmit(onSubmit)}
          className="bg-green-800 rounded-3xl">
          <ButtonText>Create chat</ButtonText>
        </Button>
      </VStack>
    </VStack>
  );
};
