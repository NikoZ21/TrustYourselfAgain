import React from "react";

import UI3_V1_Light from "@/designs/ui_3/light/v1";
import UI1 from "@/designs/ui_1";

import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { View, Text } from "react-native";

export default function HomePage() {
  const insets = useSafeAreaInsets();

  console.log("SafeArea Insets:", {
    top: insets.top,
    bottom: insets.bottom,
    left: insets.left,
    right: insets.right,
  });
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white" }}
      edges={["top", "left", "right"]}
    >
      <UI3_V1_Light />
      {/* <UI1 /> */}
      {/* 
      <View style={{ flex: 1, backgroundColor: "gray" }}>
        <Text>Hello</Text>
      </View> */}
    </SafeAreaView>
  );
}
