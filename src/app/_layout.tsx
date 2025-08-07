import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#FF6B6B", // Red/pink color from your design
          tabBarInactiveTintColor: "#999",
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#fff",
            paddingBottom: 5,
            paddingTop: 5,
            height: 90,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "500",
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Promises",
            tabBarIcon: ({ color, focused }) => (
              <MaterialIcons name="assignment" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="calendar"
          options={{
            title: "Calendar",
            tabBarIcon: ({ color, focused }) => (
              <MaterialIcons name="calendar-today" size={24} color={color} />
            ),
          }}
        />
      </Tabs>
    </SafeAreaProvider>
  );
}
