import { View, Text, Image } from "react-native"
import { router } from 'expo-router'
import { images } from "../constants"
import CustomButton from "./CustomButton"

interface EmptyStateProps {
    title: string;
    subtitle: string;
}

const EmrtyState = ({ title, subtitle }: EmptyStateProps) => {
    return (
        <View className=" justify-center items-center px-4">
            <Image
                source={images.empty}
                className=" max-w-[340px]  max-h-[215px]"
                resizeMode="contain"
            />
            <Text className="text-xl text-center text-white font-psemibold mt-2">
                {title}
            </Text>
            <Text className="font-pmedium text-sm text-gray-100">
                {subtitle}
            </Text>


            <CustomButton
                title="Create video"
                handlePress={() => router.push("/create")}
                containerStyles="w-full my-5"
            />
        </View>
    )
}

export default EmrtyState
