import { StyleSheet, SafeAreaView } from "react-native";
import CalendarUI1 from "../page-designs/calendar/ui_1";

export default function CalendarPage() {
  return (
    <SafeAreaView style={styles.container}>
      <CalendarUI1 />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
