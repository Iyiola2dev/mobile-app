import React from "react";
import { Image, Pressable, TextInput, View } from "react-native";

import { icons } from "@/constants/icons";

interface Props {
  onPress?: () => void;
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
  // onSubmit?: () => void;
}

const SearchBar = ({
  onPress,
  placeholder,
  value,
  onChangeText,
  // onSubmit,
}: Props) => {
  return (
    <Pressable onPress={onPress} disabled={!onPress}>
      <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
        <Image
          source={icons.search}
          style={{ tintColor: "#a8b5db" }}
          className="size-5"
        />
        <TextInput
          // If `onPress` is provided, this search bar behaves like a button
          // (e.g. navigate to /search), so disable editing.
          editable={!onPress}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          // onSubmitEditing={onSubmit ? () => onSubmit() : undefined}
          returnKeyType={onPress ? "default" : "search"}
          placeholderTextColor={"#a8b5db"}
          className="flex-1 text-white ml-2"
        />
      </View>
    </Pressable>
  );
};

export default SearchBar;
