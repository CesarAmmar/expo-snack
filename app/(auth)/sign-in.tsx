import InputField from "@/components/Input/InputField";
import { icons, images } from "@/constants";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Image, ScrollView, Text, View } from "react-native";
import CustomButton from "@/components/Button/CustomButton";
import { Link } from "expo-router";
import OAuth from "@/components/utils/OAuth";

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignInFormData = z.infer<typeof signInSchema>;

const SignIn = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({ resolver: zodResolver(signInSchema) });

  const onSubmit = (formData: SignInFormData) => {
    // API Req
    console.log("Form Data Submitted:", formData);
  };
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
          <Text className="absolute bottom-5 left-5 font-JakartaSemiBold text-2xl text-black">
            Welcome
          </Text>
        </View>
        <View className="p-5">
          <InputField
            name="email"
            control={control}
            label="Email"
            placeholder="Enter your email"
            icon={icons.email}
            error={errors.email?.message}
          />
          <InputField
            name="password"
            control={control}
            label="Password"
            placeholder="Enter your password"
            icon={icons.lock}
            secureTextEntry={true}
            error={errors.password?.message}
          />
          <CustomButton
            title="Sign In"
            onPress={handleSubmit(onSubmit)}
            className="mt-5"
          />
          <OAuth />
          <Link
            href="/sign-up"
            className="text-lg text-center text-general-200 mt-2"
          >
            <Text>Don't have an account?</Text>
            <Text className="text-primary-500">{""} Sign Up</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignIn;
