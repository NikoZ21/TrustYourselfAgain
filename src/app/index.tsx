import React from "react";
// import UI3_V1_Light from "../designs/ui_3/light/v1";
// import UI3_V2_Light from "../designs/ui_3/light/v2";
// import UI3_V3_Light from "../designs/ui_3/light/v3";
// import UI3_V4_Light from "../designs/ui_3/light/v4";
// import UI3_V5_Light from "../designs/ui_3/light/v5";
// import UI3_V6_Light from "../designs/ui_3/light/v6";

// import UI3_V1_Dark from "../designs/ui_3/dark/v1";
// import UI3_V2_Dark from "../designs/ui_3/dark/v2";
// import UI3_V3_Dark from "../designs/ui_3/dark/v3";
// import UI3_V4_Dark from "../designs/ui_3/dark/v4";
// import UI3_V5_Dark from "../designs/ui_3/dark/v5";
// import UI3_V6_Dark from "../../designs/ui_3/dark/v6";
import UI3_V6_Dark from "@/designs/ui_3/dark/v6";
import UI3_V1_Light from "@/designs/ui_3/light/v1";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomePage() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <UI3_V1_Light />
    </SafeAreaView>
  );
}
