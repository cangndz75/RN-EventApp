import Colors from "@/data/Colors";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

type ButtonProps = {
  text: string;
  onPress?: () => void;
};

export default function Button({ text, onPress }: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: Colors.PRIMARY,
        padding: 15,
        marginTop: 15,
        borderRadius: 10,
      }}
    >
      <Text
        style={{
          fontSize: 18,
          textAlign: "center",
          color: "white",
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}
