import { Image, Text, View } from "react-native";
import CustomButton from "../Button/CustomButton";
import { icons } from "@/constants";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { useEffect } from "react";

const androidClientId = process.env.ANDROID_CLIENT_ID;
const iosClientId = process.env.IOS_CLIENT_ID;
const webClientId = process.env.WEB_CLIENT_ID;

WebBrowser.maybeCompleteAuthSession();

export default function OAuth() {
  const config = {
    webClientId,
    androidClientId,
    iosClientId,
  };

  const [request, response, promptAsync] = Google.useAuthRequest(config);

  const getUserProfile = async (token: string) => {
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const user = await response.json();
    } catch (error) {
      console.error("invalid user!");
    }
  };

  const handleToken = () => {
    if (response?.type === "success" && response.authentication) {
      const accessToken = response.authentication.accessToken;
      console.log("Access token:", accessToken);
      getUserProfile(accessToken);
    }
  };

  useEffect(() => {
    handleToken();
  }, [response]);

  return (
    <View>
      <View className="flex flex-row justify-center items-center mt-4 gap-x-3">
        <View className="flex-1 h-[1px] bg-general-100" />
        <Text className="text-lg">Or</Text>
        <View className="flex-1 h-[1px] bg-general-100" />
      </View>

      <CustomButton
        title="Log In with Google"
        className="mt-5 w-full shadow-none"
        IconLeft={() => (
          <Image
            source={icons.google}
            resizeMode="contain"
            className="w-5 h-5 mx-2"
          />
        )}
        bgVariant="outline"
        textVariant="primary"
        onPress={() => promptAsync()}
      />
    </View>
  );
}
