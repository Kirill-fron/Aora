import { View, Text, Image } from "react-native"


const VideoCard = ({ video: { title, thumbnail, video, creator: { username, avatar } } }) => {
    return (
        <View className="flex-col items-center px-4 mb-14">
            <View className="flex-row gap-3 items-start">
                <View className="justify-center items-center flex-row flex-1">
                    <View className="w-[46px] h-[46px] rounded-lg border border-secondary-100 justify-center items-center p-0.5">
                        <Image 
                        className="w-full h-full rounded-lg" 
                        source={{ uri: avatar }} 
                        resizeMode="cover"
                        />
                    </View>

                    <View>

                    </View>
                </View>
            </View>



            <Text className="text-2xl text-white">{title}</Text>
        </View>
    )
}

export default VideoCard
