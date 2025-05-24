import Button from "@/components/Shared/Button";
import TextInputField from "@/components/Shared/TextInputField";
import Colors from "@/data/Colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function SignUp() {
  const [profileImage, setProfileImage] = React.useState<string | undefined>();
  const [fullName, setFullName] = React.useState<string | undefined>();
  const [collegeEmail, setCollegeEmail] = React.useState<string | undefined>();
  const [password, setPassword] = React.useState<string | undefined>();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.5,
    });

    console.log(result);

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const btnPress = () => {};
  return (
    <View
      style={{
        paddingTop: 65,
        padding: 20,
      }}
    >
      <Text
        style={{
          fontSize: 25,
          fontWeight: "bold",
        }}
      >
        Create a New Account
      </Text>
      <View
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <View>
          <TouchableOpacity onPress={() => pickImage()}>
            {profileImage ? (
              <Image
                source={{ uri: profileImage }}
                style={styles.profileImage}
              />
            ) : (
              <Image
                source={require("./../../assets/images/profile.png")}
                style={styles.profileImage}
              />
            )}
            <AntDesign
              name="camera"
              size={24}
              color={Colors.PRIMARY}
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                backgroundColor: "white",
                borderRadius: 50,
                padding: 5,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <TextInputField label="Full Name" onChangeText={(v) => setFullName(v)} />
      <TextInputField
        label="College Email"
        onChangeText={(v) => setCollegeEmail(v)}
      />
      <TextInputField
        label="Password"
        password={true}
        onChangeText={(v) => setPassword(v)}
      />

      <Button text="Create Account" onPress={() => btnPress()} />
    </View>
  );
}

const styles = StyleSheet.create({
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 99,
    marginTop: 20,
  },
});
