import {View, Pressable} from 'react-native';
import React, {useState} from 'react';

import {Image} from '../ui/image';
import {
  launchImageLibrary,
  ImageLibraryOptions,
} from 'react-native-image-picker';
import {Button, ButtonText} from '../ui/button';
import {VStack} from '../ui/vstack';

interface ImagePickerProps {
  value?: string | null;
  onChange: (url: string) => void;
}

export const ImagePicker = ({onChange, value}: ImagePickerProps) => {
  const pickImage = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 1,
      selectionLimit: 1,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) return;
      if (response.errorCode) {
        console.error('ImagePicker error:', response.errorMessage);
        return;
      }

      const uri = response.assets?.[0]?.uri;
      if (uri) {
        onChange(uri);
      }
    });
  };
  return (
    <VStack className="gap-5">
      <Button onPress={pickImage} className="rounded-3xl">
        <ButtonText>Add image</ButtonText>
      </Button>
      {value && (
        <Image
          source={{uri: value}}
          width={100}
          height={100}
          alt="chat avatar"
        />
      )}
    </VStack>
  );
};
