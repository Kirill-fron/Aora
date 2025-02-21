import { View, Text, FlatList, Image } from "react-native"
import React from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { images } from "../../constants"
import Searchinput from "../../components/Searchinput"
const Home = () => {
  return (
    <SafeAreaView className="bg-primary ">
      <FlatList
        data={[{ id: 1 }, { id: 2 }, { id: 3 }]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return (
            <Text className="text-3xl text-white">{item.id}</Text>
          )
        }}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="flex-row justify-between items-start mb-6">
              <View>
                <Text className="font-psemibold text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl text-white font-psemibold">
                  Users
                </Text>
              </View>

              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10 "
                  resizeMode="contain"
                />
              </View>




            </View>
            <Searchinput
            />
          </View>
        )}
      />
    </SafeAreaView>
  )
}

export default Home
