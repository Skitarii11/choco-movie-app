import { Tabs } from "expo-router";
import { Image, Text, View } from "react-native";

import { icons } from "@/constants/icons";

function TabIcon({ focused, icon, title }: any) {
  return (
    <View className="items-center justify-center gap-1">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={focused ? "#FF6B6B" : "#8D8D8D"}
        className="w-6 h-6"
      />
      <Text
        className={`${focused ? "font-semibold text-accent" : "font-normal text-lightText"} text-xs`}
      >
        {title}
      </Text>
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#FFF5F5", // New primary background color
          borderTopWidth: 1,
          borderTopColor: "#FFE0E0", // New secondary color for the border
          height: 84, // A bit taller to accommodate text
        },
      }}
    >
      {/* 1. Home Screen (Нүүр) */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Нүүр",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.home} title="Нүүр" />
          ),
        }}
      />

      {/* 2. Categories Screen (Ангилал) */}
      <Tabs.Screen
        name="categories" // You will need to create this new file
        options={{
          title: "Ангилал",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={icons.categories}
              title="Ангилал"
            /> // Add a new 'categories' icon
          ),
        }}
      />

      {/* 3. Profile Screen (Профайл) */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Профайл",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.person} title="Профайл" />
          ),
        }}
      />
    </Tabs>
  );
}
