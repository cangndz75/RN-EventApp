import Button from "@/components/Shared/Button";
import Colors from "@/data/Colors";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";

export default function LandingScreen() {
  const router = useRouter();
  return (
    <View>
      <Image
        source={require("./../assets/images/login.png")}
        style={{
          width: "100%",
          height: 450,
        }}
      />
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
          }}
        >
          Welcome to Campus App
        </Text>
        <Text
          style={{
            fontSize: 17,
            textAlign: "center",
            marginTop: 10,
            color: Colors.GRAY,
          }}
        >
          Your one-stop solution for all campus-related activities.
        </Text>
        <Button
          text="Get Started"
          onPress={() => router.push("/(auth)/SignUp")}
        />
        <Pressable onPress={() => router.push("/(auth)/SignIn")}>
          <Text
            style={{
              fontSize: 16,
              marginTop: 20,
              color: Colors.GRAY,
              textAlign: "center",
            }}
          >
            Already have an account? Sign In Here
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
