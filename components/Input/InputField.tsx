import {
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import { Controller } from "react-hook-form";
import { InputFieldProps } from "@/types/type";

const InputField = ({
  label,
  control,
  name,
  rules,
  error,
  icon,
  secureTextEntry = false,
  labelStyle,
  containerStyle,
  inputStyle,
  iconStyle,
  className,
  ...props
}: InputFieldProps) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="my-2 w-full">
          <Text className={`text-lg font-JakartaSemiBold mb-3 ${labelStyle}`}>
            {label}
          </Text>
          <View
            className={`flex flex-row justify-start items-center relative bg-neutral-100 rounded-full border ${
              error ? "border-red-500" : "border-neutral-100"
            } focus:border-primary-500 ${containerStyle}`}
          >
            {icon && (
              <Image source={icon} className={`w-6 h-6 ml-4 ${iconStyle}`} />
            )}
            {control ? (
              <Controller
                control={control}
                name={name}
                rules={rules}
                render={({ field: { value, onBlur, onChange } }) => (
                  <TextInput
                    className={`rounded-full p-4 font-JakartaSemiBold text-[15px] flex-1 ${inputStyle} text-left`}
                    secureTextEntry={secureTextEntry}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholderTextColor="#AAAAAA"
                    {...props}
                  />
                )}
              />
            ) : (
              <TextInput
                className={`rounded-full p-4 font-JakartaSemiBold text-[15px] flex-1 ${inputStyle} text-left`}
                secureTextEntry={secureTextEntry}
                {...props}
              />
            )}
          </View>
          {error && <Text className="text-red-500 text-xs mt-1">{error}</Text>}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default InputField;
