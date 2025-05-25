import Button from "@/components/Shared/Button";
import TextInputField from "@/components/Shared/TextInputField";
import { cld, options } from "@/configs/CloudinaryConfig";
import { auth } from "@/configs/FirebaseConfig";
import Colors from "@/data/Colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import axios from "axios";
import { upload } from "cloudinary-react-native";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React from "react";
import {
    Image,
    StyleSheet,
    Text,
    ToastAndroid,
    TouchableOpacity,
    View,
} from "react-native";

export default function SignUp() {
  const [profileImage, setProfileImage] = React.useState<string | undefined>();
  const [fullName, setFullName] = React.useState<string | undefined>();
  const [collegeEmail, setCollegeEmail] = React.useState<string | undefined>();
  const [password, setPassword] = React.useState<string | undefined>();

  const router = useRouter();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.5,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const btnPress = () => {
    if (!fullName || !collegeEmail || !password) {
      ToastAndroid.show("Please fill all fields", ToastAndroid.SHORT);
      return;
    }

    createUserWithEmailAndPassword(auth, collegeEmail.trim(), password.trim())
      .then((userCredential) => {

        if (profileImage) {
          upload(cld, {
            file: profileImage,
            options: options,
            callback: async (error: any, response: any) => {
              if (error) {
                console.error("Image upload error:", error);
                ToastAndroid.show("Image upload failed", ToastAndroid.SHORT);
                return;
              }

              if (response?.url) {
                try {
                  const res = await axios.post(
                    `${process.env.EXPO_PUBLIC_HOST_URL}/user`,
                    {
                      name: fullName,
                      email: collegeEmail,
                      image: response.url,
                    }
                  );

                  router.push("/landing");
                } catch (apiError: any) {
                  console.error("API error:", apiError?.message || apiError);
                  ToastAndroid.show("Server error", ToastAndroid.SHORT);
                }
              }
            },
          });
        } else {
          ToastAndroid.show("Account created (no image)", ToastAndroid.SHORT);
          router.push("/landing");
        }
      })
      .catch((error) => {
        console.error("Firebase error:", error);
        ToastAndroid.show(
          "Sign up failed: " + error.message,
          ToastAndroid.LONG
        );
      });
  };

  return (
    <View style={{ paddingTop: 65, padding: 20 }}>
      <Text style={{ fontSize: 25, fontWeight: "bold" }}>
        Create a New Account
      </Text>

      <View style={{ alignItems: "center", marginTop: 20 }}>
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={
              profileImage
                ? { uri: profileImage }
                : require("./../../assets/images/profile.png")
            }
            style={styles.profileImage}
          />
          <AntDesign
            name="camera"
            size={24}
            color={Colors.PRIMARY}
            style={styles.cameraIcon}
          />
        </TouchableOpacity>
      </View>

      <TextInputField label="Full Name" onChangeText={setFullName} />
      <TextInputField label="College Email" onChangeText={setCollegeEmail} />
      <TextInputField
        label="Password"
        password={true}
        onChangeText={setPassword}
      />

      <Button text="Create Account" onPress={btnPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 99,
    marginTop: 10,
  },
  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "white",
    borderRadius: 50,
    padding: 5,
  },
});
