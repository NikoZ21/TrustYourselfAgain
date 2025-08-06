import React from "react";

import UI3_V1_Light from "@/designs/ui_3/light/v1";
import UI1 from "@/designs/ui_1";

import { SafeAreaView } from "react-native-safe-area-context";

export default function HomePage() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <UI3_V1_Light />
      {/* <UI1 /> */}
    </SafeAreaView>
  );
}
