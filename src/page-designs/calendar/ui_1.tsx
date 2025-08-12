import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type CalendarEvent = {
  id: string;
  date: string; // ISO date string YYYY-MM-DD
  title: string;
  time: string; // e.g., 09:00
  tag?: "HIGH" | "NORMAL" | "LOW";
};

const ACCENT_RED = "#FF6B6B";
const ACCENT_TEAL = "#4ECDC4";
const BORDER = "#E5E5E5";
const TEXT_PRIMARY = "#333";
const TEXT_SECONDARY = "#666";
const BG_WHITE = "#FFFFFF";
const BG_LIGHT = "#F8F9FA";
const TEAL_LIGHT = "rgba(78,205,196,0.16)"; // transparent teal fill for completed days

function formatISODate(year: number, monthIndex: number, day: number): string {
  // monthIndex: 0-11
  const m = (monthIndex + 1).toString().padStart(2, "0");
  const d = day.toString().padStart(2, "0");
  return `${year}-${m}-${d}`;
}

function getMonthMatrix(year: number, monthIndex: number) {
  const firstDay = new Date(year, monthIndex, 1);
  const lastDay = new Date(year, monthIndex + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startWeekday = firstDay.getDay(); // 0=Sun ... 6=Sat

  const matrix: Array<Array<{ day: number | null; date: string | null }>> = [];
  let currentDay = 1;

  for (let row = 0; row < 6; row += 1) {
    const week: Array<{ day: number | null; date: string | null }> = [];
    for (let col = 0; col < 7; col += 1) {
      const cellIndex = row * 7 + col;
      if (cellIndex >= startWeekday && currentDay <= daysInMonth) {
        week.push({
          day: currentDay,
          date: formatISODate(year, monthIndex, currentDay),
        });
        currentDay += 1;
      } else {
        week.push({ day: null, date: null });
      }
    }
    matrix.push(week);
  }
  return matrix;
}

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function CalendarUI1() {
  const now = new Date();
  const [visibleYear, setVisibleYear] = useState(now.getFullYear());
  const [visibleMonthIndex, setVisibleMonthIndex] = useState(now.getMonth());
  const todayISO = formatISODate(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );

  // Demo events (design-first; replace with real data later)
  const events: CalendarEvent[] = [
    {
      id: "1",
      date: todayISO,
      title: "Workout session",
      time: "09:00",
      tag: "HIGH",
    },
    {
      id: "2",
      date: todayISO,
      title: "Team standup",
      time: "10:30",
      tag: "NORMAL",
    },
    {
      id: "3",
      date: formatISODate(
        now.getFullYear(),
        now.getMonth(),
        Math.min(now.getDate() + 2, 28)
      ),
      title: "Read for 30m",
      time: "20:00",
      tag: "LOW",
    },
  ];

  const matrix = useMemo(
    () => getMonthMatrix(visibleYear, visibleMonthIndex),
    [visibleYear, visibleMonthIndex]
  );

  const monthTitle = `${MONTHS[visibleMonthIndex]} ${visibleYear}`;

  const eventsByDate = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>();
    for (const e of events) {
      const arr = map.get(e.date) ?? [];
      arr.push(e);
      map.set(e.date, arr);
    }
    return map;
  }, [events]);

  const todayEvents = events.filter((e) => e.date === todayISO);

  const goPrevMonth = () => {
    if (visibleMonthIndex === 0) {
      setVisibleMonthIndex(11);
      setVisibleYear((y) => y - 1);
    } else {
      setVisibleMonthIndex((m) => m - 1);
    }
  };

  const goNextMonth = () => {
    if (visibleMonthIndex === 11) {
      setVisibleMonthIndex(0);
      setVisibleYear((y) => y + 1);
    } else {
      setVisibleMonthIndex((m) => m + 1);
    }
  };

  const getTagColor = (tag?: CalendarEvent["tag"]) => {
    switch (tag) {
      case "HIGH":
        return ACCENT_RED;
      case "NORMAL":
        return ACCENT_TEAL;
      case "LOW":
        return "#95E1D3";
      default:
        return "#E0E0E0";
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={BG_WHITE} />

      {/* Header (match v1 light style) */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="menu" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>CALENDAR</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="search-outline" size={22} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="notifications-outline" size={22} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Month selector */}
        <View style={styles.monthRow}>
          <TouchableOpacity style={styles.monthArrow} onPress={goPrevMonth}>
            <Ionicons name="chevron-back" size={20} color={TEXT_PRIMARY} />
          </TouchableOpacity>
          <Text style={styles.monthTitle}>{monthTitle}</Text>
          <TouchableOpacity style={styles.monthArrow} onPress={goNextMonth}>
            <Ionicons name="chevron-forward" size={20} color={TEXT_PRIMARY} />
          </TouchableOpacity>
        </View>

        {/* Weekday labels */}
        <View style={styles.weekdaysRow}>
          {WEEKDAYS.map((d) => (
            <Text key={d} style={styles.weekdayText}>
              {d}
            </Text>
          ))}
        </View>

        {/* Calendar grid */}
        <View style={styles.grid}>
          {matrix.map((week, rowIdx) => (
            <View key={rowIdx} style={styles.weekRow}>
              {week.map((cell, colIdx) => {
                const isToday = cell.date === todayISO;
                const hasEvents = !!(cell.date && eventsByDate.get(cell.date));
                const isCompleted = !!(
                  cell.day &&
                  (cell.day + visibleMonthIndex + visibleYear) % 5 === 0
                );
                return (
                  <View key={`${rowIdx}-${colIdx}`} style={styles.dayCell}>
                    <View
                      style={[
                        styles.dayInner,
                        isCompleted && !isToday && styles.completedDay,
                        isToday && styles.today,
                        !cell.day && styles.emptyCell,
                      ]}
                    >
                      {cell.day ? (
                        <Text
                          style={[
                            styles.dayText,
                            isToday && styles.dayTextToday,
                          ]}
                        >
                          {cell.day}
                        </Text>
                      ) : null}
                      {/* removed event dot */}
                    </View>
                  </View>
                );
              })}
            </View>
          ))}
        </View>

        {/* Summary Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <Text style={styles.sectionSubtitle}>
            {MONTHS[visibleMonthIndex]} Overview
          </Text>
        </View>
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryNumber}>73%</Text>
              <Text style={styles.summaryLabel}>Completion Rate</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryNumber}>22</Text>
              <Text style={styles.summaryLabel}>Days Completed</Text>
            </View>
          </View>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryNumber}>8</Text>
              <Text style={styles.summaryLabel}>Current Streak</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryNumber}>15</Text>
              <Text style={styles.summaryLabel}>Best Streak</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const CELL_SIZE = 44;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_WHITE,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: BG_WHITE,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: ACCENT_RED,
  },
  headerIcons: {
    flexDirection: "row",
  },
  headerIcon: {
    marginLeft: 15,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  monthRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  monthArrow: {
    padding: 8,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: BORDER,
    backgroundColor: BG_WHITE,
  },
  monthTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: TEXT_PRIMARY,
  },
  weekdaysRow: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: BG_LIGHT,
    borderWidth: 2,
    borderColor: BORDER,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  weekdayText: {
    width: CELL_SIZE,
    textAlign: "center",
    color: TEXT_SECONDARY,
    fontWeight: "700",
    fontSize: 12,
  },
  grid: {
    marginTop: 12,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: BORDER,
    overflow: "hidden",
  },
  weekRow: {
    flexDirection: "row",
    justifyContent: "center",
  },
  dayCell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: BG_WHITE,
  },
  dayInner: {
    width: CELL_SIZE - 6,
    height: CELL_SIZE - 6,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: BORDER,
  },
  dayText: {
    fontSize: 14,
    color: TEXT_PRIMARY,
    fontWeight: "600",
  },
  today: {
    backgroundColor: ACCENT_RED,
  },
  completedDay: {
    backgroundColor: TEAL_LIGHT,
    borderColor: ACCENT_TEAL,
  },
  dayTextToday: {
    color: BG_WHITE,
    fontWeight: "800",
  },
  emptyCell: {
    opacity: 0.25,
  },
  summaryCard: {
    backgroundColor: BG_WHITE,
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: BORDER,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  summaryItem: {
    flex: 1,
    alignItems: "center",
  },
  summaryNumber: {
    fontSize: 24,
    fontWeight: "800",
    color: ACCENT_RED,
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: TEXT_SECONDARY,
    textAlign: "center",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: TEXT_PRIMARY,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: TEXT_SECONDARY,
    fontWeight: "600",
  },
});
