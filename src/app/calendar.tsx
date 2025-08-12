import { StyleSheet } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import CalendarUI1 from "../page-designs/calendar/ui_1";

export default function CalendarPage() {
  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <CalendarUI1 />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
